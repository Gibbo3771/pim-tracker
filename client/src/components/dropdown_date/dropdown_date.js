const PubSub = require("./../../helpers/pub_sub");
const { sixMonths } = require("./../../helpers/dater/dater.js");

const DropdownDate = function() {
  this.dates = [];
  this.element = document.getElementById("dropdown-date");
  this.element.addEventListener("change", evt => this.onChange(evt));
};

DropdownDate.prototype.onChange = function(evt) {
  PubSub.publish("Dropdown-date:change", evt.target);
};

DropdownDate.prototype.update = function(dates) {
  this.clear();
  this.dates = dates;
  this.addOptions();
};

DropdownDate.prototype.addOptions = function() {
  for (let date of this.dates) {
    const e = document.createElement("option");
    e.innerText = date;
    this.element.appendChild(e);
  }
};

DropdownDate.prototype.clear = function() {
  this.element.innerHTML = "";
};

module.exports = DropdownDate;
