// Create a new modal with the given max width, height and current opacity.
// The content type must be a div node
const Modal = function(
  opacity,
  content = null,
  defaultBackdropOnClick = true,
  onOpen = null,
  onBackdropClick = null,
  onClose = null
) {
  this.backdrop = null;
  this.container = null;
  this.opacity = opacity;
  this.content = content;
  this.defaultBackdropOnClick = defaultBackdropOnClick;

  // Callbacks
  this.onOpen = onOpen;
  this.onBackdropClick = onBackdropClick;
  this.onClose = onClose;
};

// Renders the modal, but only if content has been set
Modal.prototype.render = function() {
  if (this.content === null) return; // Never render if content is not set
  document.body.appendChild(this.createBackDrop());
  this.backdrop.appendChild(this.create());
  if (this.onOpen) this.onOpen();
  return this;
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
  this.backdrop.addEventListener("click", evt => this.backdropClicked(evt));
  return this.backdrop;
};

Modal.prototype.create = function() {
  this.container = document.createElement("div");
  this.container.id = "modal";
  this.container.style.position = "absolute";
  this.container.style.zIndex = "1000";
  this.container.style.width = "auto";
  this.container.style.height = "auto";
  this.container.appendChild(this.content);
  return this.container;
};

// This is called whenever the backdrop is clicked
Modal.prototype.backdropClicked = function(evt) {
  if (evt.target !== this.backdrop) return;
  evt.preventDefault();
  evt.stopPropagation();
  if (this.onBackdropClick) this.onBackdropClick();
  if (this.defaultBackdropOnClick) this.close();
};

// Called to remove the modal from the tree
Modal.prototype.close = function() {
  document.getElementById("modal-backdrop").remove();
  if (this.onClose) this.onClose();
};

Modal.prototype.center = function(offsetX, offsetY) {
  this.container.style.top = "50%";
  this.container.style.right = "50%";
  this.container.style.transform = "translate(50%, -50%)";
  this.container.style.transform =
    "translate(" + offsetX + "px, " + offsetY + "px)";
  return this;
};

module.exports = Modal;
