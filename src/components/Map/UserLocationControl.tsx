import React, { useState, useEffect } from 'react';
import L from 'leaflet';

type Props = {
  map: L.Map | null;
};

/**
 * UserLocationControl
 *
 * - Button 1: Standortanzeige an/aus (zeigt eine Reihe von Markern, um Verlauf zu visualisieren).
 * - Button 2: Präzisen Modus an/aus (zeigt einen präzisen Marker, entfernt alle anderen Marker).
 * - Button 3: Zum aktuellen Standort springen.
 * - Button 4: Entfernt alle Location Marker.
 */
export const UserLocationControl: React.FC<Props> = ({ map }) => {
  const [showLocation, setShowLocation] = useState(false);
  const [preciseLocation, setPreciseLocation] = useState(false);
  const [locationMarker, setLocationMarker] = useState<L.Marker | null>(null);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!map) return;

    // Bauer-Icon (Standard)
    const normalIcon = L.divIcon({
      className: 'normal-bauer-icon',
      html: '👨‍🌾',
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });

    // Gut sichtbares Icon für präzisen Modus
    const preciseIcon = L.divIcon({
      className: 'precise-semi-icon',
      html: '<span style="font-size:20px; color:red;">📍</span>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    // 1) Wenn Standortanzeige ausgeschaltet -> Marker aufräumen
    if (!showLocation) {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      markers.forEach((m) => map.removeLayer(m));
      setMarkers([]);
      if (locationMarker) {
        map.removeLayer(locationMarker);
        setLocationMarker(null);
      }
      return;
    }

    // 2) Falls bereits ein Watcher läuft, beenden wir ihn, um den aktuellen State (preciseLocation) zu nutzen.
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }

    // Permissions prüfen (optional)
    (async () => {
      if (navigator.permissions) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: 'geolocation' as PermissionName,
          });
          if (permissionStatus.state === 'denied') {
            alert('Bitte aktiviere den Standortzugriff in deinen Browser-Einstellungen.');
            return;
          }
        } catch (err) {
          console.error('Fehler beim Prüfen der Geolocation-Permissions:', err);
        }
      }
    })();

    // 3) Neuen Watcher anlegen
    if (navigator.geolocation) {
      const newId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCurrentPosition([latitude, longitude]);

          if (preciseLocation) {
            // Alle normalen Marker entfernen
            markers.forEach((m) => map.removeLayer(m));
            setMarkers([]);

            // Entferne alten präzisen Marker, falls vorhanden
            if (locationMarker) {
              map.removeLayer(locationMarker);
              setLocationMarker(null);
            }
            // Setze den präzisen Marker
            const preciseMarker = L.marker([latitude, longitude], { icon: preciseIcon }).addTo(map);
            preciseMarker.bindPopup(`
              Genauer Standort: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}<br>
              `);
            setLocationMarker(preciseMarker);
            map.setView([latitude, longitude], 19);
          } else {
            // Mehrere Bauer-Marker im normalen Modus
            const newMarker = L.marker([latitude, longitude], { icon: normalIcon }).addTo(map);
            newMarker.bindPopup('Position aktualisiert (Bauer)');
            setMarkers((prev) => [...prev, newMarker]);
          }
        },
        (error) => {
          console.error('Geolocation-Fehler:', error);
          if (error.code === 1) {
            alert('Bitte erlaube den Standortzugriff im Browser, damit deine Position angezeigt werden kann.');
          }
        },
        { enableHighAccuracy: true }
      );
      setWatchId(newId);
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [showLocation, preciseLocation, map]);

  // Handler: Zum aktuellen Standort springen
  const handleJumpToCurrentLocation = () => {
    if (map && currentPosition) {
      map.setView(currentPosition, preciseLocation ? 19 : 16);
    }
  };

  // Handler: Alle Standortmarker entfernen
  const handleRemoveMarkers = () => {
    if (map) {
      markers.forEach((m) => map.removeLayer(m));
      setMarkers([]);
      if (locationMarker) {
        map.removeLayer(locationMarker);
        setLocationMarker(null);
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button className="button button--primary" onClick={() => setShowLocation(!showLocation)}>
        {showLocation ? 'Standort ausblenden' : 'Standort anzeigen'}
      </button>
      <button className="button button--secondary" onClick={() => setPreciseLocation(!preciseLocation)} disabled={!showLocation}>
        {preciseLocation ? 'Präzisen Modus aus' : 'Präzisen Modus an'}
      </button>
      <button className="button button--secondary" onClick={handleJumpToCurrentLocation} disabled={!showLocation || !currentPosition}>
        Zum aktuellen Standort springen
      </button>
      <button className="button button--danger" onClick={handleRemoveMarkers} disabled={!map}>
        Remove all Location Markers
      </button>
    </div>
  );
};