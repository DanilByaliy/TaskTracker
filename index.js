'use strict';

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const tasksArr = require('./tasksfile.json')

const readArgs = (args) => {
    if(args.s){
        console.log('1')
    }

    console.dir(args)

}

const showTasks = () => {
    let undoneTasks = [];
    for(let el of tasksArr){
        if(el.taskDone === false){
            undoneTasks.push(el)
        }
    }
    tasksOutput(undoneTasks)
}

const tasksOutput = (tasksArray) => {
    let counter = 1;
    let outputStr = ''
    for(let el of tasksArray){
        outputStr += `\nЗавдання №${counter}
Назва: ${el.taskName}
`
if(el.taskDetails){
    outputStr += `Опис: ${el.taskDetails}\n`
}
if(el.taskDeadline){
    outputStr += `Дедлайн: ${el.taskDeadline}\n`
}
if(el.taskDone){
    outputStr += `Стан завдання: ✓\n`
}else{
    outputStr += `Стан завдання: ✗\n`
}
counter++;
    }
    console.log(outputStr)
} 

showTasks()

//readArgs(argv)