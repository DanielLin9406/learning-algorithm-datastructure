/**
 * @namespace Stack
 * @method push(ele)
 * @method pop()
 * @method peek()
 * @method isEmpty()
 * @method size()
 * @method clear()
 * @method toString()
 */

class Stack {
  constructor() {
    this.items = [];
  }
  push(ele) {
    this.items.push(ele);
  }
  pop() {
    return this.items.pop(ele);
  }
  get peek() {
    return this.items[this.items.length - 1];
  }
  get isEmpty() {
    return this.items.length === 0;
  }
  get size() {
    return this.items.length;
  }
  clear() {
    this.items = [];
  }
  toString() {
    this.items.toString();
  }
}

const stack = new Stack();
console.log(stack.isEmpty);

// 添加元素
stack.push(5);
stack.push(8);

// 读取属性再添加
console.log(stack.peek); // 8
stack.push(11);
console.log(stack.size); // 3
console.log(stack.isEmpty); // false

module.exports = { Stack };
