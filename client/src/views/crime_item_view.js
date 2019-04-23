const PubSub = require("../helpers/pub_sub");

const CrimeItemView = function(item) {
  this.item = item;
};

CrimeItemView.prototype.render = function() {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("itemContainer");
  itemContainer.addEventListener("click", evt => this.onClick(evt));

  const categoryType = this.createCategory();
  itemContainer.appendChild(categoryType);

  const streetName = this.createStreet();
  itemContainer.appendChild(streetName);

  const date = this.createDate();
  itemContainer.appendChild(date);
  document.querySelector("#information").appendChild(itemContainer);
};

CrimeItemView.prototype.createCategory = function() {
  const categoryType = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = this.item.category;
  categoryType.classList.add("categoryType");
  categoryType.appendChild(p);
  return categoryType;
};

CrimeItemView.prototype.createStreet = function() {
  const streetName = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = this.item.streetName;
  streetName.classList.add("streetName");
  streetName.appendChild(p);
  return streetName;
};

CrimeItemView.prototype.createDate = function() {
  const date = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = this.item.date;
  date.classList.add("date");
  date.appendChild(p);
  return date;
};

CrimeItemView.prototype.onClick = function(evt) {
  PubSub.publish("CrimeItemView:crime-item-clicked", this.item);
};

module.exports = CrimeItemView;
