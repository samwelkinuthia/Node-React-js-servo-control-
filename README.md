# Servo Control

Controlling servomotor with [Create React App](https://github.com/facebook/create-react-app) and Node Js.

## Prerequisites
* Raspberry pi
* Node Js
* pigpio C library

# Running

Open a terminal on your machine and do the following:

* Clone this repository
* Run ```npm install``` in project root
* Move the server folder to your raspberry pi.
  * On the raspberry Pi
    * Install pigpio by running ```sudo apt-get install pigpio```
    * Ensure node js is installed
    * Navigate into the server folder and run ```npm install```
    * Run ```npm start``` to start the backend server at https://localhost:5000
    * This code works with the yellow servomotor wire connected to pin 17. Edit server.js to in case you want to use a different pin.
* Navigate back to the project root and run ```npm start``` to start the frontend server at https://localhost:3000.
* Edit Rotate.js and replace ```your_raspberry_pi_address``` wih your actual pi address.

# Servomotor connection

<img src="https://raw.githubusercontent.com/fivdi/pigpio/master/example/servo.png">

# Other

Check out [Node Schedule](https://github.com/node-schedule/node-schedule) for cron-like scheduling.


