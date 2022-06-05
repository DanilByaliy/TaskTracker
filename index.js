"use strict";

const fs = require("fs");
let tasksArr = getTasks();

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

function getTask(index) {
  if (!tasksArr[index]) throw new Error("There is no such task");
  return tasksArr[index];
}

function getTasks() {
  let tasks;
  try {
    tasks = require("./tasksfile.json");
  } catch {
    tasks = [];
  }
  return tasks;
}

function updateBase(data) {
  data ? null : (tasksArr = []);
  fs.writeFileSync("tasksfile.json", `${JSON.stringify(data)}`);
}

function checkFormat(deadline) {
  const regexp = /^\d{4}-\d{2}-\d{2}( \d{2})?(:\d{2})?$/;

  if (!regexp.test(deadline)) {
    throw new Error("Wrong date format");
    // return false;
  }
  return true;
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
  } else if (args.a) {
    addTask(args.title, args.desc, args.deadline);
    console.log("Завдання додано успішно");
  } else if (args.e) {
    editTask(args.index - 1, args.title, args.desc, args.deadline);
    console.log("Завдання змінено успішно");
  }
};

const showTasks = () => {
  let undoneTasks = [];
  for (let el of tasksArr) {
    if (el.isDone === false) {
      undoneTasks.push(el);
    }
  }
  if (undoneTasks[0]) {
    undoneTasks.sort(function (a, b) {
      if (b.deadline === null) return -1;
      if (a.deadline === null) return 1;
      return new Date(a.deadline) - new Date(b.deadline);
    });
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
    if (el.title) {
      outputStr += `\nЗавдання №${counter}
Назва: ${el.title}
`;
      if (el.description) {
        outputStr += `Опис: ${el.description}\n`;
      }
      if (el.deadline) {
        outputStr += `Дедлайн: ${getDateString(el.deadline)}`;
      }
      if (el.isDone) {
        outputStr += `Стан завдання: ✓\n`;
        outputStr += `Дата виконання: ${getDateString(el.executionDate)}`;
      } else {
        outputStr += `Стан завдання: ✗\n`;
      }
      counter++;
    }
  }
  return outputStr;
};

const getDateString = (dateStr) => {
  if (dateStr === "") throw new Error("Invalid Date");
  let date = new Date(dateStr);
  if (date === "Invalid Date" || isNaN(date)) {
    throw new Error("Invalid Date");
  }
  let res =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

function addTask(title, description, deadline) {
  if (typeof title !== "string" || title.length < 1) {
    throw new Error("Wrong title");
  }
  if (!description || typeof description !== "string") description = null;
  const task = {
    title: title,
    description: description,
    deadline: null,
    isDone: false,
    executionDate: null,
  };
  if (!deadline || !checkFormat(deadline)) {
    deadline = null;
  } else {
    task.deadline = deadline.replace(" ", "T") + ":00";
  }
  tasksArr.push(task);
  updateBase(tasksArr);
}

function editTask(index, title, description, deadline) {
  if (!tasksArr[index]) throw new Error("There is no such task");
  if (deadline) {
    if (!checkFormat(deadline)) return;
    tasksArr[index].deadline = deadline.replace(" ", "T") + ":00";
  }
  if (typeof title === "string" && title.length > 0) {
    tasksArr[index].title = title;
  }
  if (typeof description === "string" && description.length > 1) {
    tasksArr[index].description = description;
  }

  updateBase(tasksArr);
}

readArgs(argv);

module.exports = {
  tasksOutput,
  getDateString,
  addTask, 
  editTask, 
  getTask, 
  getTasks, 
  updateBase,
  markAsDone,
  deleteTask
};
