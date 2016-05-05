var express = require('express')
var moment = require('moment')
var fs = require('fs')
var path = require('path')

var app = express()

port = process.env.PORT || 8000;

app.get('/:url', function(req, res) {
  var input = req.params.url;

  if(/^\d{8}$/.test(input)) {
    var parsed = moment(input, "X")
  } else {
    var parsed = moment(input, "MMMM D, YYYY")
  }
  if(parsed.isValid()) {
    res.json({
      unix: parsed.format("X"),
      natural: parsed.format("MMMM D, YYYY")
    });
  } else {
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
