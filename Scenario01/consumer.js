var express = require('express');
var app = express();
var http = require('http');

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
				
			res.end(JSON.stringify(data));

		    }
		 
		});

	}

})


var server = app.listen(8060, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Scenario 1: consumer listening at http://%s:%s", host, port)

})


 


