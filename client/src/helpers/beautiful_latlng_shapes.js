const Rectangle = function(rect, roundTo = 3) {
  this.latlng1 = {
    lat: rect._latlngs[0][0].lat.toFixed(roundTo),
    lng: rect._latlngs[0][0].lng.toFixed(roundTo)
  };
  this.latlng2 = {
    lat: rect._latlngs[0][1].lat.toFixed(roundTo),
    lng: rect._latlngs[0][1].lng.toFixed(roundTo)
  };
  this.latlng3 = {
    lat: rect._latlngs[0][2].lat.toFixed(roundTo),
    lng: rect._latlngs[0][2].lng.toFixed(roundTo)
  };
  this.latlng4 = {
    lat: rect._latlngs[0][3].lat.toFixed(roundTo),
    lng: rect._latlngs[0][3].lng.toFixed(roundTo)
  };
};

module.exports = Rectangle;
