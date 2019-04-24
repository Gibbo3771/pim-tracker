const jsdom = require("mocha-jsdom");
const expect = require("chai").expect;
const sinon = require("sinon");
const ButtonAbout = require("./button_about");

describe("ButtonAbout", function() {
  jsdom({
    url: "http://localhost"
  });
  before(function() {
    this.element = document.body.appendChild(document.createElement("button"));
    this.element.id = "about";
    this.button = new ButtonAbout();
  });
  it("should fire onClick when clicked", function() {
    const spy = sinon.spy(this.button, "onClick");
    document.getElementById("about").click();
    expect(spy.callCount).to.equal(1);
  });
});
