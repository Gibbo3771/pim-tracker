const Modal = function(width, height, opacity, content = null) {
  this.width = width;
  this.height = height;
  this.opacity = opacity;
  this.content = content;
};

Modal.prototype.render = function() {
  if (this.content === null) return;
  document.body.appendChild(this.createBackDrop());
};

Modal.prototype.createBackDrop = function() {
  const element = document.createElement("div");
  element.id = "modal-backdrop";
  element.style.width = "100vw";
  element.style.height = "100vh";
  element.style.background = "black";
  element.style.opacity = this.opacity;
  return element;
};

module.exports = Modal;
