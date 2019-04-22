require("leaflet");
const PubSub = require("../helpers/pub_sub.js");

const MapView = function() {
  this.map = null;
  this.accessToken =
    "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA";
  this.currentBoundingBox = null;

  this.defaultLatlng = { lat: 51.505, lng: -0.09 };
  this.currentMarker = null;
  this.leftMarker = null;
  this.rightMarker = null;

  const { lat, lng } = this.defaultLatlng;
  this.map = L.map("map").setView([lat, lng], 13);
  this.createMarkers();
  this.zoom();
};

MapView.prototype.render = function() {
  this.createTileLayer();
  this.renderSelectionRectangle();
};

MapView.prototype.renderSelectionRectangle = function() {
  if (this.selectionRect) this.selectionRect.remove();
  this.selectionRect = L.rectangle(this.createBoundingBox(), {
    color: "#ff7800",
    weight: 0.5
  }).addTo(this.map);
};

MapView.prototype.createTileLayer = function() {
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: this.accessToken
    }
  ).addTo(this.map);
};

MapView.prototype.createMarkers = function() {
  const { lat, lng } = this.defaultLatlng;
  this.leftMarker = L.marker([lat - 0.01, lng - 0.01], { draggable: true });
  this.rightMarker = L.marker([lat + 0.01, lng + 0.01], { draggable: true });
  this.leftMarker.addTo(this.map);
  this.rightMarker.addTo(this.map);
};

MapView.prototype.createMarker = function(lat, lng) {
  if (this.currentMarker) this.currentMarker.remove();
  this.currentMarker = L.marker([lat, lng]);
  this.currentMarker.addTo(this.map);
};

MapView.prototype.handleMarkerDrag = function() {
  this.renderSelectionRectangle();
};

MapView.prototype.handleMarkerDragEnd = function() {
  this.zoom();
};

MapView.prototype.handleMapClick = function(evt) {
  const { lat, lng } = evt.latlng;
  this.createMarker(lat, lng);
};

MapView.prototype.createBoundingBox = function() {
  return [
    [this.leftMarker._latlng.lat, this.leftMarker._latlng.lng],
    [this.rightMarker._latlng.lat, this.rightMarker._latlng.lng]
  ];
};

MapView.prototype.zoom = function() {
  this.map.fitBounds(this.createBoundingBox(), { padding: [0.5, 0.5] });
};

MapView.prototype.bindEvents = function() {
  this.map.on("click", evt => this.handleMapClick(evt));
  this.rightMarker.on("drag", evt => this.handleMarkerDrag(evt));
  this.leftMarker.on("drag", evt => this.handleMarkerDrag(evt));
  this.leftMarker.on("dragend ", evt => this.handleMarkerDragEnd(evt));
  this.rightMarker.on("dragend ", evt => this.handleMarkerDragEnd(evt));
};

module.exports = MapView;
