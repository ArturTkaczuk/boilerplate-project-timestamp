require("dotenv").config();
// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const dateToday = new Date().toString();

  res.json({ date: dateToday });
});

app.get("/api/:date", (req, res) => {
  const apiCallParam = req.params.date;

  const numbersOnlyRegex = /^\d+$/;

  if (numbersOnlyRegex.test(apiCallParam)) {
    const unix = Number(apiCallParam);
    const unixDate = new Date(Number(apiCallParam)).toString();

    if (unixDate === "Invalid Date") {
      res.json({ date: unixDate });
      res.end();
    }

    res.json({ unix: unix, date: unixDate });
    res.end();
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
