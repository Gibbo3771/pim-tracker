const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const Crime = require("./models/crime.js");

const crime = new Crime();

const publicPath = path.join(__dirname, "../client/public");
app.use(express.static(publicPath));
app.get("/", (req, res) => res.send());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.use("", (req, res) => {
  res.send();
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
