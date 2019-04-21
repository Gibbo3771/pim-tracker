require("leaflet");
const PubSub = require("../helpers/pub_sub.js");

const MapView = function() {
  this.map = null;
  this.accessToken =
    "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA";
  this.lat = 0;
  this.lng = 0;
  this.currentMarker = null;
  this.currentBoundingBox = null;

  this.defaultLatlng = { lat: 51.505, lng: -0.09 };
  this.leftMarker = null;
  this.rightMarker = null;

  this.firstLat = 0;
  this.secondLat = 0;
  this.firstLng = 0;
  this.secondLng = 0;
  this.map = L.map("map").setView(
    [this.defaultLatlng.lat, this.defaultLatlng.lng],
    13
  );
};

MapView.prototype.render = function() {
  this.createTileLayer();
};

MapView.prototype.createTileLayer = function() {
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: this.accessToken,
      dragging: false
    }
  ).addTo(this.map);
};

MapView.prototype.createMarker = function(lat, lng) {
  this.leftMarker = L.marker([lat - 0.01, lng - 0.01], { draggable: true });
  this.rightMarker = L.marker([lat + 0.01, lng + 0.01], { draggable: true });
  this.leftMarker.addTo(this.map);
  this.rightMarker.addTo(this.map);
};

MapView.prototype.handleClickEvent = function(event) {
  this.lat = event.latlng.lat;
  this.lng = event.latlng.lng;
  this.createMarker(this.lat, this.lng);
  this.createBoundingBox(this.lat, this.lng, this.lat, this.lng);
};

MapView.prototype.handleLeftMarkerDrag = function(evt) {
  this.firstLat = evt.latlng.lat;
  this.firstLng = evt.latlng.lng;
  console.log(this.evt);
  this.createBoundingBox(
    this.firstLat,
    this.firstLng,
    this.secondLat,
    this.secondLng
  );
};

MapView.prototype.handleRightMarkerDrag = function(evt) {
  this.secondLat = evt.latlng.lat;
  this.secondLng = evt.latlng.lng;
  this.createBoundingBox(
    this.firstLat,
    this.firstLng,
    this.secondLat,
    this.secondLng
  );
};

MapView.prototype.handleDragEnd = function() {
  this.map.fitBounds([
    [this.firstLat, this.firstLng],
    [this.secondLat, this.secondLng]
  ]);
};

MapView.prototype.bindEvents = function() {
  this.map.on("click", evt => this.handleClickEvent(evt));
  this.createMarker(51.505, -0.09);
  this.rightMarker.on("drag", evt => this.handleLeftMarkerDrag(evt));
  this.leftMarker.on("drag", evt => this.handleRightMarkerDrag(evt));
  // this.leftMarker.on("dragend ", evt => this.handleDragEnd(evt));
};

MapView.prototype.createBoundingBox = function(lat1, lng1, lat2, lng2) {
  if (this.currentBoundingBox) this.currentBoundingBox.remove();
  const bounds = [[lat1, lng1], [lat2, lng2]];
  this.currentBoundingBox = L.rectangle(bounds, {
    color: "#ff7800",
    weight: 0.5
  }).addTo(this.map);
};

module.exports = MapView;
