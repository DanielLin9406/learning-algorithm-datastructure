/**
 * @namespace DoubleLinkedList
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
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  constructor() {
    // 頭部指針
    this.headPointer = null;
    // 尾部指針
    this.tailPointer = null;
    this.length = 0;
  }
  append(ele) {
    const node = new Node(ele);
    // 暫時指標
    let tmpPointer = null;
    // 新的List，將head指向新節點
    if (this.headPointer === null) {
      this.headPointer = node;
      this.tailPointer = node;
    } else {
      // 現在指標只在最後一個
      tmpPointer = this.headPointer;
      while (tmpPointer.next) {
        tmpPointer = tmpPointer.next;
      }
      tmpPointer.next = node;
      node.prev = tmpPointer;
      this.tailPointer = node;
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
      // 新增在第一個位置
      if (pos === 0) {
        // 全新的List
        if (!this.headPointer) {
          this.headPointer = node;
          this.tailPointer = node;
        } else {
          node.next = tmpPointer;
          tmpPointer.prev = node;
          // 更新頭部指針
          this.headPointer = node;
        }
      } else if (pos === this.length) {
        // 暫時指針從尾巴開始
        tmpPointer = this.tailPointer;
        tmpPointer.next = node;
        node.prev = tmpPointer;
        // 更新尾部指針
        this.tailPointer = node;
      } else {
        // 從中間插入需要兩個指針輔助
        // prevPointer跟 tmpPointer分別指向插入的node前後
        while (prevIndex++ < pos) {
          // 讓current指到新增的Node
          prevPointer = tmpPointer;
          // 讓tmpPointer指到下一個
          tmpPointer = tmpPointer.next;
        }
        // 注意要按照順序避免斷掉鏈結，node.next指到current，previous.next指到node，current.prev 指到 node
        node.next = tmpPointer;
        prevPointer.next = node;
        tmpPointer.prev = node;
        node.prev = prevPointer;
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
      // 刪除頭部元素
      if (pos === 0) {
        this.headPointer = tmpPointer.next;
        if (this.length === 1) {
          this.tailPointer = null;
        } else {
          this.headPointer.prev = null;
        }
      } else if (pos === this.length - 1) {
        tmpPointer = this.tailPointer;
        this.tailPointer = tmpPointer.prev;
        this.tailPointer.next = null;
      } else {
        while (prevIndex++ < pos) {
          // 讓current指到刪除的Node
          prevPointer = tmpPointer;
          // 讓tmpPointer指到下一個
          tmpPointer = tmpPointer.next;
        }
        // 再次把連結串連
        prevPointer.next = tmpPointer.next;
        tmpPointer.next.prev = prevPointer;
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
    let prevPointer = this.tailPointer;
    let string = "";
    let string2 = "";
    while (tmpPointer) {
      string += `${tmpPointer.ele}=>`;
      tmpPointer = tmpPointer.next;
    }
    while (prevPointer) {
      string2 += `${prevPointer.ele}=>`;
      prevPointer = prevPointer.prev;
    }
    return [string, string2];
  }
}

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.append(2);
doubleLinkedList.append(6);
doubleLinkedList.append(24);
doubleLinkedList.append(152);
console.log(doubleLinkedList.toString());

module.exports = { DoubleLinkedList };
