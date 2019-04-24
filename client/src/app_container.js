const PubSub = require("./helpers/pub_sub");
const RequestHelper = require("./helpers/request_helper");
const CrimeDetailView = require("./views/crime_detail_view");
const { calculateDates } = require("./helpers/dater/dater");
const AboutView = require("./views/about_view.js");

const AppContainer = function() {
  this.selectedArea = null;
};

AppContainer.prototype.getCrimeInRectangle = function(date = new Date()) {
  const rq = new RequestHelper();
  console.log("im asd treoihrakjsdb", this.selectedArea);
  rq.getCrimeInRectangle(this.selectedArea, date)
    .then(res => {
      PubSub.publish("App:top-10-crime", res.splice(0, 10));
      PubSub.publish("App:number-of-crime", res.length);
      PubSub.publish("App:all-crime", res);
    })
    .catch(res => {
      PubSub.publish("App:data-overload");
    });
};

AppContainer.prototype.handleCrimeItemClicked = function(evt) {
  const crimeItem = evt.detail;
  const crimeDetail = new CrimeDetailView(crimeItem);
  crimeDetail.render();
};

AppContainer.prototype.handleAboutButtonClick = function(evt) {
  new AboutView().render();
};

AppContainer.prototype.handleOptionOnChange = function(evt) {
  this.getCrimeInRectangle(new Date(evt.detail.value));
};

AppContainer.prototype.handleCrimeDetailModalOpen = function(evt) {
  const crime = evt.detail;
  const rq = new RequestHelper();
  rq.getCrimeOverMonths(
    this.selectedArea,
    crime.category,
    calculateDates(7)
  ).then(res => {
    PubSub.publish("App:monthly-data-stream", res);
  });
};

AppContainer.prototype.bindEvents = function() {
  PubSub.subscribe("MapView:area-modified", evt => {
    this.selectedArea = evt.detail;
    this.getCrimeInRectangle();
  });
  PubSub.subscribe("CrimeItemView:crime-item-clicked", evt =>
    this.handleCrimeItemClicked(evt)
  );
  PubSub.subscribe("ButtonAbout:click", evt =>
    this.handleAboutButtonClick(evt)
  );
  PubSub.subscribe("Dropdown-date:change", evt => {
    this.handleOptionOnChange(evt);
  });
  PubSub.subscribe("CrimeDetailView:modal-open", evt => {
    this.handleCrimeDetailModalOpen(evt);
  });
};

module.exports = AppContainer;
