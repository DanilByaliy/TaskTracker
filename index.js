const fs = require('fs');

let tasksArr;

try {
  tasksArr = require('./tasksfile.json');
} catch {
  tasksArr = [];
}

function addTask(title, description, deadline) {
  const regexp = /^\d{4}-\d{2}-\d{2}( \d{2})?(:\d{2})?$/;
  if (!regexp.test(deadline)) {
    console.log('Wrong format');
    return;
  }
  const task = {
    title: title,
    description: description,
    deadline: deadline.replace(' ', 'T') + ':00',
    isDone: false
  }
  tasksArr.push(task);
  fs.writeFileSync('tasksfile.json', `${JSON.stringify(tasksArr)}`);
}

function editTask(id, title, description, deadline){
  const regexp = /^\d{4}-\d{2}-\d{2}( \d{2})?(:\d{2})?$/;
  
  title ? tasksArr[id].title = title : null;
  description ? tasksArr[id].description = description : null;
  if (deadline) {
    if (!regexp.test(deadline)) {
    console.log('Wrong format');
    return;
    }
    tasksArr[id].deadline = deadline.replace(' ', 'T') + ':00';
  }

  fs.writeFileSync('tasksfile.json', `${JSON.stringify(tasksArr)}`);
}
