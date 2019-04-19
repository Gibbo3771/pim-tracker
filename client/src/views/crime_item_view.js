const PubSub = require("../helpers/pub_sub.js");

const CrimeItemView = function(item) {
  this.item = item;
};

CrimeItemView.prototype.render = function() {
  const container = document.createElement("div");
  container.classList.add("");
};

CrimeItemView.prototype.createCategory = function() {
  let categoryType = document.createElement("div");
  categoryType.textContent = this.item.title;
  categoryType.classList.add("categoryType");
  return categoryType;
};

module.exports = CrimeItemView;
