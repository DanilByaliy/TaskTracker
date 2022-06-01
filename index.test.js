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

describe('EditTask function', () => {
  beforeEach(() => {
    addTask('title1', 'description1', '2022-06-30 23:59');
  })

  test('should only change the title', () => {
    editTask(0, 'newTitle');
    const editTask1 = getTask(0);

    expect(editTask1.title).toBe('newTitle');
    expect(editTask1.description).toBe('description1');
    expect(editTask1.deadline).toBe('2022-06-30T23:59:00');
  })

  test('should change only the description', () => {
    editTask(0, null, 'newDescription');
    const editTask1 = getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('newDescription');
    expect(editTask1.deadline).toBe('2022-06-30T23:59:00');
  })

  test('should only change the deadline', () => {
    editTask(0, null, null, '2022-02-22 22:22');
    const editTask1 = getTask(0);
  
    expect(editTask1.title).toBe('title1');
    expect(editTask1.description).toBe('description1');
    expect(editTask1.deadline).toBe('2022-02-22T22:22:00');
  })

  test('must change the title, description and deadline', () => {
    editTask(0, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask1 = getTask(0);
  
    expect(editTask1.title).toBe('newTitle');
    expect(editTask1.description).toBe('newDescription');
    expect(editTask1.deadline).toBe('2022-02-22T22:22:00');
  })  

  test('must change all task parameters for id', () => {
    addTask('title2', 'description2', '2022-06-29 23:59');
    editTask(1, 'newTitle', 'newDescription', '2022-02-22 22:22');
    const editTask2 = getTask(1);
  
    expect(editTask2.title).toBe('newTitle');
    expect(editTask2.description).toBe('newDescription');
    expect(editTask2.deadline).toBe('2022-02-22T22:22:00');
  })  

  test('should not change anything', () => {
    editTask(0);

    expect(getTask(0)).toEqual(task1);
  })

  test('should return the error and change nothing', () => {
    expect(() => editTask(0, null, null, 'wrong format'))
    .toThrow('Wrong format');

    expect(getTask(0)).toEqual(task1);
  })  

  test('should return the error and change nothing', () => {
    expect(() => editTask(0, 'newTitle', 'newDescription', 'wrong format'))
    .toThrow('Wrong format');
  
    expect(getTask(0)).toEqual(task1);
  })  
})
