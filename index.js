"use strict";

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

let tasksArr;

//
try {
  tasksArr = require("./tasksfile.json");
} catch {
  tasksArr = [];
}

const readArgs = (args) => {
  if (args.s) {
    showTasks();
  } else if (args.showall) {
    if (tasksArr[0]) {
      console.log("Список всіх завдань:");
      console.log(tasksOutput(tasksArr));
    } else {
      console.log("Завдань немає");
    }
  }
};

const showTasks = () => {
  let undoneTasks = [];
  for (let el of tasksArr) {
    if (el.taskDone === false) {
      undoneTasks.push(el);
    }
  }
  if (undoneTasks[0]) {
    console.log("Список невиконаних завдань:");
    console.log(tasksOutput(undoneTasks));
  } else {
    console.log("Завдань немає");
  }
};

const tasksOutput = (tasksArray) => {
  let counter = 1;
  let outputStr = "";
  for (let el of tasksArray) {
    if (el.taskName) {
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
  }
  return outputStr;
};

const getDateString = (dateStr) => {
  if (dateStr === "") throw new Error('Invalid Date');
  let date = new Date(dateStr);
  if(date === "Invalid Date" || isNaN(date)) {
    throw new Error('Invalid Date')
}
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
      .match(/[0-9]*00000/)
  ) {
    res += "\n";
  } else {
    res += " " + date.getHours() + ":" + date.getMinutes() + "\n";
  }
  return res;
};

readArgs(argv);

module.exports = {
  tasksOutput,
  getDateString,
};
