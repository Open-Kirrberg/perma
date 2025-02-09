import React, { useState } from "react";
import L from "leaflet";

const CreateTree = ({ map, onTreeAdded }) => {
    const [creatingTree, setCreatingTree] = useState(false);
    const [currentMarker, setCurrentMarker] = useState(null);
    const [currentCoords, setCurrentCoords] = useState(null);

    const startTreeCreation = () => {
        if (!map) return;
        setCreatingTree(true);

        const treeIcon = L.divIcon({
            className: 'tree-icon',
            html: '🌳',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        const center = map.getCenter();
        const marker = L.marker(center, { draggable: true, icon: treeIcon }).addTo(map);
        setCurrentMarker(marker);
        setCurrentCoords(center);

        // Update coordinates as map moves
        const updateCoords = () => {
            const newCenter = map.getCenter();
            marker.setLatLng(newCenter);
            setCurrentCoords(newCenter);
        };

        map.on("move", updateCoords);

        // Cleanup on cancel or save
        const cleanup = () => {
            map.off("move", updateCoords);
            map.removeLayer(marker);
            setCreatingTree(false);
            setCurrentMarker(null);
            setCurrentCoords(null);
            // get the html element with the class create-tree-controls
            // remove the element from the DOM
            let controls = document.getElementsByClassName("create-tree-controls");
            if (controls.length > 0) {
                controls[0].remove();
            }

        };

        // Cancel button action
        const cancelTree = () => {
            cleanup();
        };

        // Save tree action
        const saveTree = () => {
            const latLng = marker.getLatLng();
            cleanup();
            onTreeAdded({
                id: Date.now(),
                name: "New Tree",
                kind: "",
                height: 0,
                birth: new Date().toISOString().split("T")[0],
                planter: "",
                notes: "",
                lat: latLng.lat,
                lon: latLng.lng,
            });
        };

        // Add control buttons
        const controls = L.control({ position: "topright" });
        controls.onAdd = () => {
            console.log("onAdd")
            const div = L.DomUtil.create("div", "create-tree-controls");
            div.innerHTML = `
        <button id="set-tree" class="button button--primary" style="margin-right: 5px;">Set</button>
        <button id="cancel-tree" class="button button--danger" >Cancel</button>
      `;
            return div;
        };
        controls.addTo(map);

        document.getElementById("set-tree").onclick = saveTree;
        document.getElementById("cancel-tree").onclick = cancelTree;
    };

    return (
        <>
            <button
                onClick={startTreeCreation}
                style={{

                }}
            >
                Add New Tree
            </button>
            test
        </>
    );
};

export default CreateTree;
