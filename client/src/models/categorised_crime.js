const PubSub = require("../helpers/pub_sub.js");
const Crime = require("../models/crime.js");
const RequestHelper = require("../helpers/request_helper.js");

const CategorisedCrime = function() {
  this.totalCrimes = 0;
  this.allCrimes = {
    antiSoc: {
      name: "Anti-Social Behaviour",
      pct: 0,
      crimes: []
    },
    bicycleTheft: {
      name: "Bike Thefts",
      pct: 0,
      crimes: []
    },
    burglary: {
      name: "Burglary",
      pct: 0,
      crimes: []
    },
    criminalDamageArson: {
      name: "Arson",
      pct: 0,
      crimes: []
    },
    drugs: {
      name: "Drugs",
      pct: 0,
      crimes: []
    },
    otherTheft: {
      name: "Other Theft",
      pct: 0,
      crimes: []
    },
    weapons: {
      name: "Possession of Weapons",
      pct: 0,
      crimes: []
    },
    publicOrder: {
      name: "Public Order",
      pct: 0,
      crimes: []
    },
    robbery: {
      name: "Robbery",
      pct: 0,
      crimes: []
    },
    shoplifting: {
      name: "Shoplifting",
      pct: 0,
      crimes: []
    },
    theftFromPerson: {
      name: "Theft From The Person",
      pct: 0,
      crimes: []
    },
    vehicleCrime: {
      name: "Vehicle Crime",
      pct: 0,
      crimes: []
    },
    violentCrime: {
      name: "Violent Crime",
      pct: 0,
      crimes: []
    },
    otherCrime: {
      name: "Other Crime",
      pct: 0,
      crimes: []
    }
  };
};

CategorisedCrime.prototype.chartifyData = function() {
  const data = [];
  for (let key in this.allCrimes) {
    const i = [];
    i.push(this.allCrimes[key].name);
    i.push(this.allCrimes[key].pct);
    data.push(i);
  }
  return data;
};

CategorisedCrime.prototype.getPercentageOf = function(array) {
  for (let key in this.allCrimes) {
    const category = this.allCrimes[key];
    const arrayLength = category.crimes.length;
    category.pct = (arrayLength / this.totalCrimes) * 100;
  }
};

CategorisedCrime.prototype.setPercentages = function() {
  const array = this.getPercentageOf();
  console.log(array);
};

CategorisedCrime.prototype.bindEvents = function() {
  PubSub.subscribe("App:all-crime", evt => {
    this.filterByCategory(evt);
    this.getPercentageOf();
    PubSub.publish("CategorisedCrime:refined-crime-data", this.chartifyData());
  });
  PubSub.subscribe("App:number-of-crime", evt => {
    this.totalCrimes = evt.detail;
  });
};

CategorisedCrime.prototype.filterByCategory = function(res) {
  for (let crimeData of res.detail) {
    switch (crimeData.category) {
      case "anti-social-behaviour":
        this.allCrimes.antiSoc.crimes.push(new Crime(crimeData));
        break;
      case "bicycle-theft":
        this.allCrimes.bicycleTheft.crimes.push(new Crime(crimeData));
        break;
      case "burglary":
        this.allCrimes.burglary.crimes.push(new Crime(crimeData));
        break;
      case "criminal-damage-arson":
        this.allCrimes.criminalDamageArson.crimes.push(new Crime(crimeData));
        break;
      case "drugs":
        this.allCrimes.drugs.crimes.push(new Crime(crimeData));
        break;
      case "other-theft":
        this.allCrimes.otherTheft.crimes.push(new Crime(crimeData));
        break;
      case "possession-of-weapons":
        this.allCrimes.weapons.crimes.push(new Crime(crimeData));
        break;
      case "public-order":
        this.allCrimes.publicOrder.crimes.push(new Crime(crimeData));
        break;
      case "robbery":
        this.allCrimes.robbery.crimes.push(new Crime(crimeData));
        break;
      case "shoplifting":
        this.allCrimes.shoplifting.crimes.push(new Crime(crimeData));
        break;
      case "theft-from-the-person":
        this.allCrimes.theftFromPerson.crimes.push(new Crime(crimeData));
        break;
      case "vehicle-crime":
        this.allCrimes.vehicleCrime.crimes.push(new Crime(crimeData));
        break;
      case "violent-crime":
        this.allCrimes.violentCrime.crimes.push(new Crime(crimeData));
        break;
      case "other-crime":
        this.allCrimes.otherCrime.crimes.push(new Crime(crimeData));
        break;
    }
  }
};

CategorisedCrime.prototype.clear = function() {
  Object.keys(this).forEach(prop => {
    this[prop] = [];
  });
};

CategorisedCrime.prototype.totalCrime = function() {
  let acc = 0;
  Object.keys(this).forEach(prop => {
    acc += this[prop].length;
  });
  return acc;
};

module.exports = CategorisedCrime;
