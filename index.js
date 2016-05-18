  var express = require('express')
var moment = require('moment')
var fs = require('fs')
var path = require('path')

var app = express()

port = process.env.PORT || 8000;

app.get('/:url', function(req, res) {
  var parsed;
  var input = req.params.url;
  console.log("Input: " + input)
  if(/^\d{10}$/.test(input)) {
    console.log("We have a Unix date");
    parsed = moment(input, "X")
  } else {
    console.log("We have a natural date");
    parsed = moment(input, "MMMM D, YYYY")
  }
  if(parsed.isValid()) {
    console.log("Parsed as valid");
    console.log("Unix: " + parsed.format("X") + " Natural: " + parsed.format("MMMM D, YYYY"));
    res.json({
      unix: parsed.format("X"),
      natural: parsed.format("MMMM D, YYYY")
    });
  } else {
    console.log("responding with nulls");
    res.json({
      unix: null,
      natural: null
    })
  }

})


app.get('/', function(req, res) {
  var file = path.join(__dirname, 'index.html');
  res.sendFile(file, function(err) {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', file)
    }
  })
})

app.listen(port, function() {
  console.log("Listening on port: " + port);
})
