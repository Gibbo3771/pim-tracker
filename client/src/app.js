const MapView = require("./views/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const createChart = require("./views/high_chart.js");
require("leaflet");

const getData = evt => {
  const rq = new RequestHelper();

  const { latlng1, latlng2, latlng3, latlng4 } = evt.detail;
  rq.getCrimeInRectangle(
    latlng1.lat,
    latlng1.lng,
    latlng2.lat,
    latlng2.lng,
    latlng3.lat,
    latlng3.lng,
    latlng4.lat,
    latlng4.lng,
    new Date("2019-02")
  )
    .then(res => {
      PubSub.publish("App:top-10-crime", res.splice(0, 10));
      PubSub.publish("App:number-of-crime", res.length);
      // console.log("this is res", res);
      // Pubsub.publish("App:total-number-of-crime-array", res);
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

  createChart();
});
