#! /bin/bash
echo "Start" 

./run-parallel.sh node mqtt_publisher.js json_size1_small.json
./run-parallel.sh node mqtt_publisher.js jsonld_size1_small.json

./run-parallel.sh node mqtt_publisher.js json_size2_medium.json
./run-parallel.sh node mqtt_publisher.js jsonld_size2_medium.json

./run-parallel.sh node mqtt_publisher.js json_size3_large.json
./run-parallel.sh node mqtt_publisher.js jsonld_size3_large.json


echo "Finish" 
