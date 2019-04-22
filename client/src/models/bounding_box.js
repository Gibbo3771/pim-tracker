const MapView = require("../views/map_view.js");

const BoundingBox = function(selectionRect) {
  latlng1 = {
    lat: selectionRect._latlngs[0][0].lat.toFixed(3),
    lng: selectionRect._latlngs[0][0].lng.toFixed(3)
  };
  latlng2 = {
    lat: selectionRect._latlngs[0][1].lat.toFixed(3),
    lng: selectionRect._latlngs[0][1].lng.toFixed(3)
  };
  latlng3 = {
    lat: selectionRect._latlngs[0][2].lat.toFixed(3),
    lng: selectionRect._latlngs[0][2].lng.toFixed(3)
  };
  latlng4 = {
    lat: selectionRect._latlngs[0][3].lat.toFixed(3),
    lng: selectionRect._latlngs[0][3].lng.toFixed(3)
  };
};

module.exports = BoundingBox;
