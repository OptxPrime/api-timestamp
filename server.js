// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

var days = ["Sun", "Mon", "Tue", "Wed", "Thu",
  "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov", "Dec"];


app.get("/api", function (req, res) {
  var un = Date.now();
  var datum = new Date();
  //ut = datum.getDay();
  var dayInWeek = datum.getDay();
  dayInWeek = days[dayInWeek];
  var dayInMonth = datum.getDate();
  var month = datum.getMonth();
  month = months[month];
  var year = 2021;
  var hours = datum.getHours();
  var minutes = datum.getMinutes();
  var seconds = datum.getSeconds();
  var ut = dayInWeek + ', ' + dayInMonth + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' GMT';
  //var ut = 'proba'
  res.json({ "unix": un, "utc": ut });
});


//console.log(formattedTime);

app.get("/api/:date?", function (req, res) {

  var ut = '';
  var datum;
  if (isNaN(Number(req.params.date))) /// ako se unese string
    datum = new Date(req.params.date);
  else /// ako se unese timestamp
    datum = new Date(Number(req.params.date));

  if (isNaN(datum)) {
    res.json({ "error": "Invalid Date" });
  }

  var dayInWeek = datum.getDay();
  dayInWeek = days[dayInWeek];

  var dayInMonth = datum.getDate();
  var month = datum.getMonth();
  month = months[month];
  var year = datum.getFullYear();
  var hours = datum.getHours();
  hours = ((hours < 10) ? '0' : '') + String(hours);
  var minutes = datum.getMinutes();
  minutes = ((minutes < 10) ? '0' : '') + String(minutes);
  var seconds = datum.getSeconds();
  seconds = ((seconds < 10) ? '0' : '') + String(seconds);
  ut = dayInWeek + ', ' + dayInMonth + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' GMT';
  res.json({ "unix": datum.getTime(), "utc": datum.toUTCString() });

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
