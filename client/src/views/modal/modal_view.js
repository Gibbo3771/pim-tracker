const Modal = function(width, height, opacity, content = null) {
  this.backdrop = null;
  this.container = null;
  this.width = width;
  this.height = height;
  this.opacity = opacity;
  this.content = content;
};

Modal.prototype.render = function() {
  if (this.content === null) return; // Never render if content is not set
  document.body.appendChild(this.createBackDrop());
  this.backdrop.appendChild(this.create());
};

Modal.prototype.createBackDrop = function() {
  this.backdrop = document.createElement("div");
  this.backdrop.id = "modal-backdrop";
  this.backdrop.style.position = "fixed";
  this.backdrop.style.top = "0";
  this.backdrop.style.width = "100vw";
  this.backdrop.style.height = "100vh";
  this.backdrop.style.zIndex = "999";
  this.backdrop.style.background = "rgba(0, 0, 0," + this.opacity + ")";
  this.backdrop.addEventListener("click", evt => this.close(evt));
  return this.backdrop;
};

Modal.prototype.create = function() {
  this.container = document.createElement("div");
  this.container.id = "modal";
  this.container.style.position = "relative";
  this.container.style.zIndex = "1000";
  this.container.style.width = this.width;
  this.container.style.height = this.height;
  this.container.appendChild(this.content);
  return this.container;
};

Modal.prototype.close = function(evt) {
  if (evt.target !== this.backdrop) return;
  evt.preventDefault();
  evt.stopPropagation();
  document.getElementById("modal-backdrop").remove();
};

module.exports = Modal;
