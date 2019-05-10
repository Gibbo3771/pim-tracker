const axios = require("axios");

const RequestHelper = function(url) {
  this.url = url;
};

RequestHelper.prototype.get = function() {
  return axios(this.url).then(response => response);
};

module.exports = RequestHelper;
