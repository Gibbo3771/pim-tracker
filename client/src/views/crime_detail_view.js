const Modal = require("./modal/modal_view");

const CrimeDetailView = function(crime) {
  this.crime = crime;
  this.modal = null;
};

CrimeDetailView.prototype.render = function() {
  const container = document.createElement("div");
  container.appendChild(this.createTextElement("I am text"));
  container.classList.add("crime-detail-view");
  this.modal = new Modal("0.6", container);
  this.modal.render().center();
};

CrimeDetailView.prototype.createTextElement = function(
  text,
  prefix = "",
  suffix = ""
) {
  const div = document.createElement("div");
  const e = document.createElement("p");
  div.appendChild(e);
  e.textContent = `${prefix} ${text} ${suffix}`;
  return e;
};

module.exports = CrimeDetailView;
