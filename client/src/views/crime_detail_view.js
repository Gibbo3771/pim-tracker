const Modal = require("./modal/modal_view");

const CrimeDetailView = function(crime) {
  this.crime = crime;
  this.modal = null;
};

CrimeDetailView.prototype.render = function() {
  const container = document.createElement("div");
  container.appendChild(
    this.createTextElement("Crime Detail", "crime-detail-view-detail")
  );
  //   container.appendChild(
  //     this.createTextElement(this.crime.category, "crime-detail-view-category")
  //   );
  //   container.appendChild(
  //     this.createTextElement(this.crime.streetName, "crime-detail-view-street")
  //   );
  //   container.appendChild(
  //     this.createTextElement(
  //       `${this.crime.lat},${this.crime.lng}`,
  //       "crime-detail-view-latlng"
  //     )
  //   );
  //   container.appendChild(
  //     this.createTextElement(
  //       this.crime.outcome.category,
  //       "crime-detail-view-outcome"
  //     )
  //   );
  //   container.appendChild(
  //     this.createTextElement(this.crime.outcome.date, "crime-detail-view-date")
  //   );
  container.classList.add("crime-detail-view");
  this.modal = new Modal("0.6", container);
  this.modal.render().center();
};

CrimeDetailView.prototype.createTextElement = function(
  text,
  klass = "",
  prefix = "",
  suffix = ""
) {
  const div = document.createElement("div");
  const e = document.createElement("p");
  div.appendChild(e);
  div.classList.add(klass);
  e.textContent = `${prefix} ${text} ${suffix}`;
  return div;
};

module.exports = CrimeDetailView;
