const PubSub = require("./helpers/pub_sub");
const RequestHelper = require("./helpers/request_helper");
const CrimeDetailView = require("./views/crime_detail_view");

const AppContainer = function() {};

AppContainer.prototype.getCrimeInRectangle = function(evt) {
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

AppContainer.prototype.handleCrimeItemClicked = function(evt) {
  const crimeItem = evt.detail;
  new CrimeDetailView(crimeItem).render();
};

AppContainer.prototype.bindEvents = function() {
  PubSub.subscribe("MapView:area-modified", evt =>
    this.getCrimeInRectangle(evt)
  );
  PubSub.subscribe("CrimeItemView:crime-item-clicked", evt =>
    this.handleCrimeItemClicked(evt)
  );
};

module.exports = AppContainer;
