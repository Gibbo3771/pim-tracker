const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const publicPath = path.join(__dirname, "../client/public");
app.use(express.static(publicPath));
app.get("/", (req, res) => res.send());

app.listen(port, function() {
  console.log(`Listening on port ${this.address().port}`);
});
