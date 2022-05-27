"use strict";

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

const tasksArr = require("./tasksfile.json");

const readArgs = (args) => {
  if (args.s) {
    console.log("Список невиконаних завдань:");
    showTasks();
  } else if (args.showall) {
    console.log("Список всіх завдань:");
    tasksOutput(tasksArr);
  }
};

const showTasks = () => {
  let undoneTasks = [];
  for (let el of tasksArr) {
    if (el.taskDone === false) {
      undoneTasks.push(el);
    }
  }
  tasksOutput(undoneTasks);
};

const tasksOutput = (tasksArray) => {
  let counter = 1;
  let outputStr = "";
  for (let el of tasksArray) {
    outputStr += `\nЗавдання №${counter}
Назва: ${el.taskName}
`;
    if (el.taskDetails) {
      outputStr += `Опис: ${el.taskDetails}\n`;
    }
    if (el.taskDeadline) {
      outputStr += getDateString(el.taskDeadline);
    }
    if (el.taskDone) {
      outputStr += `Стан завдання: ✓\n`;
    } else {
      outputStr += `Стан завдання: ✗\n`;
    }
    counter++;
  }
  console.log(outputStr);
};

const getDateString = (dateStr) => {
  let date = new Date(dateStr);
  let res =
    "Дедлайн: " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  // check if date has hours
  if (
    Date.parse(date)
      .toString()
      .match(/[0-9]*000000/)
  ) {
    res += "\n";
  } else {
    res += " " + date.getHours() + ":" + date.getMinutes() + "\n";
  }
  return res;
};

readArgs(argv);
