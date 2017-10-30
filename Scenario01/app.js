var express = require('express');
var app = express();
var http = require('http');
var request = require('sync-request');
var perf_now = require('performance-now');
var stats = require("stats-lite");

var json2csv = require('json2csv');
var fs = require('fs');
var fields = ['size', 'processing', 'round', 'jsondelta', 'jsonlddelta']; 
var newLine = "\r\n";
var fileName = "results_scenario01_04.csv";

var consumersURL = "ec2-18-231-90-234.sa-east-1.compute.amazonaws.com";

fs.writeFile(fileName, "", function(err) {
	if (err) 
		return console.log(err);
	console.log(fileName + " created");
});

var countRounds = 100; 

function computeRequestResponse(message_file, port, deltas)
{
	var request_link = 'http://' + consumersURL + ':' + port + '/consumer/' + message_file;
	var perf_start = perf_now();
	var response = request('GET', request_link);
	var result = JSON.stringify(response.getBody());
	var perf_end = perf_now();
	var deltatime = (perf_end - perf_start).toFixed(2);
	deltas.push(deltatime);
	//console.log(request_link + "  >> " + deltatime);

}

function saveCSV(counter, deltatime_json, deltatime_jsonld)
{
	var dataresult = [{'size':1, 'processing':false, "round":counter, 'jsondelta':deltatime_json, 'jsonlddelta':deltatime_jsonld}];
	var csv = json2csv({ data: dataresult, fields: fields, hasCSVColumnTitle: false }) + newLine;
	fs.appendFile(fileName, csv, function(err) {
		if (err) throw err;
	});
}	


app.get('/performance_analysis', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

for(var a=0;a<5;a++)
{
	console.log(" ");

	var deltas_json = [];
	var deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 1, Processing: false
		computeRequestResponse("json_size1_small.json", 8060, deltas_json);
		
	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 1, Processing: false
		computeRequestResponse("jsonld_size1_small.json", 8060, deltas_jsonld);
		
	}
	
	console.log("------ Scenario 1: size 1 (small), whithout processing ------");

	var deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	var deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------
	deltas_json = [];
	deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 1, Processing: true
		computeRequestResponse("jsonld_size1_small.json", 8061, deltas_jsonld);

	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 1, Processing: true
		computeRequestResponse("json_size1_small.json", 8061, deltas_json);

	}
	
	console.log(" " );
	console.log("------ Scenario 1: size 1 (small), whith processing ------");

	deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------
	deltas_json = [];
	deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 2, Processing: false
		computeRequestResponse("jsonld_size2_medium.json", 8060, deltas_jsonld);
	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 2, Processing: false
		computeRequestResponse("json_size2_medium.json", 8060, deltas_json);
	}
	
	console.log(" " );
	console.log("------ Scenario 1: size 2 (medium), whithout processing ------");

	deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------
	deltas_json = [];
	deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 2, Processing: true
		computeRequestResponse("jsonld_size2_medium.json", 8061, deltas_jsonld);
	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 2, Processing: true
		computeRequestResponse("json_size2_medium.json", 8061, deltas_json);
	}
	
	console.log(" " );
	console.log("------ Scenario 1: size 2 (medium), whith processing ------");

	deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------
	deltas_json = [];
	deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 3, Processing: false
		computeRequestResponse("jsonld_size3_large.json", 8060, deltas_jsonld);
	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 3, Processing: false
		computeRequestResponse("json_size3_large.json", 8060, deltas_json);
	}
	
	console.log(" " );
	console.log("------ Scenario 1: size 3 (large), whithout processing ------");

	deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------
	deltas_json = [];
	deltas_jsonld = [];

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON,  Size: 3, Processing: true
		computeRequestResponse("jsonld_size3_large.json", 8061, deltas_jsonld);
	}

	for (var counter=0; counter<countRounds; counter++)
	{
		// Message: JSON-LD,  Size: 3, Processing: true
		computeRequestResponse("json_size3_large.json", 8061, deltas_json);
	}
	
	console.log(" " );
	console.log("------ Scenario 1: size 3 (large), whith processing ------");

	deltas_json_clean = [];
	deltas_json.forEach(function(value){
		if (value <= stats.mean(deltas_json) + stats.stdev(deltas_json))
			deltas_json_clean.push(value);
	});
	deltas_jsonld_clean = [];
	deltas_jsonld.forEach(function(value){
		if (value <= stats.mean(deltas_jsonld) + stats.stdev(deltas_jsonld))
			deltas_jsonld_clean.push(value);
	});
	console.log("Mean JSON: " + stats.mean(deltas_json_clean) + " ms");
	console.log("Mean JSON-LD: " + stats.mean(deltas_jsonld_clean) + " ms");
	console.log("Result: JSON is " + ((1 - stats.mean(deltas_json_clean)/stats.mean(deltas_jsonld_clean))*10).toFixed(2) + "% faster than JSON-LD");

//--------------------------------------

}

	console.log(" " );
	console.log("------ Finished, check file: " + fileName);
	//res.end(result);

})


var server = app.listen(8001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Performance analysis at http://%s:%s", host, port)

})


 


