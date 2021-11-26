const express = require("express");
const schedule = require("node-schedule");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
const Gpio = require('pigpio').Gpio;
//Pin connected to yellow wire
const motor = new Gpio(17, {mode: Gpio.OUTPUT});

let increment = 500;
let pulsewidth = 500;

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => res.send(`Server running`));

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


// eslint-disable-next-line no-undef
feedNow = () => {
    setInterval(() => {

        motor.servoWrite(pulsewidth);

        pulsewidth += increment;
        if (pulsewidth >= 2500) {
            increment = -500;
        }
    }, 500);
}


app.get('/feed', (req, res) => {
    // eslint-disable-next-line no-undef
    feedNow();
    res.send('success')
});


app.post('/schedule', (req, res) => {
    let time = new Date(req.body.time)
    schedule.scheduleJob(time, function () {
        // eslint-disable-next-line no-undef
        feedNow();
    });
    res.send(`Servo will run at ${time}`);
});
