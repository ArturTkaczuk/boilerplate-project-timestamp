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
  const date = new Date();
  const dateAsString = date.toString();

  const unixDate = Math.floor(date.getTime() / 1000);

  res.json({ unix: unixDate, utc: dateAsString });
});

app.get("/api/:date", (req, res) => {
  const apiCallParam = req.params.date;

  const numberRegex = /^-?\d+$/g;
  const dateRegex = /^\d+-\d+-\d+$/g;

  const invalidDateResponse = () => {
    res.json({ error: "Invalid date" });
    res.end();
  };

  const dateResponse = (unix, date) => {
    res.json({ unix, utc: date });
    res.end();
  };

  //Serve unix format /api/<number>
  if (numberRegex.test(apiCallParam)) {
    const unix = Number(apiCallParam);
    const date = new Date(Number(apiCallParam)).toString();

    if (date === "Invalid Date") {
      invalidDateResponse();
    } else {
      dateResponse(unix, date);
    }
  }

  //Serve date format /api/<year>-<month>-<day>
  else if (dateRegex.test(apiCallParam)) {
    const date = new Date(apiCallParam);
    const dateAsString = date.toString();
    const unix = date.getTime() / 1000;

    if (dateAsString === "Invalid Date") {
      invalidDateResponse();
    } else {
      dateResponse(unix, dateAsString);
    }
  } else {
    invalidDateResponse();
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
