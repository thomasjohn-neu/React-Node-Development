const uuid = require('uuid').v4;

function makeTaskList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();

  const taskList = {};
  const tasks = {
    // The below syntax lets you use a variable value as the key
    // if the value of id1 is "asdf", the property is "asdf", not "id1"
    [id1]: {
      id: id1,
      task: 'Cooking Biriyani',
      done: false,
      dateTime: Date.now(),
    },
    [id2]: {
      id: id2,
      task: 'Reading Quotes',
      done: true,
      dateTime: Date.now(),
    },
  };

  taskList.contains = function contains(id) {
    // This !! syntax coerces the value to a boolean
    // First by giving us the reverse of the truthy/falsy value,
    // then by reversing it to true/false
    return !!tasks[id];
  };

  taskList.getTasks = function getTodos() {
    return tasks;
  };

  taskList.addTask = function addTask(task) {
    const id = uuid();
    tasks[id] = {
      id,
      task: task.task,
      dateTime: new Date(task.date),
      done: false,
    };

    console.log(tasks[id], "   after addition");
    return id;
  };

  taskList.getTask = function getTask(id) {
    return tasks[id];
  };

  taskList.updateTask = function updateTask(id, task) {
    // this uses ?? because we need to accept `false` as a legit value
    tasks[id].done = task.done ?? tasks[id].done;
    // the below could use ?? or ||, but I don't want to accept ''
    tasks[id].task = task.task || tasks[id].task;
  };


  taskList.deleteTask = function deleteTask(id) {
    delete tasks[id];
  };

  return taskList;
};

module.exports = {
  makeTaskList,
};
