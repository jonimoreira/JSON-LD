var mqtt = require('mqtt')
var connMqtt = 'mqtt://localhost';
var client  = mqtt.connect(connMqtt)
var topic = 'haulier/device/1';
var numMessages = 100;

var messagefile = "jsonld_size1_small.json";
process.argv.forEach(function (val, index, array) {
  messagefile = val;
});

 
client.on('connect', function () {
  
   var message_path = "../Messages/" + messagefile; 
   var device = require(message_path);

   console.log('Start publishing to ' + connMqtt + " file: " +  messagefile);

   for (var i=0; i<numMessages; i++)
   {
     client.publish(topic, JSON.stringify(device));

   }

   console.log(numMessages + ' messages sent by publisher');

})
 



