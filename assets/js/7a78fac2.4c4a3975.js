(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5142],{2453:(e,t,n)=>{"use strict";n.d(t,{A:()=>g});var o=n(6540),r=n(3481),a=n.n(r),i=n(4957),l=n(4526),s=n(4848);const c=e=>{let{map:t}=e;const[n,r]=(0,o.useState)([]),[i,c]=(0,o.useState)(null),d=(e,n)=>{const o={size:5*Math.random()+1},i={id:(0,l.A)(),kind:"Unknown",planter:"Anonymous",birth:(new Date).toISOString().split("T")[0],size:o.size.toFixed(2),lat:e,lon:n,notes:[],yearlyReports:[]};var s;s=i,r((e=>[...e,s])),a().marker([s.lat,s.lon],{icon:a().divIcon({className:"tree-icon",html:"\ud83c\udf33",iconSize:[24,24],iconAnchor:[12,12]})}).addTo(t).bindPopup(`<b>${s.kind}</b><br>Planted by: ${s.planter}<br>Birth: ${s.birth}<br>Size: ${s.size}m`).on("click",(()=>{c(s)}))};return(0,s.jsxs)("div",{children:[(0,s.jsx)("button",{onClick:()=>{const e=t.getCenter();d(e.lat,e.lng)},children:"Add Tree at Center"}),i&&(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{children:"Selected Tree"}),(0,s.jsxs)("p",{children:["Kind: ",i.kind]}),(0,s.jsxs)("p",{children:["Planter: ",i.planter]}),(0,s.jsxs)("p",{children:["Size: ",i.size,"m"]}),(0,s.jsxs)("p",{children:["Birth: ",i.birth]}),(0,s.jsx)("button",{onClick:()=>{return e=i.id,t=prompt("Enter a note for this tree"),void r((n=>n.map((n=>n.id===e?{...n,notes:[...n.notes,t]}:n))));var e,t},children:"Add Note"}),(0,s.jsx)("button",{onClick:()=>{return e=i.id,t=prompt("Enter a yearly report for this tree"),void r((n=>n.map((n=>n.id===e?{...n,yearlyReports:[...n.yearlyReports,t]}:n))));var e,t},children:"Add Yearly Report"})]}),(0,s.jsx)("div",{children:(0,s.jsxs)("h3",{children:["Total Area Value: ",n.reduce(((e,t)=>e+10*parseFloat(t.size)),0).toFixed(2)," currency units"]})})]})},d=e=>{let{map:t}=e;const[n,r]=(0,o.useState)([]),i=a().divIcon({className:"tree-icon",html:"\ud83c\udf33",iconSize:[24,24],iconAnchor:[12,12]});return(0,o.useEffect)((()=>{t&&(async()=>{try{const e=await fetch("/data/trees/2900.json"),n=await e.json();console.log("json"),console.log(n),r(n.trees),n.trees.forEach((e=>{a().marker([e.lat,e.lon],{icon:i}).addTo(t).bindPopup(`\n          <b>${e.name}</b><br>\n          <ul>\n            <li><b>Kind:</b> ${e.kind}</li>\n            <li><b>Height:</b> ${e.height} m</li>\n            <li><b>Birth Date:</b> ${e.birth}</li>\n            <li><b>Planter:</b> ${e.planter}</li>\n            <li><b>Notes:</b> ${e.notes}</li>\n          </ul>\n        `)}))}catch(e){console.error("Failed to load trees:",e)}})()}),[t]),null},u=e=>{let{map:t,onTreeAdded:n}=e;const[r,i]=(0,o.useState)(!1),[l,c]=(0,o.useState)(null),[d,u]=(0,o.useState)(null);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{onClick:()=>{if(!t)return;i(!0);const e=a().divIcon({className:"tree-icon",html:"\ud83c\udf33",iconSize:[24,24],iconAnchor:[12,12]}),o=t.getCenter(),r=a().marker(o,{draggable:!0,icon:e}).addTo(t);c(r),u(o);const l=()=>{const e=t.getCenter();r.setLatLng(e),u(e)};t.on("move",l);const s=()=>{t.off("move",l),t.removeLayer(r),i(!1),c(null),u(null);let e=document.getElementsByClassName("create-tree-controls");e.length>0&&e[0].remove()},d=a().control({position:"topright"});d.onAdd=()=>{console.log("onAdd");const e=a().DomUtil.create("div","create-tree-controls");return e.innerHTML='\n        <button id="set-tree" class="button button--primary" style="margin-right: 5px;">Set</button>\n        <button id="cancel-tree" class="button button--danger" >Cancel</button>\n      ',e},d.addTo(t),document.getElementById("set-tree").onclick=()=>{const e=r.getLatLng();s(),n({id:Date.now(),name:"New Tree",kind:"",height:0,birth:(new Date).toISOString().split("T")[0],planter:"",notes:"",lat:e.lat,lon:e.lng})},document.getElementById("cancel-tree").onclick=()=>{s()}},style:{},children:"Add New Tree"}),"test"]})},p=(e,t,n,o)=>{const r=document.createElement("div"),i=a().divIcon({className:"tree-icon",html:"\ud83c\udf33",iconSize:[24,24],iconAnchor:[12,12]});r.id=`tree-${t.id}`;const l=`\n      <b>${t.name}</b><br>\n      <ul>\n        <li><b>Kind:</b> ${t.kind}</li>\n        <li><b>Height:</b> ${t.height} m</li>\n        <li><b>Birth Date:</b> ${t.birth}</li>\n        <li><b>Planter:</b> ${t.planter}</li>\n        <li><b>Notes:</b> ${t.notes}</li>\n      </ul>\n    `;r.innerHTML=l;const s=document.createElement("button");s.classList.add("button","button-primary"),s.textContent="Edit",s.onclick=()=>{const r=document.createElement("form");r.innerHTML=`\n          <label>\n            Name:\n            <input type="text" name="name" value="${t.name}" />\n          </label>\n          <br />\n          <label>\n            Kind:\n            <input type="text" name="kind" value="${t.kind}" />\n          </label>\n          <br />\n          <label>\n            Height (m):\n            <input type="number" name="height" step="0.01" value="${t.height}" />\n          </label>\n          <br />\n          <label>\n            Birth Date:\n            <input type="date" name="birth" value="${t.birth}" />\n          </label>\n          <br />\n          <label>\n            Planter:\n            <input type="text" name="planter" value="${t.planter}" />\n          </label>\n          <br />\n          <label>\n            Notes:\n            <textarea name="notes">${t.notes}</textarea>\n          </label>\n          <br />\n          <button type="submit" class="button button-primary" style="margin-right: 5px;">Save</button>\n          <button type="button" id="cancel-edit">Cancel</button>\n        `;a().popup().setLatLng([t.lat,t.lon]).setContent(r).openOn(e);r.onsubmit=l=>{l.preventDefault();const s={...t,name:r.name.value,kind:r.kind.value,height:parseFloat(r.height.value),birth:r.birth.value,planter:r.planter.value,notes:r.notes.value};n(s,t),e.closePopup(),e.eachLayer((n=>{n instanceof a().Marker&&n.getLatLng().equals([t.lat,t.lon])&&e.removeLayer(n)}));a().marker([s.lat,s.lon],{icon:i}).addTo(e).bindPopup(p(e,s,n,o))},document.getElementById("cancel-edit").onclick=()=>{e.closePopup()}};const c=document.createElement("button");return c.classList.add("button","button-primary"),c.textContent="Download JSON",c.onclick=()=>{const e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=`tree_${t.id}.json`,o.click(),URL.revokeObjectURL(n)},r.appendChild(s),r.appendChild(c),r},m=(e,t,n,o)=>{const r=e=>e*Math.PI/180,a=r(n-e),i=r(o-t),l=Math.sin(a/2)*Math.sin(a/2)+Math.cos(r(e))*Math.cos(r(n))*Math.sin(i/2)*Math.sin(i/2);return 6371e3*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))},h=e=>{let{map:t}=e;const[n,r]=(0,o.useState)([]),[i,l]=(0,o.useState)(null),[c,d]=(0,o.useState)(!1),[u,p]=(0,o.useState)(null);(0,o.useEffect)((()=>{if(!t||!c)return;const e=e=>{const o=[e.latlng.lat,e.latlng.lng];if(0===n.length)r([o]);else if(1===n.length){r((e=>[...e,o]));const[e,a]=n[0],[i,s]=o;l(m(e,a,i,s)),u&&(t.removeLayer(u),p(null))}},o=e=>{if(1===n.length){const[o,r]=n[0],[i,s]=[e.latlng.lat,e.latlng.lng],c=m(o,r,i,s);l(c),u&&t.removeLayer(u);const d=a().polyline([n[0],[i,s]],{color:"blue",dashArray:"5, 5"}).addTo(t);p(d)}},i=()=>{u&&(t.removeLayer(u),p(null))};return t.on("click",e),t.on("mousemove",o),t.on("mouseout",i),()=>{t.off("click",e),t.off("mousemove",o),t.off("mouseout",i)}}),[t,c,n,u]);const h=()=>{r([]),l(null),u&&(t.removeLayer(u),p(null))};return(0,s.jsxs)("div",{children:[(0,s.jsx)("h4",{children:"Distance Measurement Tool"}),(0,s.jsx)("button",{onClick:()=>{d((e=>!e)),c&&h()},style:{marginBottom:"10px"},children:c?"Disable Measurement":"Enable Measurement"}),c&&(0,s.jsxs)(s.Fragment,{children:[0===n.length&&(0,s.jsx)("p",{children:"Click on the map to set the first point."}),1===n.length&&(0,s.jsx)("p",{children:"Move the mouse to preview the distance, then click to set the second point."}),i&&(0,s.jsxs)("p",{children:["Distance: ",(0,s.jsxs)("b",{children:[i.toFixed(2)," meters"]})]}),(0,s.jsx)("button",{onClick:h,style:{marginTop:"10px"},children:"Reset"})]})]})},b=e=>{let{map:t}=e;const[n,r]=(0,o.useState)(!1),[i,l]=(0,o.useState)(!1),[c,d]=(0,o.useState)(null),[u,p]=(0,o.useState)([]),[m,h]=(0,o.useState)(null),[b,g]=(0,o.useState)(null);(0,o.useEffect)((()=>{if(!t)return;const e=a().divIcon({className:"normal-bauer-icon",html:"\ud83d\udc68\u200d\ud83c\udf3e",iconSize:[25,25],iconAnchor:[12,12]}),o=a().divIcon({className:"precise-semi-icon",html:'<span style="font-size:20px; color:red;">\ud83d\udccd</span>',iconSize:[20,20],iconAnchor:[10,10]});if(!n)return m&&(navigator.geolocation.clearWatch(m),h(null)),u.forEach((e=>t.removeLayer(e))),p([]),void(c&&(t.removeLayer(c),d(null)));if(m&&(navigator.geolocation.clearWatch(m),h(null)),(async()=>{if(navigator.permissions)try{if("denied"===(await navigator.permissions.query({name:"geolocation"})).state)return void alert("Bitte aktiviere den Standortzugriff in deinen Browser-Einstellungen.")}catch(e){console.error("Fehler beim Pr\xfcfen der Geolocation-Permissions:",e)}})(),navigator.geolocation){const n=navigator.geolocation.watchPosition((n=>{const{latitude:r,longitude:l}=n.coords;if(g([r,l]),i){u.forEach((e=>t.removeLayer(e))),p([]),c&&(t.removeLayer(c),d(null));const e=a().marker([r,l],{icon:o}).addTo(t);e.bindPopup(`\n              Genauer Standort: ${r.toFixed(6)}, ${l.toFixed(6)}<br>\n              `),d(e),t.setView([r,l],19)}else{const n=a().marker([r,l],{icon:e}).addTo(t);n.bindPopup("Position aktualisiert (Bauer)"),p((e=>[...e,n]))}}),(e=>{console.error("Geolocation-Fehler:",e),1===e.code&&alert("Bitte erlaube den Standortzugriff im Browser, damit deine Position angezeigt werden kann.")}),{enableHighAccuracy:!0});h(n)}return()=>{m&&navigator.geolocation.clearWatch(m)}}),[n,i,t]);return(0,s.jsxs)("div",{style:{display:"flex",gap:"1rem"},children:[(0,s.jsx)("button",{className:"button button--primary",onClick:()=>r(!n),children:n?"Standort ausblenden":"Standort anzeigen"}),(0,s.jsx)("button",{className:"button button--secondary",onClick:()=>l(!i),disabled:!n,children:i?"Pr\xe4zisen Modus aus":"Pr\xe4zisen Modus an"}),(0,s.jsx)("button",{className:"button button--secondary",onClick:()=>{t&&b&&t.setView(b,i?19:16)},disabled:!n||!b,children:"Zum aktuellen Standort springen"}),(0,s.jsx)("button",{className:"button button--danger",onClick:()=>{t&&(u.forEach((e=>t.removeLayer(e))),p([]),c&&(t.removeLayer(c),d(null)))},disabled:!t,children:"Remove all Location Markers"})]})},g=()=>{const[e,t]=(0,o.useState)(null),r=a().divIcon({className:"tree-icon",html:"\ud83c\udf33",iconSize:[24,24],iconAnchor:[12,12]}),l=(e,t)=>{console.log("Updated Tree:",e)},m=e=>{console.log("downloadTree Tree:",e)},g=(e,t)=>{const[n,o]=(0,i.A)("+proj=utm +zone=32 +ellps=GRS80 +datum=WGS84 +units=m +no_defs","+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",[e,t]);return[o,n]},y=e=>{if("MultiPolygon"===e.geometry.type){const t=e.geometry.coordinates.map((e=>e.map((e=>e.map((e=>{let[t,n]=e;const[o,r]=g(t,n);return[r,o]}))))));return{...e,geometry:{...e.geometry,coordinates:t}}}if("Polygon"===e.geometry.type){const t=e.geometry.coordinates.map((e=>e.map((e=>{let[t,n]=e;const[o,r]=g(t,n);return[r,o]}))));return{...e,geometry:{...e.geometry,coordinates:t}}}return e};(0,o.useEffect)((()=>{const e=a().map("map").setView([49.29344,7.353419],17),o={Normal:a().tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(e),Realistic:a().tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:'&copy; <a href="https://2gis.com">2GIS</a>'})};a().control.layers(o).addTo(e);return[{id:1,name:"Apple Tree",lat:49.313,lon:7.34}].forEach((t=>{const n=a().marker([t.lat,t.lon],{icon:r}).addTo(e).bindPopup(`<b>${t.name}</b>`);n.on("click",(()=>{n.openPopup(),n.setZIndexOffset(1e3)}))})),(async()=>{const e=n(9804),t=[];for(const n of e.keys()){const o=await e(n),r={...o,features:o.features.map(y)};t.push(r)}return t})().then((t=>{t.forEach((t=>{a().geoJSON(t,{style:{color:"red",weight:2},onEachFeature:(e,t)=>{t.bindPopup(`<b>Area ID: ${e.properties.FLZ}</b><br>Name: ${e.properties.NAME}`),t.on("click",(()=>{t.setStyle({color:"blue",weight:4}),setTimeout((()=>t.setStyle({color:"red",weight:2})),1e3)}))}}).addTo(e)}))})),e.on("click",(t=>{const{lat:n,lng:o}=t.latlng,r=`\n        <div>\n          <p>Latitude: ${n.toFixed(6)}</p>\n          <p>Longitude: ${o.toFixed(6)}</p>\n          <p>\n            <a href="https://www.google.com/maps?q=${n},${o}" target="_blank">\n              Navigate with Google Maps\n            </a>\n          </p>\n        </div>\n      `;a().popup().setLatLng(t.latlng).setContent(r).openOn(e)})),t(e),()=>{e.remove()}}),[]);return(0,s.jsxs)("div",{children:[(0,s.jsx)("input",{type:"text",placeholder:"Search by Area ID (FLZ)",onChange:t=>{const n=t.target.value;e&&n&&e.eachLayer((t=>{t.feature&&t.feature.properties.FLZ===n&&(e.fitBounds(t.getBounds()),t.openPopup())}))},style:{marginBottom:"10px",padding:"5px",width:"100%"}}),(0,s.jsx)("div",{id:"map",style:{height:"500px",width:"100%"}}),e&&(0,s.jsx)(c,{map:e}),e&&(0,s.jsx)(d,{map:e}),e&&(0,s.jsx)(u,{map:e,onTreeAdded:t=>{a().marker([t.lat,t.lon],{icon:r}).addTo(e).bindPopup(p(e,t,l,m))}}),e&&(0,s.jsx)(h,{map:e}),e&&(0,s.jsx)(b,{map:e})]})}},2324:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});n(6540);var o=n(781),r=n(8478),a=n(4848);function i(){return(0,a.jsxs)(o.A,{children:[(0,a.jsx)("h1",{children:"Fruit Trees and Areas"}),(0,a.jsx)(r.A,{fallback:(0,a.jsx)("div",{children:"Lade Map \u2026"}),children:()=>{const e=n(2453).A;return(0,a.jsx)(e,{})}})]})}},9804:(e,t,n)=>{var o={"./2900.json":4123,"./2901.json":4776,"./2902-4.json":1680};function r(e){var t=a(e);return n(t)}function a(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}r.keys=function(){return Object.keys(o)},r.resolve=a,e.exports=r,r.id=9804},4123:e=>{"use strict";e.exports=JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","id":"","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::25832"}},"geometry":{"type":"MultiPolygon","coordinates":[[[[380010.263,5461291.585],[380015.4,5461282.694],[380019.601,5461275.423],[380129.491,5461322.236],[380206.181,5461354.506],[380184.555,5461354.095],[380162.139,5461353.667],[380113.465,5461332.924],[380010.263,5461291.585]]],[[[380167.795,5461356.078],[380190.747,5461356.45],[380211.601,5461356.787],[380275.618,5461381.9],[380272.181,5461389.388],[380267.354,5461399.905],[380203.984,5461370.015],[380203.331,5461371.222],[380167.795,5461356.078]]],[[[379939.204,5461241.569],[379988.892,5461262.341],[379986.214,5461263.665],[379983.471,5461264.841],[379977.776,5461267.232],[379967.896,5461271.379],[379964.562,5461272.341],[379962.276,5461272.376],[379960.778,5461272.049],[379957.176,5461269.871],[379951.333,5461264.516],[379948.475,5461261.645],[379947.044,5461259.594],[379946.001,5461257.838],[379942.427,5461250.114],[379939.204,5461241.569]]],[[[379968.799,5461274.975],[379976.429,5461272.011],[379980.861,5461269.763],[379982.902,5461268.728],[379992.332,5461263.806],[380015.92,5461273.855],[380014.484,5461276.167],[380011.853,5461281.161],[380007.04,5461290.294],[379968.799,5461274.975]]]]},"properties":{"NAME":"2100","FLUR_NR":"12","FLZ":"2900","ID":""}}]}')},4776:e=>{"use strict";e.exports=JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","id":"","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::25832"}},"geometry":{"type":"MultiPolygon","coordinates":[[[[380002.249,5461307.434],[380004.074,5461303.551],[380006.515,5461298.832],[380010.263,5461291.585],[380113.465,5461332.924],[380162.139,5461353.667],[380141.649,5461354.072],[380119.484,5461354.509],[380002.249,5461307.434]]],[[[380124.446,5461356.501],[380147.12,5461356.28],[380167.795,5461356.078],[380203.331,5461371.222],[380203.984,5461370.015],[380267.354,5461399.905],[380266.866,5461400.968],[380262.821,5461409.782],[380259.339,5461417.367],[380259.397,5461418.548],[380196.182,5461385.306],[380124.446,5461356.501]]],[[[379945.294,5461264.461],[379949.282,5461268.439],[379953.418,5461271.967],[379956.76,5461274.359],[379959.831,5461275.975],[379962.201,5461276.547],[379964.396,5461276.259],[379968.799,5461274.975],[380007.04,5461290.294],[380003.254,5461297.481],[380002.519,5461298.876],[379999.113,5461306.175],[379939.097,5461282.076],[379944.336,5461267.185],[379944.825,5461265.793],[379945.294,5461264.461]]]]},"properties":{"NAME":"2100","FLUR_NR":"12","FLZ":"2901","ID":""}}]}')},1680:e=>{"use strict";e.exports=JSON.parse('{"type":"FeatureCollection","features":[{"type":"Feature","id":"","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::25832"}},"geometry":{"type":"Polygon","coordinates":[[[380186.259,5461403.009],[380196.182,5461385.306],[380259.397,5461418.548],[380259.092,5461435.55],[380186.259,5461403.009]]]},"properties":{"NAME":"2100","FLUR_NR":"12","FLZ":"2902","ID":"4"}}]}')}}]);