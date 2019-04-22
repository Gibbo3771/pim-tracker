const MapView = require("./views/map_view.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
require("leaflet");

const getData = evt => {
  const rq = new RequestHelper(
    "https://data.police.uk/api/crimes-street/all-crime"
  );

  const { latlng1, latlng2, latlng3, latlng4 } = evt.detail;
  console.log("stuff", latlng1, latlng2);
  rq.getCrimeInRectangle(
    latlng1.lat,
    latlng1.lng,
    latlng2.lat,
    latlng2.lng,
    latlng3.lat,
    latlng3.lng,
    latlng4.lat,
    latlng4.lng
  );
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const map = new MapView();
  map.render();
  map.bindEvents();

  PubSub.subscribe("MapView:area-modified", getData);
});
