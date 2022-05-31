const fs = require('fs');

let tasksArr = getTasks();

function getTask(id) {
  return tasksArr[id];
}

function getTasks() {
  let tasks;
  try {
    tasks = require('./tasksfile.json');
  } catch {
    tasks = [];
  }
  return tasks;
}

function updateBase(data) {
  data ? null : tasksArr = [];
  fs.writeFileSync('tasksfile.json', `${JSON.stringify(data)}`);
}

function checkFormat(deadline) {
  const regexp = /^\d{4}-\d{2}-\d{2}( \d{2})?(:\d{2})?$/;

  if (!regexp.test(deadline)) {
    console.log('Wrong format');
    return false;
  }
  return true;
}

function addTask(title, description, deadline) {
  if (!checkFormat(deadline)) return;

  const task = {
    title: title,
    description: description,
    deadline: deadline.replace(' ', 'T') + ':00',
    isDone: false
  }
  tasksArr.push(task);
  updateBase(tasksArr);
}

function editTask(id, title, description, deadline){  
  if (deadline) {
    if (!checkAndChangeFormat(deadline)) return;
    tasksArr[id].deadline = deadline.replace(' ', 'T') + ':00';
  }

  title ? tasksArr[id].title = title : null;
  description ? tasksArr[id].description = description : null;

  updateBase(tasksArr);
}

module.exports = { addTask, editTask, getTask, getTasks, updateBase }
