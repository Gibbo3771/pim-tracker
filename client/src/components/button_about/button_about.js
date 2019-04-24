const PubSub = require("../../helpers/pub_sub");

const ButtonAbout = function() {
  document
    .getElementById("button-about")
    .addEventListener("click", evt => this.onClick(evt));
};

ButtonAbout.prototype.onClick = function(evt) {
  PubSub.publish("ButtonAbout:click", evt);
};

module.exports = ButtonAbout;
