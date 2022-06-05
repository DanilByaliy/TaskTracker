"use string";

const taskTracker = require("./index.js");

process.env.TZ = 'UTC+3'

taskArr = [{"title":"Task One","description":"just details","deadline":"2022-05-28","isDone":false,"executionDate":null},{"title":"Task Two","description":"just details","deadline":"2022-05-28T01:25:43+03:00","isDone":true,"executionDate":"2022-05-27T05:25:43+03:00"},{"title":"Task Three","description":"just details","deadline":"2022-05-26T18:25:43+03:00","isDone":false,"executionDate":null}]

let time = new Date()
//console.dir(new Date().getTimezoneOffset())

date = "2022-05-28";
//console.dir(taskTracker.getDateString(date))

//console.log(time)

taskTracker.editTask(1, 'newTitle', 'newDescription', 'wrong format')