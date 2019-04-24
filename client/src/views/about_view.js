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
  const imgDiv = document.createElement("div");
  const signImg = document.createElement("img");
  const personImg = document.createElement("img");
  const personName = document.createElement("h2");
  personImg.src = "css/images/collaborators/" + person + "/avatar.jpg";
  signImg.src = "css/images/collaborators/" + person + "/sign.png";
  personName.textContent = name;
  a.setAttribute("href", link);
  div.appendChild(personImg);
  div.appendChild(personName);
  div.appendChild(signImg);
  a.appendChild(div);

  return a;
};

module.exports = AboutView;
