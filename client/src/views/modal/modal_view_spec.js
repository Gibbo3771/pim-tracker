const jsdom = require("mocha-jsdom");
const expect = require("chai").expect;
const Modal = require("./modal_view");

describe("Modal", function() {
  jsdom({
    url: "http://localhost"
  });

  before(function() {
    this.modal = new Modal("150px", "150px", "0.9");
  });

  it("adds a fullscreen backdrop", function() {
    const backdrop = document.getElementById("modal-backdrop");
  });
});
