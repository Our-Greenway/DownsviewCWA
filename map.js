const map = L.map('map').setView([43.8094086, -79.2696282], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

const files = [
  "BoakesGrove.geojson",
  "DogsviewPark.geojson",
  "Hummingbird.geojson",
  "LakeLookout.geojson",
  "NorthFarm.geojson",
  "NorthHill.geojson",
  "Orchard.geojson",
  "OtherPond.geojson",
  "Playground.geojson",
  "SesquicentennialMonument.geojson",
  "SouthHill.geojson",
  "SwanLake.geojson",
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
        layer.on('click', function (e) {
          const popupContent = `<strong>${feature.properties.name}</strong>`;
          layer.bindPopup(popupContent).openPopup(e.latlng);
        });
      },
      style: {
        color: "#3388ff",
        fillOpacity: 0.5
      }
    }).addTo(map);
  });
});
