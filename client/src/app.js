const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
require("leaflet");

const getData = evt => {
  const rq = new RequestHelper(
    "https://data.police.uk/api/crimes-street/all-crime"
  );

  rq.getCrimeInRectangle(evt.detail)
    .then(res => {
      PubSub.publish("App:top-10-crime", res.splice(0, 10));
      PubSub.publish("App:number-of-crime", res.length);
    })
    .catch(res => {
      PubSub.publish("App:data-overload");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  PubSub.subscribe("MapView:area-modified", getData);

  const map = new MapView();
  map.render();
  map.bindEvents();

  const listView = new CrimeListView();
  listView.bindEvents();
});
