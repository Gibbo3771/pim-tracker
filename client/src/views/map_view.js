require("leaflet");

const MapView = function() {};

MapView.prototype.render = function() {
  const mymap = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA"
    }
  ).addTo(mymap);
};

module.exports = MapView;
