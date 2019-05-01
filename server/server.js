const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
require("dotenv").config();
const Request = require("./api/request");
const url = require("url");
const queryString = require("querystring");

const request = new Request();

const publicPath = path.join(__dirname, "../client/public");
app.use(express.static(publicPath));
app.get("/", (req, res) => res.send());

app.get("/api/police/", function(req, res) {
  let parsedUrl = url.parse(req.url);
  parsedUrl = queryString.parse(parsedUrl.query);
  res.send(request.getCrimeInRectangle(parsedUrl));
});

app.listen(port, function() {
  console.log(`Listening on port ${this.address().port}`);
});
