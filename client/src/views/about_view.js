const Modal = require("./modal/modal_view");

const AboutView = function() {
  this.modal = null;
};

AboutView.prototype.render = function() {
  const container = document.createElement("div");
  container.appendChild(
    this.createPersonView(
      "matt",
      "Mateusz Stanczak",
      "https://github.com/MattyMcClare"
    )
  );
  container.appendChild(
    this.createPersonView(
      "pim",
      "Pim Sritawan",
      "https://github.com/sierratango34"
    )
  );
  container.appendChild(
    this.createPersonView(
      "master_of_disaster",
      "Stephen Gibson",
      "https://github.com/Gibbo3771"
    )
  );
  // container.appendChild(this.createPersonView("master_of_disaster"));

  this.modal = new Modal("0.6", container);
  container.classList.add("about-view");
  this.modal.render().center();
  console.log(this.modal);
};

AboutView.prototype.createPersonView = function(person, name, link) {
  const a = document.createElement("a");
  const div = document.createElement("div");
  const sign_img = document.createElement("img");
  const person_img = document.createElement("img");
  const person_name = document.createElement("h2");
  person_img.src = "css/images/collaborators/" + person + "/avatar.jpg";
  sign_img.src = "css/images/collaborators/" + person + "/sign.png";
  person_name.textContent = name;
  a.setAttribute("href", link);
  div.appendChild(person_img);
  div.appendChild(person_name);
  div.appendChild(sign_img);
  a.appendChild(div);

  return a;
};

module.exports = AboutView;
