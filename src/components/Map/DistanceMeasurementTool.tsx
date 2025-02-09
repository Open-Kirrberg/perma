import React, { useEffect, useState } from "react";
import L from "leaflet";

const DistanceMeasurementTool = ({ map }) => {
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [previewLine, setPreviewLine] = useState(null);

  useEffect(() => {
    if (!map || !isActive) return;

    const handleMapClick = (e) => {
      const newPoint = [e.latlng.lat, e.latlng.lng];

      if (points.length === 0) {
        // Add the first point
        setPoints([newPoint]);
      } else if (points.length === 1) {
        // Add the second point and calculate final distance
        setPoints((prev) => [...prev, newPoint]);
        const [lat1, lon1] = points[0];
        const [lat2, lon2] = newPoint;
        setDistance(calculateDistanceInMeters(lat1, lon1, lat2, lon2));

        // Remove the live preview line
        if (previewLine) {
          map.removeLayer(previewLine);
          setPreviewLine(null);
        }
      }
    };

    const handleMouseMove = (e) => {
      if (points.length === 1) {
        const [lat1, lon1] = points[0];
        const [lat2, lon2] = [e.latlng.lat, e.latlng.lng];

        // Update live distance
        const liveDistance = calculateDistanceInMeters(lat1, lon1, lat2, lon2);
        setDistance(liveDistance);

        // Update live preview line
        if (previewLine) {
          map.removeLayer(previewLine);
        }
        const newPreviewLine = L.polyline([points[0], [lat2, lon2]], { color: "blue", dashArray: "5, 5" }).addTo(map);
        setPreviewLine(newPreviewLine);
      }
    };

    const handleMouseOut = () => {
      // Remove the preview line if the mouse leaves the map
      if (previewLine) {
        map.removeLayer(previewLine);
        setPreviewLine(null);
      }
    };

    map.on("click", handleMapClick);
    map.on("mousemove", handleMouseMove);
    map.on("mouseout", handleMouseOut);

    return () => {
      map.off("click", handleMapClick);
      map.off("mousemove", handleMouseMove);
      map.off("mouseout", handleMouseOut);
    };
  }, [map, isActive, points, previewLine]);

  const resetMeasurement = () => {
    setPoints([]);
    setDistance(null);

    // Remove the live preview line
    if (previewLine) {
      map.removeLayer(previewLine);
      setPreviewLine(null);
    }
  };

  const toggleMeasurement = () => {
    setIsActive((prev) => !prev);

    // Reset measurement state if disabled
    if (isActive) {
      resetMeasurement();
    }
  };

  return (
    <div>
    {/* <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000, background: "white", padding: "10px" }}> */}
      <h4>Distance Measurement Tool</h4>
      <button onClick={toggleMeasurement} style={{ marginBottom: "10px" }}>
        {isActive ? "Disable Measurement" : "Enable Measurement"}
      </button>
      {isActive && (
        <>
          {points.length === 0 && <p>Click on the map to set the first point.</p>}
          {points.length === 1 && <p>Move the mouse to preview the distance, then click to set the second point.</p>}
          {distance && (
            <p>
              Distance: <b>{distance.toFixed(2)} meters</b>
            </p>
          )}
          <button onClick={resetMeasurement} style={{ marginTop: "10px" }}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

// Haversine function
const calculateDistanceInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Radius of Earth in meters
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

export default DistanceMeasurementTool;
