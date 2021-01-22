/**
 * @namespace LinkedList
 * @method append(ele)
 * @method insert(pos,ele)
 * @method removeAt(pos)
 * @method indexOf(ele)
 * @method remove(ele)
 * @method isEmpty()
 * @method size()
 * @method toString()
 */

class Node {
  constructor(ele) {
    this.ele = ele;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.headPointer = null;
    this.length = 0;
  }
  append(ele) {
    const node = new Node(ele);
    // 暫時指標
    let tmpPointer = null;
    // 新的List，將head指向新節點
    if (this.headPointer === null) {
      this.headPointer = node;
    } else {
      // 現在指標只在最後一個
      tmpPointer = this.headPointer;
      while (tmpPointer.next) {
        tmpPointer = tmpPointer.next;
      }
      tmpPointer.next = node;
    }
    this.length++;
  }
  insert(pos, ele) {
    if (pos >= 0 && pos <= this.length) {
      const node = new Node(ele);
      // 暫時指針從頭開始
      let tmpPointer = this.headPointer;
      // 暫時指針二號
      let prevPointer;
      let prevIndex = 0;
      // 新增在第一個
      if (pos === 0) {
        this.headPointer = node;
      } else {
        while (prevIndex++ < pos) {
          // 讓current指到新增的Node
          prevPointer = tmpPointer;
          // 讓tmpPointer指到下一個
          tmpPointer = tmpPointer.next;
        }
        node.next = tmpPointer;
        prevPointer.next = node;
      }
      this.length++;
      return true;
    } else {
      return false;
    }
  }
  removeAt(pos) {
    if (pos > -1 && pos < this.length) {
      // 暫時指針從頭開始
      let tmpPointer = this.headPointer;
      // 暫時指針二號
      let prevPointer;
      let prevIndex = 0;
      // 刪除第一個
      if (pos === 0) {
        this.headPointer = tmpPointer.next;
      } else {
        while (prevIndex++ < pos) {
          // 讓current指到刪除的Node
          prevPointer = tmpPointer;
          // 讓tmpPointer指到下一個
          tmpPointer = tmpPointer.next;
        }
        // 再次把連結串連
        prevPointer.next = tmpPointer.next;
      }
      this.length--;
      return tmpPointer.ele;
    } else {
      return null;
    }
  }
  indexOf(ele) {
    let tmpPointer = this.headPointer;
    let tmpIndex = -1;
    while (tmpPointer) {
      if (ele === tmpPointer.ele) {
        return tmpIndex;
      }
      tmpIndex++;
      tmpPointer = tmpPointer.next;
    }
    return -1;
  }
  remove(ele) {
    const removeIndex = this.indexOf(ele);
    return this.removeAt(removeIndex);
  }
  isEmpty() {
    return this.length === 0;
  }
  size() {
    return this.length;
  }
  toString() {
    let tmpPointer = this.headPointer;
    let string = "";
    while (tmpPointer) {
      string += `${tmpPointer.ele}=>`;
      tmpPointer = tmpPointer.next;
    }
    return string;
  }
}

const linkedList = new LinkedList();
linkedList.append(2);
linkedList.append(6);
linkedList.append(24);
linkedList.append(152);
console.log(linkedList.toString());
linkedList.insert(3, 18);
console.log(linkedList.toString());
linkedList.removeAt(3);
console.log(linkedList.toString());

module.exports = { LinkedList };
