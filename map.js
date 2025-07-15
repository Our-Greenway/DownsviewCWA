
const map = L.map('map').setView([43.7416, -79.4804406], 16);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

const files = [
  "BoakesGrove.geojson",
  "DogsviewPark.geojson",
  "Hummingbird.geojson",
  "LakeLookout.geojson",
  "NorthFarm.geojson",
  "NorthPlaza.geojson",
  "Orchard.geojson",
  "LowerPond.geojson",
  "Playground.geojson",
  "SesquicentennialMonument.geojson",
  "MiniMound.geojson",
  "SwanLake.geojson",
  "Mound.geojson",
  "UrbanFarm.geojson"];

const polygons = {
  type: "FeatureCollection",
  features: []
};

Promise.all(
  files.map(file =>
    fetch(`/geojson/${file}`).then(res => res.json())
  )
).then(dataArray => {
  dataArray.forEach(data => {
    polygons.features.push(...data.features);

    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const { id, heroImage, description } = feature.properties;
        const popupContent = `
        <div class="p-2 text-sm max-w-[600px]">
          <div class="w-[350px] h-[150px] overflow-hidden rounded-t-lg">
            <img src="${heroImage}" alt="${id}"
                class="w-full h-full object-cover" />
          </div>
          <div class="w-[350px] bg-[#538a53] text-white p-2 rounded-b-lg">
            <h2>${id}</h2>
          </div>
          <div class="max-w-[350px]">
            <p>${description}</p>
          </div>
        </div>
        `;
        layer.bindPopup(popupContent, { maxWidth: 600 });
        layer.bindTooltip(id, {
          permanent: true,
          direction: "center",
          className: "polygon-label",
          offset: [0, 0]
        }).openTooltip();

        
      },
      style: {
        color: "#3388ff",
        fillOpacity: 0.2
      }
    }).addTo(map);
  });
});