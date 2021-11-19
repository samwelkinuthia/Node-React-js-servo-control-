const express = require("express");
const schedule = require("node-schedule");
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
const Gpio = require('pigpio').Gpio;
const motor = new Gpio(17, {mode: Gpio.OUTPUT});

let increment = 500;
let pulsewidth = 500;

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.send(`Server running`));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/feed', (req, res) => {
    feedNow();
    res.send('success')
});

feedNow = () => {
    setInterval(() => {

        motor.servoWrite(pulsewidth);

        pulsewidth += increment;
        if (pulsewidth >= 2500) {
            increment = -500;
        }
    }, 500);
}

app.post('/schedule', (req, res) => {
    let time = new Date(req.body.time)
    schedule.scheduleJob(time, function () {
        feedNow();
    });
    res.send(`Servo will run at ${time}`);
});