const Modal = function(width, height, opacity, content = null) {
  this.container = null;
  this.width = width;
  this.height = height;
  this.opacity = opacity;
  this.content = content;
};

Modal.prototype.render = function() {
  if (this.content === null) return; // Never render if content is not set
  document.body.appendChild(this.createBackDrop());
  document.body.appendChild(this.create());
};

Modal.prototype.createBackDrop = function() {
  const element = document.createElement("div");
  element.id = "modal-backdrop";
  element.style.width = "100vw";
  element.style.height = "100vh";
  element.style.background = "black";
  element.style.opacity = this.opacity;
  element.addEventListener("click", this.close);
  return element;
};

Modal.prototype.create = function() {
  this.container = document.createElement("div");
  this.container.id = "modal";
  this.container.style.width = this.width;
  this.container.style.height = this.height;
  this.container.appendChild(this.content);
  return this.container;
};

Modal.prototype.close = function(evt) {
  evt.preventDefault();
  document.getElementById("modal-backdrop").remove();
};

module.exports = Modal;
