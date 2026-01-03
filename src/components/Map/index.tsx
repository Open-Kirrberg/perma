// src/components/Map.js

import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import proj4 from 'proj4';
import TreeTracking from './TreeTracking';
import TreeLoader from './TreeLoader';
import CreateTree from "./CreateTree";
import { createTreePopupContent } from './createTreePopupContent';
import DistanceMeasurementTool from "./DistanceMeasurementTool";
import { UserLocationControl } from './UserLocationControl';

const AREAS = [
  { id: '2900', label: '2900' },
  { id: '2901', label: '2901' },
  { id: '2902-4', label: '2902-4' }
];

const Map = () => {
  const [map, setMap] = useState(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const areaLayersRef = useRef<{ [key: string]: L.Layer }>({});

  // Define tree marker icon
  const treeIcon = L.divIcon({
    className: 'tree-icon',
    html: '🌳',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const updateTree = (updatedTree, oldTree) => {
    // Update tree logic here
    console.log("Updated Tree:", updatedTree);
    // You can update tree markers on the map here as needed
  };

  const downloadTree = (downloadedTree) => {
    // Update tree logic here
    console.log("downloadTree Tree:", downloadedTree);
  };

  const handleTreeAdded = (newTree) => {
    const marker = L.marker([newTree.lat, newTree.lon], { icon: treeIcon }).addTo(map);
    marker.bindPopup(createTreePopupContent(map, newTree, updateTree, downloadTree));
  };

  // Function to convert EPSG:25832 to WGS84 (latitude, longitude)
  const convertEPSG25832ToWGS84 = (easting, northing) => {
    const EPSG25832 = '+proj=utm +zone=32 +ellps=GRS80 +datum=WGS84 +units=m +no_defs';
    const WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
    const [lon, lat] = proj4(EPSG25832, WGS84, [easting, northing]);
    return [lat, lon];
  };

  // Function to transform coordinates in GeoJSON features
  const transformFeatureCoordinates = (feature) => {
    if (feature.geometry.type === 'MultiPolygon') {
      const transformedCoordinates = feature.geometry.coordinates.map((polygon) =>
        polygon.map((ring) =>
          ring.map(([easting, northing]) => {
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
      const transformedCoordinates = feature.geometry.coordinates.map((ring) =>
        ring.map(([easting, northing]) => {
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

  // Function to load GeoJSON data from files
  const loadGeoJSONFiles = async () => {
    const context = require.context('../../data/', true, /\.json$/);
    const geojsonLayers = [];

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
    // Initialize the map
    const leafletMap = L.map('map').setView([49.293440, 7.353419], 17); // Near Kirrberg in Homburg

    // Add OpenStreetMap tiles
    const normalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://2gis.com">2GIS</a>',
    });

    const baseMaps = {
      Normal: normalLayer,
      Realistic: satelliteLayer,
    };

    L.control.layers(baseMaps).addTo(leafletMap);

    // Example tree data
    const trees = [
      { id: 1, name: 'Apple Tree', lat: 49.313, lon: 7.34 },
    ];

    // Add tree markers
    trees.forEach((tree) => {
      const marker = L.marker([tree.lat, tree.lon], { icon: treeIcon })
        .addTo(leafletMap)
        .bindPopup(`<b>${tree.name}</b>`);
      marker.on('click', () => {
        marker.openPopup();
        marker.setZIndexOffset(1000);
      });
    });

    // Load and display GeoJSON areas
    loadGeoJSONFiles().then((geojsonLayers) => {
      geojsonLayers.forEach((geojsonData) => {
        const geoLayer = L.geoJSON(geojsonData, {
          style: { color: '#3d6b3d', weight: 3 },
          onEachFeature: (feature, layer) => {
            // Store reference by FLZ
            if (feature.properties.FLZ) {
              areaLayersRef.current[feature.properties.FLZ] = layer;
            }
            layer.bindPopup(
              `<b>Area ID: ${feature.properties.FLZ}</b><br>Name: ${feature.properties.NAME}`
            );
            layer.on('click', () => {
              layer.setStyle({ color: '#ff6b35', weight: 5 });
              setTimeout(() => layer.setStyle({ color: '#3d6b3d', weight: 3 }), 1500);
            });
          },
        }).addTo(leafletMap);
      });
    });

    // --- New Feature: Popup on Map Click ---
    leafletMap.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const popupContent = `
        <div>
          <p>Latitude: ${lat.toFixed(6)}</p>
          <p>Longitude: ${lng.toFixed(6)}</p>
          <p>
            <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">
              Navigate with Google Maps
            </a>
          </p>
        </div>
      `;
      L.popup()
        .setLatLng(e.latlng)
        .setContent(popupContent)
        .openOn(leafletMap);
    });
    // ----------------------------------

    setMap(leafletMap);

    return () => {
      leafletMap.remove();
    };
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    if (map && searchValue) {
      map.eachLayer((layer) => {
        if (layer.feature && layer.feature.properties.FLZ === searchValue) {
          map.fitBounds(layer.getBounds());
          layer.openPopup();
        }
      });
    }
  };

  const selectArea = (areaId: string) => {
    if (!map) return;

    // Reset previous selection
    Object.values(areaLayersRef.current).forEach((layer: any) => {
      layer.setStyle({ color: '#3d6b3d', weight: 3 });
    });

    // Highlight selected area
    const layer = areaLayersRef.current[areaId] as any;
    if (layer) {
      setSelectedArea(areaId);
      layer.setStyle({ color: '#ff6b35', weight: 5 });
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
      layer.openPopup();
    }
  };

  return (
    <div className="map-container-wrapper">
      {/* Back Button */}
      <a href="/" className="map-back-btn" title="Zurück zur Startseite">
        ← Zurück
      </a>

      {/* Area Selector */}
      <div className="area-selector">
        {AREAS.map(area => (
          <button
            key={area.id}
            className={`area-btn ${selectedArea === area.id ? 'active' : ''}`}
            onClick={() => selectArea(area.id)}
          >
            {area.label}
          </button>
        ))}
      </div>

      {/* Map */}
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>

      {/* Tools Panel */}
      <div className={`map-tools-panel ${toolsExpanded ? 'expanded' : ''}`}>
        <button
          className="tools-toggle"
          onClick={() => setToolsExpanded(!toolsExpanded)}
        >
          {toolsExpanded ? '✕ Schließen' : '⚙️ Tools'}
        </button>
        {toolsExpanded && (
          <div className="tools-content">
            {map && <DistanceMeasurementTool map={map} />}
            {map && <CreateTree map={map} onTreeAdded={handleTreeAdded} />}
            {map && <TreeTracking map={map} />}
          </div>
        )}
      </div>

      {/* Location Control */}
      <div className="location-control-overlay">
        {map && <UserLocationControl map={map} />}
      </div>

      {/* Tree Loader (hidden, just loads data) */}
      {map && <TreeLoader map={map} />}
    </div>
  );
};

export default Map;
