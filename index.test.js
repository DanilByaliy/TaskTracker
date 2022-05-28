"use string";

const taskTracker = require("./index.js");

/* describe('Timezones', () => {
  it('should always be UTC', () => {
      expect(new Date().getTimezoneOffset()).toBe(0);
  });
}); */

test("tasksOutput function test", () => {
  let tasksArr = [];
  expect(taskTracker.tasksOutput(tasksArr)).toBe("");
  tasksArr = [
    {
      taskName: "Task One",
      taskDetails: "just details",
      taskDeadline: "2022-05-28",
      taskDone: false,
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
      taskName: "Task One",
      taskDeadline: "2022-05-28",
      taskDone: false,
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
      taskName: "Task One",
      taskDetails: "just details",
      taskDone: false,
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
      taskName: "Task One",
      taskDetails: "just details",
      taskDeadline: "2022-05-28",
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
      taskDetails: "just details",
      taskDeadline: "2022-05-28",
      taskDone: false,
    },
  ];
  expect(taskTracker.tasksOutput(tasksArr)).toBe("");
  tasksArr = [
    {
      taskName: "Task One",
      taskDetails: "just details",
      taskDeadline: "2022-05-28",
      taskDone: false,
    },
    {
      taskName: "Task Two",
      taskDetails: "just details",
      taskDeadline: "2022-05-28T01:25:43+03:00",
      taskDone: true,
    },
    {
      taskName: "Task Three",
      taskDetails: "just details",
      taskDeadline: "2022-05-26T18:25:43+03:00",
      taskDone: false,
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
