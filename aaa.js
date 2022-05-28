"use string";

const taskTracker = require("./index.js");

process.env.TZ = 'UTC+3'

let time = new Date()
console.dir(new Date().getTimezoneOffset())

date = "2022-05-28";
console.dir(taskTracker.getDateString(date))