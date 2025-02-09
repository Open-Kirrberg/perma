import L from "leaflet";

export const createTreePopupContent = (map, tree, onUpdateTree, onDownloadTree) => {
    const container = document.createElement("div");

    // Define tree marker icon
  const treeIcon = L.divIcon({
    className: 'tree-icon',
    html: '🌳',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

    // add tree id as id attribute
    container.id = `tree-${tree.id}`;

    const details = `
      <b>${tree.name}</b><br>
      <ul>
        <li><b>Kind:</b> ${tree.kind}</li>
        <li><b>Height:</b> ${tree.height} m</li>
        <li><b>Birth Date:</b> ${tree.birth}</li>
        <li><b>Planter:</b> ${tree.planter}</li>
        <li><b>Notes:</b> ${tree.notes}</li>
      </ul>
    `;

    container.innerHTML = details;

    const editButton = document.createElement("button");
    editButton.classList.add("button", "button-primary");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
        const editForm = document.createElement("form");

        editForm.innerHTML = `
          <label>
            Name:
            <input type="text" name="name" value="${tree.name}" />
          </label>
          <br />
          <label>
            Kind:
            <input type="text" name="kind" value="${tree.kind}" />
          </label>
          <br />
          <label>
            Height (m):
            <input type="number" name="height" step="0.01" value="${tree.height}" />
          </label>
          <br />
          <label>
            Birth Date:
            <input type="date" name="birth" value="${tree.birth}" />
          </label>
          <br />
          <label>
            Planter:
            <input type="text" name="planter" value="${tree.planter}" />
          </label>
          <br />
          <label>
            Notes:
            <textarea name="notes">${tree.notes}</textarea>
          </label>
          <br />
          <button type="submit" class="button button-primary" style="margin-right: 5px;">Save</button>
          <button type="button" id="cancel-edit">Cancel</button>
        `;
        // Display the form in the popup
        const popup = L.popup()
            .setLatLng([tree.lat, tree.lon])
            .setContent(editForm)
            .openOn(map);

        // Handle form submission
        editForm.onsubmit = (e) => {
            e.preventDefault();

            const updatedTree = {
                ...tree,
                name: editForm.name.value,
                kind: editForm.kind.value,
                height: parseFloat(editForm.height.value),
                birth: editForm.birth.value,
                planter: editForm.planter.value,
                notes: editForm.notes.value,
            };

            onUpdateTree(updatedTree, tree); // Call the update handler

            map.closePopup(); // Close the edit form popup

            // Remove the old marker
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker && layer.getLatLng().equals([tree.lat, tree.lon])) {
                    map.removeLayer(layer);
                }
            });

            // Add the updated marker with new popup
            const newMarker = L.marker([updatedTree.lat, updatedTree.lon], { icon: treeIcon}).addTo(map);
            newMarker.bindPopup(createTreePopupContent(map, updatedTree, onUpdateTree, onDownloadTree));
        };

        // Handle cancel action
        document.getElementById("cancel-edit").onclick = () => {
            map.closePopup();
        };


    };

    const downloadButton = document.createElement("button");
    downloadButton.classList.add("button", "button-primary");
    downloadButton.textContent = "Download JSON";
    downloadButton.onclick = () => {
        const jsonBlob = new Blob([JSON.stringify(tree, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(jsonBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tree_${tree.id}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    container.appendChild(editButton);
    container.appendChild(downloadButton);

    return container;
};
