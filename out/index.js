"use strict";
const schedule = require('node-schedule');
schedule.scheduleJob('* * * * * *', function (fireDate) {
    console.log(new Date().toTimeString());
});
