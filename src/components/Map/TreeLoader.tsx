import React, { useEffect, useState } from "react";
import L from "leaflet";

const TreeLoader = ({ map }) => {
  const [trees, setTrees] = useState([]);

   // Define tree marker icon
   const treeIcon = L.divIcon({
    className: 'tree-icon',
    html: '🌳',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
  // Function to load trees from a JSON file
  const loadTreesFromFile = async () => {
    try {
      const response = await fetch("/data/trees/2900.json");
      const json = await response.json();
      console.log("json")
      console.log(json)
      setTrees(json.trees);

      // Add trees to the map
      json.trees.forEach((tree) => {
        const marker = L.marker([tree.lat, tree.lon], {icon: treeIcon}).addTo(map);
        marker.bindPopup(`
          <b>${tree.name}</b><br>
          <ul>
            <li><b>Kind:</b> ${tree.kind}</li>
            <li><b>Height:</b> ${tree.height} m</li>
            <li><b>Birth Date:</b> ${tree.birth}</li>
            <li><b>Planter:</b> ${tree.planter}</li>
            <li><b>Notes:</b> ${tree.notes}</li>
          </ul>
        `);
      });
    } catch (error) {
      console.error("Failed to load trees:", error);
    }
  };

  useEffect(() => {
    if (map) {
      loadTreesFromFile();
    }
  }, [map]);

  return null; // This component doesn't render anything itself
};

export default TreeLoader;
