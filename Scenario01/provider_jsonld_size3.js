var express = require('express');
var app = express();
var message_path = "../Messages/jsonld_size3_large.json";
var device = require(message_path);

app.get('/device/:id', function (req, res) {
   res.setHeader('Content-Type', 'application/json');
   res.end( JSON.stringify(device));
})

var server = app.listen(8053, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Scenario 1: provider listening at http://%s:%s", host, port)
})
