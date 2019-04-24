const PubSub = require("./../../helpers/pub_sub");

const DropdownDate = function() {
  this.dates = [];
  this.element = document.getElementById("dropdown-date");
  this.element.addEventListener("change", evt => this.onChange(evt));
};

DropdownDate.prototype.onChange = function() {
  PubSub.publish("Dropdown-date:change", evt);
};

DropdownDate.prototype.update = function(dates) {
  this.clear();
  this.dates = dates;
  this.addOptions();
};

DropdownDate.prototype.addOptions = function() {
  for (let date of this.dates) {
    const e = document.createElement("select");
    e.value = date;
    this.element.appendChild(e);
  }
};

DropdownDate.prototype.clear = function() {
  this.element.innerHTML = "";
};

module.exports = DropdownDate;
