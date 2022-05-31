const { addTask, editTask, getTask, getTasks, updateBase } = require('./index');

let data;

beforeAll(() => {
  data = getTasks();
})

afterAll(() => {
  updateBase(data);
})

beforeEach(() => {
  updateBase();
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

describe('AddTask function', () => {
  test('must add a new task to the database', () => {
    addTask('title1', 'description1', '2022-06-30 23:59');

    expect(getTask(0)).toEqual(task1);
  })

  test('must add a new task to the database at the end', () => {
    addTask('title1', 'description1', '2022-06-30 23:59');
    addTask('title2', 'description2', '2022-06-29 23:59');
  
    expect(getTask(0)).toEqual(task1);
    expect(getTask(1)).toEqual(task2);
  })
})
