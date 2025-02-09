// src/components/TreeTracking.js

import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import proj4 from 'proj4';
import { v4 as uuidv4 } from 'uuid';

const TreeTracking = ({ map }) => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);

  // Function to add a tree
  const addTree = (tree) => {
    setTrees((prevTrees) => [...prevTrees, tree]);
    const marker = L.marker([tree.lat, tree.lon], {
      icon: L.divIcon({
        className: 'tree-icon',
        html: '🌳',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    })
      .addTo(map)
      .bindPopup(
        `<b>${tree.kind}</b><br>Planted by: ${tree.planter}<br>Birth: ${tree.birth}<br>Size: ${tree.size}m`
      );

    marker.on('click', () => {
      setSelectedTree(tree);
    });
  };

  // Function to measure a tree (mockup implementation)
  const measureTree = (coordinates) => {
    // Mock measurement data
    return {
      size: Math.random() * 5 + 1, // Random size between 1 and 6 meters
    };
  };

  // Function to add a new tree with measurement
  const handleAddTree = (lat, lon) => {
    const measurement = measureTree([lat, lon]);
    const newTree = {
      id: uuidv4(),
      kind: 'Unknown',
      planter: 'Anonymous',
      birth: new Date().toISOString().split('T')[0],
      size: measurement.size.toFixed(2),
      lat,
      lon,
      notes: [],
      yearlyReports: [],
    };
    addTree(newTree);
  };

  // Function to add a note to a tree
  const addNoteToTree = (treeId, note) => {
    setTrees((prevTrees) =>
      prevTrees.map((tree) =>
        tree.id === treeId ? { ...tree, notes: [...tree.notes, note] } : tree
      )
    );
  };

  // Function to add a yearly report
  const addYearlyReport = (treeId, report) => {
    setTrees((prevTrees) =>
      prevTrees.map((tree) =>
        tree.id === treeId
          ? { ...tree, yearlyReports: [...tree.yearlyReports, report] }
          : tree
      )
    );
  };

  // Calculate value of an area based on trees
  const calculateAreaValue = () => {
    return trees.reduce((sum, tree) => sum + parseFloat(tree.size) * 10, 0).toFixed(2); // Example: Each meter of tree size adds 10 currency units
  };

  return (
    <div>
      <button
        onClick={() => {
          const center = map.getCenter();
          handleAddTree(center.lat, center.lng);
        }}
      >
        Add Tree at Center
      </button>

      {selectedTree && (
        <div>
          <h3>Selected Tree</h3>
          <p>Kind: {selectedTree.kind}</p>
          <p>Planter: {selectedTree.planter}</p>
          <p>Size: {selectedTree.size}m</p>
          <p>Birth: {selectedTree.birth}</p>
          <button
            onClick={() =>
              addNoteToTree(selectedTree.id, prompt('Enter a note for this tree'))
            }
          >
            Add Note
          </button>
          <button
            onClick={() =>
              addYearlyReport(
                selectedTree.id,
                prompt('Enter a yearly report for this tree')
              )
            }
          >
            Add Yearly Report
          </button>
        </div>
      )}

      <div>
        <h3>Total Area Value: {calculateAreaValue()} currency units</h3>
      </div>
    </div>
  );
};

export default TreeTracking;

// To use the component, extend the Map component as follows:

// src/components/Map.js (Extension)

// In your Map component, add:
// import TreeTracking from './TreeTracking';

// Inside the JSX of your Map component:
// {map && <TreeTracking map={map} />}
