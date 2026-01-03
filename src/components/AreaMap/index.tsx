import React, {useEffect, useRef} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import proj4 from 'proj4';
import styles from './styles.module.css';

interface AreaMapProps {
  center: [number, number]; // [lat, lng]
  zoom?: number;
  height?: string;
  showAllAreas?: boolean;
  markerPosition?: [number, number]; // Optional marker at specific location
  markerLabel?: string;
}

// Use actual hex colors instead of CSS variables (Leaflet doesn't support CSS vars)
const COLORS = {
  primary: '#3d6b3d',
  primaryLight: '#509150',
};

const AreaMap: React.FC<AreaMapProps> = ({
  center,
  zoom = 17,
  height = '400px',
  showAllAreas = false,
  markerPosition,
  markerLabel = 'Standort',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const initializedRef = useRef(false);

  // Convert EPSG:25832 to WGS84
  const convertEPSG25832ToWGS84 = (easting: number, northing: number): [number, number] => {
    const EPSG25832 = '+proj=utm +zone=32 +ellps=GRS80 +datum=WGS84 +units=m +no_defs';
    const WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
    const [lon, lat] = proj4(EPSG25832, WGS84, [easting, northing]);
    return [lat, lon];
  };

  // Transform GeoJSON feature coordinates
  const transformFeatureCoordinates = (feature: any) => {
    if (feature.geometry.type === 'MultiPolygon') {
      const transformedCoordinates = feature.geometry.coordinates.map((polygon: any) =>
        polygon.map((ring: any) =>
          ring.map(([easting, northing]: [number, number]) => {
            const [lat, lon] = convertEPSG25832ToWGS84(easting, northing);
            return [lon, lat];
          })
        )
      );
      return {
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: transformedCoordinates,
        },
      };
    } else if (feature.geometry.type === 'Polygon') {
      const transformedCoordinates = feature.geometry.coordinates.map((ring: any) =>
        ring.map(([easting, northing]: [number, number]) => {
          const [lat, lon] = convertEPSG25832ToWGS84(easting, northing);
          return [lon, lat];
        })
      );
      return {
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: transformedCoordinates,
        },
      };
    }
    return feature;
  };

  // Load GeoJSON files
  const loadGeoJSONFiles = async () => {
    const context = require.context('../../data/', true, /\.json$/);
    const geojsonLayers: any[] = [];

    for (const key of context.keys()) {
      const geojsonData = await context(key);
      const transformedGeoJSON = {
        ...geojsonData,
        features: geojsonData.features.map(transformFeatureCoordinates),
      };
      geojsonLayers.push(transformedGeoJSON);
    }

    return geojsonLayers;
  };

  useEffect(() => {
    // Guard: only initialize once and when container is ready
    if (!containerRef.current || initializedRef.current || mapRef.current) {
      return;
    }

    // Mark as initialized immediately to prevent double initialization
    initializedRef.current = true;

    // Initialize the map using the container ref directly
    const leafletMap = L.map(containerRef.current).setView(center, zoom);

    // Add tile layers
    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(leafletMap);

    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Esri World Imagery',
      }
    );

    // Add layer control
    L.control
      .layers(
        {
          Karte: osmLayer,
          Satellit: satelliteLayer,
        },
        {},
        {position: 'topright'}
      )
      .addTo(leafletMap);

    // Add location marker if provided
    if (markerPosition) {
      const markerIcon = L.divIcon({
        className: styles.locationMarker,
        html: '<span class="marker-pin">📍</span>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });

      L.marker(markerPosition, {icon: markerIcon})
        .addTo(leafletMap)
        .bindPopup(`<b>${markerLabel}</b>`)
        .openPopup();
    }

    // Load and display GeoJSON areas if enabled
    if (showAllAreas) {
      loadGeoJSONFiles().then((geojsonLayers) => {
        // Check if map still exists (component might have unmounted)
        if (!mapRef.current) return;

        geojsonLayers.forEach((geojsonData) => {
          L.geoJSON(geojsonData, {
            style: {
              color: COLORS.primary,
              weight: 3,
              fillColor: COLORS.primaryLight,
              fillOpacity: 0.15,
            },
            onEachFeature: (feature, layer) => {
              layer.bindPopup(
                `<b>Fläche: ${feature.properties.FLZ || feature.properties.NAME}</b>`
              );
            },
          }).addTo(leafletMap);
        });
      });
    }

    mapRef.current = leafletMap;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      initializedRef.current = false;
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <div className={styles.mapWrapper}>
      <div
        ref={containerRef}
        className={styles.mapContainer}
        style={{height}}
      />
    </div>
  );
};

export default AreaMap;
