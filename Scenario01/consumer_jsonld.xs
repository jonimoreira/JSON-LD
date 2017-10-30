var express = require('express');
var app = express();
var http = require('http');
var jsonld = require('jsonld');

console.log("-------------------------- START ----------------------------");
var counter = 0;

var asyncCalls = 100; //1000;
var providerURL = "ec2-52-62-26-73.ap-southeast-2.compute.amazonaws.com";

function getJSON(options,cb){
    http.request(options,function(res){
    var body ='';
    res.on('data', function(chunk){
        body+=chunk;
    });
 
    res.on('end',function(){
        var data = JSON.parse(body);
        cb(null, data);
    })
    res.on('error', cb);
 
    })
    .on('error',cb)
    .end();
 
}

function processData(device, message_file) {
	var label_value = (message_file.indexOf("jsonld") == -1) ? "value" : "@value";
	if (device.makesMeasurement[0].hasValue > 0) { 
		console.log("[" + device.label[label_value] + "] Processing (true): " + device.makesMeasurement[0].hasValue);
	}
	else {
		console.log("[" + device.label[label_value] + "] Processing (false): " + device.makesMeasurement[0].hasValue);
	}
	
}

app.get('/consumer/:messagefile', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	//console.log("-------------------------- execution #" + ++counter + " ----------------------------");
	var message_file = req.params.messagefile;

	var options = {
	    host:providerURL,
	    port:8050,
	    path:'/device/' + message_file,
	    method: 'GET'
	};

	
	for(var i = 0; i < asyncCalls; i++) {
		
		getJSON(options, function(err,data){
		    if (err){
			return console.log('error data', err);
		    }else {
		
			processData(data, message_file);

			var result = JSON.stringify(data);
		
			res.end(result);

		    }
		 
		});

	}

})


var server = app.listen(8061, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Scenario 1: consumer with processing listening at http://%s:%s", host, port)

})


 


