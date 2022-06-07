"use strict";

const taskTracker = require("./index.js");

let data;

beforeAll(() => {
  data = taskTracker.getTasks();
})

afterAll(() => {
  taskTracker.updateBase(data);
})

beforeEach(() => {
  taskTracker.updateBase();
})

const task1 = {
  title: 'title1',
  description: 'description1',
  deadline: '2022-06-30T20:59:00.000Z',
  isDone: false,
  executionDate: null
}

const task2 = {
  title: 'title2',
  description: 'description2',
  deadline: '2022-06-29T20:59:00.000Z',
  isDone: false,
  executionDate: null
}

test("tasksOutput function test", () => {
  let tasksArr = [];
  expect(taskTracker.tasksOutput(tasksArr)).toBe("");
  tasksArr = [
    {
      title: "Task One",
      description: "just details",
      deadline: "2022-05-28",
      isDone: false,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe(
    "\n" +
      "Завдання №1\n" +
      "Назва: Task One\n" +
      "Опис: just details\n" +
      "Дедлайн: 28/5/2022\n" +
      "Стан завдання: ✗\n"
  );
  tasksArr = [
    {
      title: "Task One",
      deadline: "2022-05-28",
      isDone: false,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe(
    "\n" +
      "Завдання №1\n" +
      "Назва: Task One\n" +
      "Дедлайн: 28/5/2022\n" +
      "Стан завдання: ✗\n"
  );
  tasksArr = [
    {
      title: "Task One",
      description: "just details",
      isDone: false,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe(
    "\n" +
      "Завдання №1\n" +
      "Назва: Task One\n" +
      "Опис: just details\n" +
      "Стан завдання: ✗\n"
  );
  tasksArr = [
    {
      title: "Task One",
      description: "just details",
      deadline: "2022-05-28",
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe(
    "\n" +
      "Завдання №1\n" +
      "Назва: Task One\n" +
      "Опис: just details\n" +
      "Дедлайн: 28/5/2022\n" +
      "Стан завдання: ✗\n"
  );
  tasksArr = [
    {
      description: "just details",
      deadline: "2022-05-28",
      isDone: false,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe("");
  tasksArr = [
    {
      title: "Task One",
      description: "just details",
      deadline: "2022-05-28",
      isDone: false,
      executionDate: null,
    },
    {
      title: "Task Two",
      description: "just details",
      deadline: "2022-05-28T01:25:43+03:00",
      isDone: true,
      executionDate: "2022-05-27T05:25:43+03:00",
    },
    {
      title: "Task Three",
      description: "just details",
      deadline: "2022-05-26T18:25:43+03:00",
      isDone: false,
      executionDate: null,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe(
    "\n" +
      "Завдання №1\n" +
      "Назва: Task One\n" +
      "Опис: just details\n" +
      "Дедлайн: 28/5/2022\n" +
      "Стан завдання: ✗\n" +
      "\n" +
      "Завдання №2\n" +
      "Назва: Task Two\n" +
      "Опис: just details\n" +
      "Дедлайн: 28/5/2022 1:25\n" +
      "Стан завдання: ✓\n" +
      "Дата виконання: 27/5/2022 5:25\n" +
      "\n" +
      "Завдання №3\n" +
      "Назва: Task Three\n" +
      "Опис: just details\n" +
      "Дедлайн: 26/5/2022 18:25\n" +
      "Стан завдання: ✗\n"
  );
});

test("getDateString function test", () => {
  let date = "";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "2022-05-28";
  expect(taskTracker.getDateString(date)).toBe("28/5/2022\n");
  date = "2022-13-28";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "20220328";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "2022-05-28T012543+0300";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "2022-05-28T01:25:43+03:00";
  expect(taskTracker.getDateString(date)).toBe("28/5/2022 1:25\n");
  date = "2022-05-28T01:25:43";
  expect(taskTracker.getDateString(date)).toBe("28/5/2022 1:25\n");
  date = "2022-05-28T01:25:43+01:00";
  expect(taskTracker.getDateString(date)).toBe("28/5/2022 3:25\n");
});

describe('AddTask function', () => {
  test('must add a new task to the database', () => {
    taskTracker.addTask('title1', 'description1', '2022-06-30 23:59');

    expect(taskTracker.getTask(0)).toEqual(task1);
  })

  test('must add a new task to the database at the end', () => {
    taskTracker.addTask('title1', 'description1', '2022-06-30 23:59');
    taskTracker.addTask('title2', 'description2', '2022-06-29 23:59');
  
    expect(taskTracker.getTask(0)).toEqual(task1);
    expect(taskTracker.getTask(1)).toEqual(task2);
  })
})

describe('EditTask function', () => {
  beforeEach(() => {
    taskTracker.addTask('title1', 'description1', '2022-06-30 23:59');
  })

  test('should only change the title', () => {
    taskTracker.editTask(0, 'newTitle');
    const editTask1 = taskTracker.getTask(0);

    expect(editTask1.title).toBe('newTitle');
    expect(editTask1.description).toBe('description1');
    expect(taskTracker.getDateString(editTask1.deadline)).toBe('30/6/2022 23:59\n');
  })

  test('should change only the description', () => {
    taskTracker.editTask(0, null, 'newDescription');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('newDescription');
    expect(taskTracker.getDateString(editTask1.deadline)).toBe('30/6/2022 23:59\n');
  })

  test('should only change the deadline', () => {
    taskTracker.editTask(0, null, null, '2022-02-22 22:22');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('description1');
    expect(taskTracker.getDateString(editTask1.deadline)).toBe('22/2/2022 22:22\n');
  })

  test('must change the title, description and deadline', () => {
    taskTracker.editTask(0, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('newTitle');
    expect(editTask1.description).toBe('newDescription');
    expect(taskTracker.getDateString(editTask1.deadline)).toBe('22/2/2022 22:22\n');
  })  

  test('must change all task parameters for index', () => {
    taskTracker.addTask('title2', 'description2', '2022-06-29 23:59');
    taskTracker.editTask(1, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask2 = taskTracker.getTask(1);
  
    expect(editTask2.title).toBe('newTitle');
    expect(editTask2.description).toBe('newDescription');
    expect(taskTracker.getDateString(editTask2.deadline)).toBe('22/2/2022 22:22\n');
  })  

  test('should not change anything', () => {
    taskTracker.editTask(0);

    expect(taskTracker.getTask(0)).toEqual(task1);
  })

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.editTask(0, null, null, 'wrong format'))
    .toThrow('Wrong date format');

    expect(taskTracker.getTask(0)).toEqual(task1);
  })  

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.editTask(0, 'newTitle', 'newDescription', 'wrong format'))
    .toThrow('Wrong date format');
  
    expect(taskTracker.getTask(0)).toEqual(task1);
  })  
})

describe('MarkAsDone function', () => {
  beforeEach(() => {
    taskTracker.addTask('title1', 'description1', '2022-06-30 23:59');
    taskTracker.addTask('title2', 'description2', '2022-06-29 23:59');
  })

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.markAsDone(3))
    .toThrow('There is no such task');

    expect(taskTracker.getTask(0)).toEqual(task1);
  })  

  test('must change the isDone and executionDate fields', () => {
    taskTracker.markAsDone(0);
    taskTracker.markAsDone(1);
    const completedTask1 = taskTracker.getTask(0);
    const completedTask2 = taskTracker.getTask(1);

    expect(completedTask1.isDone).toBe(true);
    expect(completedTask2.isDone).toBe(true);
    expect(completedTask1.executionDate).not.toBe(null);
    expect(completedTask2.executionDate).not.toBe(null);
  })
})

describe('DeleteTask function', () => {
  beforeEach(() => {
    taskTracker.addTask('title1', 'description1', '2022-06-30 23:59');
    taskTracker.addTask('title2', 'description2', '2022-06-29 23:59');
  })

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.deleteTask(2))
    .toThrow('There is no such task');

    expect(taskTracker.getTask(0)).toEqual(task1);
    expect(taskTracker.getTask(1)).toEqual(task2);
  })

  test('should delete the task', () => {
    taskTracker.deleteTask(1);

    expect(() => taskTracker.getTask(1))
    .toThrow('There is no such task');
  })

  test('should delete tasks and move the following', () => {
    taskTracker.deleteTask(0);

    expect(taskTracker.getTask(0)).toEqual(task2);
    expect(() => taskTracker.getTask(1))
    .toThrow('There is no such task');
  })
})

describe('GetOverdueTasks function', () => {
  beforeEach(() => {
    taskTracker.addTask('title1', null, '2022-05-27 23:59');
    taskTracker.addTask('title2', 'description2', '2022-05-28 23:59');
    taskTracker.addTask('title3', null, '2222-05-27 23:59');
    taskTracker.addTask('title4', 'description4', '2222-05-28 23:59');
  })

  test('must return the string with overdue tasks', () => {
    console.log(taskTracker.getTasks());
    console.log(new Date('2022-05-28'));
    console.log(taskTracker.getOverdueTasks());
    expect(taskTracker.getOverdueTasks()).toEqual(
      "Список протермінованих завдань:\n\n" +
      "Завдання №1\n" +
      "Назва: title1\n" +
      "Дедлайн: 27/5/2022 23:59\n" +
      "Стан завдання: ✗\n" +
      "\n" +
      "Завдання №2\n" +
      "Назва: title2\n" +
      "Опис: description2\n" +
      "Дедлайн: 28/5/2022 23:59\n" +
      "Стан завдання: ✗\n"
    );
  })
})
