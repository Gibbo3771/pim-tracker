const PubSub = require("./helpers/pub_sub");
const RequestHelper = require("./helpers/request_helper");
const CrimeDetailView = require("./views/crime_detail_view");
const { calculateDates } = require("./helpers/dater/dater");
const AboutView = require("./views/about_view.js");

const AppContainer = function() {
  this.selectedArea = null;
  this.currentMonth = new Date();
};

AppContainer.prototype.getCrimeInRectangle = function() {
  const rq = new RequestHelper();
  rq.getCrimeInRectangle(this.selectedArea, this.currentMonth)
    .then(res => {
      if (!res || res.length === 0) {
        this.currentMonth = calculateDates(1, this.currentMonth)[0];
        this.currentMonth = new Date(
          `${this.currentMonth.getFullYear()}-${this.currentMonth.getMonth() +
            1}`
        );
        this.getCrimeInRectangle();
      }
      res.sort(function(x, y) {
        return x.id - y.id;
      });
      res.reverse();
      PubSub.publish("App:top-10-crime", res.splice(0, 10));
      PubSub.publish("App:number-of-crime", res.length);
      PubSub.publish("App:all-crime", res);
    })
    .catch(err => {
      PubSub.publish("App:data-overload"); // not used anywhere at the moment
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
  this.currentMonth = new Date(evt.detail.value);
  this.getCrimeInRectangle(new Date(evt.detail.value));
};

AppContainer.prototype.handleCrimeDetailModalOpen = function(evt) {
  const crimeA = evt.detail;
  const rq = new RequestHelper();
  rq.getCrimeOverMonths(this.selectedArea, calculateDates(13)).then(res => {
    PubSub.publish(
      "App:monthly-data-stream",
      res.map(crimes => {
        return crimes.filter(crimeB => crimeA.category === crimeB.category);
      })
    );
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
