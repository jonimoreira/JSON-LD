var express = require('express');
var app = express();

app.get('/device/:id', function (req, res) {
   res.setHeader('Content-Type', 'application/json');

   var message_path = "../Messages/" + req.params.id;// "../Messages/jsonld_size1_small.json";
   var device = require(message_path);

   res.end( JSON.stringify(device));
})

var server = app.listen(8050, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Scenario 1: provider listening at http://%s:%s", host, port)
})
