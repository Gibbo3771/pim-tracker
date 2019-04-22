const MapView = require("./views/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
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
  ).then(res => {
    PubSub.publish("App:top-10-crime", res.splice(0, 10));
    PubSub.publish("App:number-of-crime", res.length);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const map = new MapView();
  map.render();
  map.bindEvents();

  const listView = new CrimeListView();
  listView.bindEvents();
  PubSub.subscribe("MapView:area-modified", getData);
});
