expect = require("chai").expect;
const { calculateDates, sixMonths, twelveMonths } = require("./dater");

describe("Dater", function() {
  describe("calculateDates", function() {
    it("calculates 6 months back from current date, with no year overlap", function() {
      const dates = calculateDates(6, new Date("2019-10"));
      expect(dates.length).to.equal(6);
      expect(dates[0].getMonth() + 1).to.equal(9);
      expect(dates[1].getMonth() + 1).to.equal(8);
      expect(dates[2].getMonth() + 1).to.equal(7);
      expect(dates[3].getMonth() + 1).to.equal(6);
      expect(dates[4].getMonth() + 1).to.equal(5);
      expect(dates[5].getMonth() + 1).to.equal(4);
    });
    it("calculates 6 months back from current date, with year overlap", function() {
      const dates = calculateDates(6, new Date("2019-3"));
      expect(dates.length).to.equal(6);
      expect(dates[0].getMonth() + 1).to.equal(2);
      expect(dates[1].getMonth() + 1).to.equal(1);
      expect(dates[2].getMonth() + 1).to.equal(12);
      expect(dates[2].getFullYear()).to.equal(2018);
      expect(dates[3].getMonth() + 1).to.equal(11);
      expect(dates[4].getMonth() + 1).to.equal(10);
      expect(dates[5].getMonth() + 1).to.equal(9);
    });
  });
  describe("sixMonths", function() {
    it("calculates 6 months back using the shorthand function", function() {
      const dates = sixMonths(new Date("2019-10"));
      expect(dates.length).to.equal(6);
    });
  });
  describe("twelveMonths", function() {
    it("calculates 12 months back using the shorthand function", function() {
      const dates = twelveMonths(new Date("2019-10"));
      expect(dates.length).to.equal(12);
    });
  });
});
