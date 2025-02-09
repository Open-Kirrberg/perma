import React, { useState, useEffect } from 'react';
import L from 'leaflet';

type Props = {
  map: L.Map | null;
};

export const UserLocationControl: React.FC<Props> = ({ map }) => {
  const [showLocation, setShowLocation] = useState(false);
  const [locationMarker, setLocationMarker] = useState<L.Marker | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    if (!map) return;

    async function handleLocation() {
      if (showLocation) {
        // Prüfen, ob wir fragen können oder bereits abgelehnt wurde
        if (navigator.permissions) {
          try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
            if (permissionStatus.state === 'denied') {
              alert('Bitte aktiviere den Standortzugriff in deinen Browser-Einstellungen.');
              return;
            }
          } catch (err) {
            console.error('Fehler beim Prüfen des Geolocation-Permissions:', err);
          }
        }

        if (navigator.geolocation) {
          const id = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              if (!locationMarker) {
                const userIcon = L.divIcon({
                            className: 'tree-icon',
                            html: '👨‍🌾',
                            iconSize: [16, 16],
                            iconAnchor: [12, 12],
                        });
                const marker = L.marker([latitude, longitude], {icon: userIcon}).addTo(map);
                marker.bindPopup('Deine Position');
                setLocationMarker(marker);
              } else {
                locationMarker.setLatLng([latitude, longitude]);
              }
            },
            (error) => {
              console.error('Geolocation-Fehler:', error);
              if (error.code === 1) {
                alert(
                  'Bitte erlaube den Standortzugriff im Browser, damit deine Position angezeigt werden kann.'
                );
              }
            },
            { enableHighAccuracy: true }
          );
          setWatchId(id);
        }
      } else {
        if (watchId) navigator.geolocation.clearWatch(watchId);
        if (locationMarker) {
          map.removeLayer(locationMarker);
          setLocationMarker(null);
        }
      }
    }

    handleLocation();

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [showLocation, map]);

  return (
    <button onClick={() => setShowLocation(!showLocation)}>
      {showLocation ? 'Standort ausblenden' : 'Standort anzeigen'}
    </button>
  );
};