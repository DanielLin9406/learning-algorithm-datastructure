/**
 * @namespace PriorityQueue
 * @method enqueue(ele)
 * @method dequeue()
 * @method front()
 * @method back()
 * @method toString()
 * @method size()
 * @method clear()
 * @method empty()
 */

class QueueElement {
  constructor(ele, priority) {
    this.ele = ele;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.items = [];
  }
  enqueue(ele, priority) {
    const queueElement = new QueueElement(ele, priority);
    if (this.empty()) {
      this.items.push(queueElement);
    } else {
      // 新增的有高於現有的優先級，插入前方對列
      let added = false;
      this.items.forEach((ele, i, arr) => {
        if (queueElement.priority < ele.priority) {
          arr.splice(i, 0, queueElement);
          added = true;
        }
      });
      // 如果沒有新增任何高優先級的，就用一般方式新增
      if (!added) {
        this.items.push(queueElement);
      }
    }
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
    return JSON.stringify(this.items).toString();
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

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue("令狐衝", 2);
priorityQueue.enqueue("西方不拜", 1);
priorityQueue.enqueue("田薄光", 4);
priorityQueue.enqueue("任贏贏", 3);
console.log(priorityQueue.toString());

module.exports = { PriorityQueue };
