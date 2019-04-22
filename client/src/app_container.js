const RequestHelper = require("./helpers/request_helper.js");

const AppContainer = function() {};

AppContainer.prototype.getData = function(evt) {
  const rq = new RequestHelper(
    "https://data.police.uk/api/crimes-street/all-crime"
  );
  const { latlng1, latlng2, latlng3, latlng4 } = evt.detail;
  rq.getCrimeInRectangle(
    latlng1.lat,
    latlng1.lng,
    latlng2.lat,
    latlng2.lng,
    latlng3.lat,
    latlng3.lng,
    latlng4.lat,
    latlng4.lng
  )
    .then(res => {
      PubSub.publish("App:top-10-crime", res.splice(0, 10));
      PubSub.publish("App:number-of-crime", res.length);
    })
    .catch(res => {
      PubSub.publish("App:data-overload");
    });
};

AppContainer.prototype.bindEvents = function() {
  PubSub.subscribe("MapView:area-modified", evt => {
    this.getData();
  });
};

module.exports = AppContainer;
