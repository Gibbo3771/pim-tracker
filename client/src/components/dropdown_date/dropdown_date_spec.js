const jsdom = require("mocha-jsdom");
const expect = require("chai").expect;
const sinon = require("sinon");
const DropdownDate = require("./dropdown_date");

describe("DropdownDate", function() {
  jsdom({
    url: "http://localhost"
  });
  before(function() {
    this.element = document.createElement("select");
    document.body.appendChild(this.element);
    this.element.id = "dropdown-date";
    this.dropdown = new DropdownDate();
  });
  describe("Date content", function() {
    it("should contain no dates on creation", function() {
      expect(this.dropdown.dates.length).to.equal(0);
    });
    it("should set the dates and call clear", function() {
      const spy = sinon.spy(this.dropdown, "clear");
      const dates = ["2019-02", "2019-03", "2019-04"];
      this.dropdown.update(dates);
      expect(spy.callCount).to.equal(1);
      expect(this.dropdown.dates.length).to.equal(3);
    });
  });
  describe("Adding options", function() {
    it("should add the option elements for the dates", function() {
      const spy = sinon.spy(this.dropdown, "addOptions");
      const datesNew = ["2018-02", "2018-03", "2018-04"];
      this.dropdown.update(datesNew);
      expect(spy.callCount).to.equal(1);
      expect(this.element.childNodes.length).to.equal(3);
      expect(this.element.childNodes[0].nodeName).to.equal("SELECT");
    });
  });
  describe("Event handling", function() {
    it("should fire onChange when changed", function() {
      const spy = sinon.spy(this.dropdown, "onChange");
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", false, false);
      this.element.dispatchEvent(event);
      expect(spy.callCount).to.equal(1);
    });
  });
});
