const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js");

const Crime = function(url) {
  this.url = url;
};

Crime.prototype.get = function() {
  const request = new RequestHelper(url);
  return request;
};

module.exports = Crime;
