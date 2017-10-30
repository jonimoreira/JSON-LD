- AWS cloud deployment:

chmod 400 ubuntu_tests_jsonld_brazil.pem

ssh -i "ubuntu_tests_jsonld_brazil.pem" ubuntu@ec2-18-231-90-234.sa-east-1.compute.amazonaws.com


chmod 400 ubuntu_tests_jsonld_singapore.pem

ssh -i "ubuntu_tests_jsonld_singapore.pem" ubuntu@ec2-54-169-88-193.ap-southeast-1.compute.amazonaws.com


chmod 400 ubuntu_tests_jsonld_australia.pem

ssh -i "ubuntu_tests_jsonld_australia.pem" ubuntu@ec2-52-62-26-73.ap-southeast-2.compute.amazonaws.com

ssh -i "ubuntu_tests_jsonld_01.pem" ubuntu@34.213.1.143

ssh -i "ubuntu_tests_jsonld_02.pem" ubuntu@ec2-52-57-205-247.eu-central-1.compute.amazonaws.com

chmod 400 ubuntu_tests_jsonld_01.pem

rsync -avz -e 'ssh' /home/joao/jsonld_performance_analysis ubuntu@34.213.1.143


34.213.1.143

- Scenario 01:

Provider: 8050/device/:id
34.213.1.143:8050/device/jsonld_size1_small.json

Consumer: 8060/consumer/:messagefile
34.213.1.143:8060/consumer/jsonld_size1_small.json

Consumer (processing): 8061/consumer/:messagefile
34.213.1.143:8061/consumer/jsonld_size1_small.json

Application: 8001/performance_analysis
34.213.1.143:8001/performance_analysis


curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source ~/.bashrc
nvm install 7
node --version

npm install express
npm install jsonld
npm install sync-request
npm install stats-lite
npm install json2csv


- Scenario 02:

MQTT: 
sudo apt-get install mosquitto mosquitto-clients
t1: mosquitto_sub -h localhost -t test
t2: mosquitto_pub -h localhost -t test -m "hello world"
topic: haulier/device/1

npm install mqtt


perl -e 'print "/path/to/process.php\n" x 100' | xargs -P 100 -I {} php {} 
chmod +x run-parallel.sh
./run-parallel.sh node mqtt_publisher.js







