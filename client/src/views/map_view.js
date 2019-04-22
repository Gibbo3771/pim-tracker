require("leaflet");
const PubSub = require("../helpers/pub_sub.js");

const MapView = function() {
  this.map = null;
  this.accessToken =
    "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA";
  this.currentBoundingBox = null;
  this.selectionRect = null;

  this.defaultLatlng = { lat: 51.504, lng: -0.127 };
  this.defaultOffset = {
    pointA: {
      lat: 0.005,
      lng: 0.01
    },
    pointB: {
      lat: 0.005,
      lng: 0.01
    }
  };
  this.currentOffset = this.defaultOffset;
  this.currentMarker = null;

  const { lat, lng } = this.defaultLatlng;
  this.map = L.map("map").setView([lat, lng], 13);
  this.createMarker(lat, lng);
  this.notify();
  this.zoom();
};

MapView.prototype.render = function() {
  this.createTileLayer();
};

MapView.prototype.renderSelectionRectangle = function(
  offset = this.currentOffset
) {
  if (this.selectionRect) this.selectionRect.remove();
  this.selectionRect = L.rectangle(
    this.createBoundingBox(offset.pointA, offset.pointB),
    {
      color: "#ff7800",
      weight: 5
    }
  ).addTo(this.map);
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

MapView.prototype.createMarker = function(lat, lng) {
  if (this.currentMarker) this.currentMarker.remove();
  this.currentMarker = L.marker([lat, lng]);
  this.currentMarker.addTo(this.map);
  this.renderSelectionRectangle();
};

MapView.prototype.notify = function() {
  PubSub.publish("MapView:area-modified", {
    latlng1: {
      lat: this.selectionRect._latlngs[0][0].lat.toFixed(3),
      lng: this.selectionRect._latlngs[0][0].lng.toFixed(3)
    },
    latlng2: {
      lat: this.selectionRect._latlngs[0][1].lat.toFixed(3),
      lng: this.selectionRect._latlngs[0][1].lng.toFixed(3)
    },
    latlng3: {
      lat: this.selectionRect._latlngs[0][2].lat.toFixed(3),
      lng: this.selectionRect._latlngs[0][2].lng.toFixed(3)
    },
    latlng4: {
      lat: this.selectionRect._latlngs[0][3].lat.toFixed(3),
      lng: this.selectionRect._latlngs[0][3].lng.toFixed(3)
    }
  });
};

MapView.prototype.handleMapClick = function(evt) {
  const { lat, lng } = evt.latlng;
  this.createMarker(lat, lng);
  this.notify();
  this.zoom();
};

MapView.prototype.createBoundingBox = function(pointA, pointB) {
  return [
    [
      this.currentMarker._latlng.lat - (pointA ? pointA.lat : 0),
      this.currentMarker._latlng.lng - (pointA ? pointA.lng : 0)
    ],
    [
      this.currentMarker._latlng.lat + (pointB ? pointB.lat : 0),
      this.currentMarker._latlng.lng + (pointB ? pointB.lng : 0)
    ]
  ];
};

MapView.prototype.zoom = function() {
  const { pointA, pointB } = this.currentOffset;
  this.map.fitBounds(this.createBoundingBox(pointA, pointB), {
    padding: [0.5, 0.5]
  });
};

MapView.prototype.bindEvents = function() {
  this.map.on("click", evt => this.handleMapClick(evt));
};

module.exports = MapView;
