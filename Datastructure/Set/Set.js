class Set {
  constructor() {
    this.items = {};
  }
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  }
  remove(value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  }
  has(value) {
    return this.items.hasOwnProperty(value);
  }
  clear() {
    this.items = {};
  }
  get size() {
    return Object.keys(this.items).length;
  }
  get values() {
    return Object.keys(this.items);
  }
  union(otherSet) {
    let unionSet = new Set();
    let values = this.values;
    values.forEach((ele) => {
      unionSet.add(ele);
    });
    values = otherSet.values;
    values.forEach((ele) => {
      unionSet.add(ele);
    });
    return unionSet;
  }
  intersection(otherSet) {
    let intersectionSet = new Set();
    let values = this.values;
    values.forEach((ele) => {
      if (otherSet.has(ele)) {
        intersectionSet.add(ele);
      }
    });
    return intersectionSet;
  }
  difference(otherSet) {
    let differenceSet = new Set();
    let values = this.values;
    values.forEach((ele) => {
      if (!otherSet.has(ele)) {
        differenceSet.add(ele);
      }
    });
    return differenceSet;
  }
  subSet(otherSet) {
    if (this.size > otherSet.size) {
      return false;
    } else {
      let values = this.values;
      let res = true;
      values.forEach((ele) => {
        if (!otherSet.has(ele)) {
          res = false;
        }
      });
      return res;
    }
  }
}

// Test
const set = new Set();
set.add(12);
set.add(7);
set.add(1);
console.log("size", set.size);
console.log(set.values);

// Test2
let setA = new Set();
setA.add(1);
setA.add(4);
setA.add(2);

let setB = new Set();
setB.add(1);
setB.add(4);
setB.add(2);
setB.add(7);

// Test union intersect
console.log("setA", setA.values);
console.log("setb", setB.values);
let unionSet = setA.union(setB);
let intersection = setA.intersection(setB);
let differenceSet = setA.difference(setB);
let subSet = setA.subSet(setB);
console.log("unionset:", unionSet.values);
console.log("intersection:", intersection.values);
console.log("differenceSet", differenceSet.values);
console.log("subSet", subSet);

module.exports = { Set };
