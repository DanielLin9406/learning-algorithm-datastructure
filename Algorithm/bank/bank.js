function ThreadPool(size) {
  this.threads = [];
  this.tasks = [];
  for (let i = 0; i < size; i++) {
    this.threads.push(new Thread(i));
  }
}
ThreadPool.prototype.assignTasks = function (callback) {
  if (this.threads.length > 0) {
    for (let ithread = 0; ithread < this.threads.length; ithread++) {
      this.threads[ithread].run(this.tasks, callback);
    }
  } else {
    this.tasks.push(task);
  }
};
ThreadPool.prototype.addTasks = function (tasks) {
  this.tasks.push([...tasks]);
};

ThreadPool.prototype.addTask = function (task) {
  this.tasks.push(task);
};

ThreadPool.prototype.readProcessedRecords = function () {
  const arr = [];
  for (let ithread = 0; ithread < this.threads.length; ithread++) {
    arr.push(this.threads[ithread].readProcessedRecord());
  }
  return arr;
};

function Thread(threadIndex) {
  this.threadIndex = threadIndex;
  // this.result = {
  //   current: 0,
  //   processed: [],
  // };
  this.processed = [];
  this.current = 0;
}

Thread.prototype.run = async function (taskList, callback) {
  const randomDelay = Math.floor((Math.random() + 0.5) * 100) * 10;
  let current = this.current;
  let processed = this.processed;
  // let timer = null;
  // function dealWithStuff(taskList) {
  //   if (taskList.length > 0) {
  //     timer = setTimeout(() => {
  //       const value = taskList.shift();
  //       processed.push(value);
  //       dealWithStuff(taskList);
  //       console.log(processed);
  //     }, Math.floor((Math.random() + 0.5) * 100) * 10);
  //   }
  // }
  // dealWithStuff(taskList);
  function dealWithTasksPromise(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const value = taskList.shift();
        current = value;
        resolve(current);
      }, delay);
    });
  }
  function addTaskProcessedPromise(current) {
    return new Promise((resolve) => {
      setTimeout(() => {
        processed.push(current);
        resolve(processed);
      }, 0);
    });
  }
  while (taskList.length > 0) {
    current = await dealWithTasksPromise(randomDelay);
    callback(this.threadIndex, current, "", taskList);
    processed = await addTaskProcessedPromise(current);
    callback(this.threadIndex, "", processed, taskList);
  }
  this.processed = processed;
};

const callbackProcessed = (index, current, processed, taskList) => {
  console.log("index", index);
  console.log("current", current);
  console.log("processed", processed);
  console.log("waitings", taskList);
  console.log("waitings", taskList[taskList.length]);
  console.log("--------------------");
};

const pool = new ThreadPool(2);
pool.addTask("task1");
pool.addTask("task2");
pool.addTask("task3");
pool.addTask("task4");
pool.addTask("task5");
pool.addTask("task6");
pool.addTask("task7");
pool.addTask("task8");
pool.assignTasks(callbackProcessed);

// const dealWithStuff = (waitingQueue, result) => {
//   let timer = null;
//   if (waitingQueue.length > 0) {
//     timer = setTimeout(() => {
//       const value = waitingQueue.shift();
//       result.push(value);
//       dealWithStuff(waitingQueue, result);
//     }, 50);
//   }
// };

// const handleClient = (waitingQueue = []) => {
//   const result = [];
//   dealWithStuff(waitingQueue, result);
//   return result;
// };

// handleClient([1, 2, 3, 4, 5, 6, 7]);
