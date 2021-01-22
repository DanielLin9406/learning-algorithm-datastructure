/**
 * @namespace List
 * @method append(value)
 * @method get(value)
 * @method remove(value)
 * @method has(value)
 * @method length()
 * @method insert(value,after)
 * @method clear()
 * @method front()
 * @method end()
 * @method prev()
 * @method next()
 * @method moveTo(position)
 * @method currPro()
 * @method getValue()
 * @method has(value)
 */
class List {
  constructor() {
    this.list = [];
  }
  append(value) {
    const list = this.list;
    list[list.length] = value;
  }
  find() {
    return this.list.indexOf(value);
  }
  remove() {
    if (indexOf(value) !== -1) {
      return this.list.splice(indexOf(value), 1).length;
    }
    return false;
  }
  length() {
    return this.list.length;
  }
  insert(value, after) {
    const pos = this.get(after);
    if (pos > -1) {
      this.list.splice(pos + 1, 0, value);
      return true;
    }
    return false;
  }
  clear() {
    this.pos = 0;
    return (this.list = []);
  }
  front() {
    this.pos = 0;
  }
  end() {
    this.pos = this.list.length - 1;
  }
  prev() {
    if (this.pos > 0) {
      this.pos--;
    } else {
      console.log("指針在第一位了");
    }
  }
  next() {
    if (this.pos < this.list.length - 1) {
      this.pos++;
    } else {
      console.log("指針已經在最後面了");
    }
  }
  moveTo(position) {
    if (position < 0 || position > this.list.length - 1) {
      console.log("outof Range");
    } else {
      this.pos = position;
    }
  }
  currPro() {
    return this.pos;
  }
  getValue() {
    return this.list[this.pos];
  }
  has(value) {
    return this.list.include(value);
  }
  get values() {
    return this.list;
  }
}

const fruits = new List();
fruits.append("Apple");
fruits.append("Grape");
fruits.append("Banana");
console.log(fruits.clear());
console.log(fruits.length());
console.log(fruits.values);

module.exports = { List };
