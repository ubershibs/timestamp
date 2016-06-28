var express = require('express')
var fs = require('fs')
var path = require('path')
var getTimeStamps = require('./timestampsHandler');

var app = express();

port = process.env.PORT || 8000;

app.get('/:url', function(req, res) {
    var input = req.params.url;
    res.json(getTimeStamps(input));
});

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

var server = app.listen(port, function() {
  console.log("Listening on port: " + port);
})

module.exports = server;
