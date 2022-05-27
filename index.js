const fs = require('fs');

let tasksArr;

try {
  tasksArr = require('./tasksfile.json');
} catch {
  tasksArr = [];
}

function addTask(title, description, deadline) {
  const regexp = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexp.test(deadline)) {
    console.log('Wrong format');
    return;
  }
  const task = {
    title: title,
    description: description,
    deadline: deadline,
    isDone: false
  }
  tasksArr.push(task);
  fs.writeFileSync('tasksfile.json', `${JSON.stringify(tasksArr)}`);
}
