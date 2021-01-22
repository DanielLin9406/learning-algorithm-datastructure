const { Queue } = require("../Queue/Queue");

class TreeNode {
  constructor(data, parent = null, leftChild = null, rightChild = null) {
    this.parent = parent;
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class BinaryTree {
  traversal(type) {
    switch (type) {
      case "pre":
        this.pre_order(this.rootNode);
        break;
      case "in":
        this.in_order(this.rootNode);
        break;
      case "post":
        this.post_order(this.rootNode);
        break;
      default:
        this.in_order(this.rootNode);
    }
  }
  pre_order(currentNode) {
    if (currentNode) {
      console.log("Pre Order:", currentNode.data + " ");
      this.pre_order(currentNode.leftChild);
      this.pre_order(currentNode.rightChild);
    }
  }
  in_order(currentNode) {
    if (currentNode) {
      this.in_order(currentNode.leftChild);
      console.log("In Order:", currentNode.data + " ");
      this.in_order(currentNode.rightChild);
    }
  }
  post_order(currentNode) {
    if (currentNode) {
      this.post_order(currentNode.leftChild);
      this.post_order(currentNode.rightChild);
      console.log("Post Order", currentNode.data + " ");
    }
  }
}

class LevelOrderBinaryTree extends BinaryTree {
  constructor(char) {
    this.itemArr = char.split("");
    this.rootNode = new TreeNode(this.itemArr[0]);
  }
  construct() {
    const queue = new Queue();
    let currentNode = this.rootNode;
    const itemArr = this.itemArr;
    let i = 1;
    while (itemArr[i]) {
      // Add leftChild
      let newNode = new TreeNode(itemArr[i]);
      newNode.parent = currentNode;
      currentNode.leftChild = newNode;
      queue.enqueue(newNode);

      // Break if no new node has been added.
      if (!itemArr[i++]) break;

      // Add rightChild
      newNode = new TreeNode(itemArr[i]);
      newNode.parent = currentNode;
      currentNode.rightChild = newNode;
      queue.enqueue(newNode);

      // Move currentNode to next
      currentNode = queue.front();
      queue.dequeue();
      i++;
    }
  }
  insert(item) {
    const queue = new Queue();
    let currentNode = this.rootNode;
    while (currentNode) {
      if (currentNode.leftChild !== null) {
        queue.enqueue(currentNode.leftChild);
      } else {
        let newNode = new TreeNode(item);
        newNode.parent = currentNode;
        currentNode.leftChild = newNode;
        break;
      }
      if (currentNode.rightChild !== null) {
        queue.enqueue(currentNode.rightChild);
      } else {
        let newNode = new TreeNode(item);
        newNode.parent = currentNode;
        currentNode.rightChild = newNode;
        break;
      }

      // Move currentNode to next
      currentNode = queue.front();
      queue.dequeue();
    }
  }
  traversal() {
    const queue = new Queue();
    queue.enqueue(this.rootNode);
    let currentNode;
    while (!queue.empty()) {
      currentNode = queue.front();
      queue.dequeue();
      if (currentNode.leftChild != null) {
        queue.enqueue(currentNode.leftChild);
      }
      if (currentNode.rightChild != null) {
        queue.enqueue(currentNode.rightChild);
      }
      console.log(currentNode.data);
    }
  }
}
const ss = "ABCDE";
const tree = new LevelOrderBinaryTree(ss);
tree.construct();
tree.insert("M");
tree.traversal("post");
