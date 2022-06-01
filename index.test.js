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
  deadline: '2022-06-30T23:59:00',
  isDone: false
}

const task2 = {
  title: 'title2',
  description: 'description2',
  deadline: '2022-06-29T23:59:00',
  isDone: false
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
    },
    {
      title: "Task Two",
      description: "just details",
      deadline: "2022-05-28T01:25:43+03:00",
      isDone: true,
    },
    {
      title: "Task Three",
      description: "just details",
      deadline: "2022-05-26T18:25:43+03:00",
      isDone: false,
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
  expect(taskTracker.getDateString(date)).toBe("Дедлайн: 28/5/2022\n");
  date = "2022-13-28";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "20220328";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "2022-05-28T012543+0300";
  expect(() => taskTracker.getDateString(date)).toThrow(Error);
  date = "2022-05-28T01:25:43+03:00";
  expect(taskTracker.getDateString(date)).toBe("Дедлайн: 28/5/2022 1:25\n");
  date = "2022-05-28T01:25:43";
  expect(taskTracker.getDateString(date)).toBe("Дедлайн: 28/5/2022 1:25\n");
  date = "2022-05-28T01:25:43+01:00";
  expect(taskTracker.getDateString(date)).toBe("Дедлайн: 28/5/2022 3:25\n");
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
    expect(editTask1.deadline).toBe('2022-06-30T23:59:00');
  })

  test('should change only the description', () => {
    taskTracker.editTask(0, null, 'newDescription');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('newDescription');
    expect(editTask1.deadline).toBe('2022-06-30T23:59:00');
  })

  test('should only change the deadline', () => {
    taskTracker.editTask(0, null, null, '2022-02-22 22:22');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('description1');
    expect(editTask1.deadline).toBe('2022-02-22T22:22:00');
  })

  test('must change the title, description and deadline', () => {
    taskTracker.editTask(0, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask1 = taskTracker.getTask(0);
  
    expect(editTask1.title).toBe('newTitle');
    expect(editTask1.description).toBe('newDescription');
    expect(editTask1.deadline).toBe('2022-02-22T22:22:00');
  })  

  test('must change all task parameters for id', () => {
    taskTracker.addTask('title2', 'description2', '2022-06-29 23:59');
    taskTracker.editTask(1, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask2 = taskTracker.getTask(1);
  
    expect(editTask2.title).toBe('newTitle');
    expect(editTask2.description).toBe('newDescription');
    expect(editTask2.deadline).toBe('2022-02-22T22:22:00');
  })  

  test('should not change anything', () => {
    taskTracker.editTask(0);

    expect(taskTracker.getTask(0)).toEqual(task1);
  })

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.editTask(0, null, null, 'wrong format'))
    .toThrow('Wrong format');

    expect(taskTracker.getTask(0)).toEqual(task1);
  })  

  test('should return the error and change nothing', () => {
    expect(() => taskTracker.editTask(0, 'newTitle', 'newDescription', 'wrong format'))
    .toThrow('Wrong format');
  
    expect(taskTracker.getTask(0)).toEqual(task1);
  })  
})
