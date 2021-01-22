/**
 * @namespace Queue
 * @method enqueue(ele)
 * @method dequeue()
 * @method front()
 * @method back()
 * @method toString()
 * @method size()
 * @method clear()
 * @method empty()
 */

class Queue {
  constructor(items) {
    this.items = items || [];
  }
  enqueue(ele) {
    this.items.push(ele);
  }
  dequeue() {
    if (!this.empty()) {
      return this.items.shift();
    }
    return `This queue is empty`;
  }
  front() {
    if (this.empty()) return `This queue is empty`;
    else return this.items[0];
  }
  back() {
    if (this.empty()) return `This queue is empty`;
    else return this.items[this.items.length - 1];
  }
  toString() {
    return this.items.toString();
  }
  size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
  empty() {
    if (this.items.length === 0) return true;
    else return false;
  }
}

const queue = new Queue();
// console.log(queue.empty());

queue.enqueue("Apple");
queue.enqueue("Banana");
queue.enqueue("Pear");
// console.log(queue.empty());

// console.log(queue.front()); // Apple
// console.log(queue.back()); // Pear

queue.dequeue();

// console.log(queue.front()); // Banana
// console.log(queue.back()); // Pear
// console.log(queue.toString());

/**
 * @namespace LoopQueue
 * @method getIndex(index)
 * @method find(index)
 */

class LoopQueue extends Queue {
  constructor(items) {
    super(items);
  }
  getIndex(index) {
    const length = this.items.length;
    return index > length ? index % length : index;
  }
  find(index) {
    return !this.empty() ? this.items[this.getIndex(index)] : null;
  }
}

// const loopQueue = new LoopQueue(["Surmon"]);
// loopQueue.enqueue("SkyRover");
// loopQueue.enqueue("Even");
// loopQueue.enqueue("Alice");
// console.log(loopQueue.size(), loopQueue.empty()); // 4 false
// console.log(loopQueue.find(26)); // 'Evan'
// console.log(loopQueue.find(33)); // 'Alice'

module.exports = { Queue, LoopQueue };
