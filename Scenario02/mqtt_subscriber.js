var mqtt = require('mqtt')
var connMqtt = 'mqtt://localhost';
var client  = mqtt.connect(connMqtt)
var topic = 'haulier/device/1';
var perf_now = require('performance-now');

var counter = 0;
var perf_start = perf_now();
var numPublishers = 5;
var numMessages = 100;

var deltas = [];
 
client.on('connect', function () {
  client.subscribe(topic)
  console.log("Scenario 2: subscriber listening at " + connMqtt + " topic: " + topic);
})
 
client.on('message', function (topic, message) {
  if (counter == 0) 
  {
	deltas = [];
	perf_start = perf_now();
  }	

  counter++;

  //console.log(counter); // + ': ' + message.toString())

  if (counter == numPublishers * numMessages)
  {
	var perf_end = perf_now();
	var deltatime = (perf_end - perf_start).toFixed(2);
	deltas.push(deltatime);
	console.log("Deltatime: " + deltatime);
	counter = 0;
  }



})
