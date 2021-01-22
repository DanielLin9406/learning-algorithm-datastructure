const { Queue } = require("../Queue/Queue");

class TreeNode {
  constructor(key, data) {
    this.parent = null;
    this.key = key;
    this.data = data;
    this.lc = null;
    this.rc = null;
  }
}

class LowerLevelBST {
  constructor(root) {
    this.root = root;
  }
  get_node_by_key(key) {
    let cur = this.root;
    while (cur !== null) {
      if (cur.key === key) {
        return cur;
      } else if (cur.key < key) {
        cur = cur.rc;
      } else {
        cur = cur.lc;
      }
    }
    return null;
  }
  get_min() {
    let cur = this.root;
    while (cur.lc !== null) {
      cur = cur.lc;
    }
    console.log("min cur", cur.key);
    return cur.key;
  }
  get_max() {
    let cur = this.root;
    while (cur.rc !== null) {
      cur = cur.rc;
    }
    console.log("max cur", cur.key);
    return cur.key;
  }
  left_most_node(cur) {
    while (cur.lc !== null) {
      cur = cur.lc;
    }
    return cur;
  }
  right_most_node(cur) {
    while (cur.rc !== null) {
      cur = cur.rc;
    }
    return cur;
  }
  successor_node(cur) {
    if (cur.rc != null) {
      return this.left_most_node(cur.rc);
    }
    let successorNode = cur.parent;
    while (successorNode != null && cur == successorNode.rc) {
      cur = successorNode;
      successorNode = successorNode.parent;
    }
    return successorNode;
  }
  predecessor_node(cur) {
    if (cur.lc != null) {
      return this.right_most_node(cur.lc);
    }
    let predecessorNode = cur.parent;
    while (predecessorNode != null && cur == predecessorNode.lc) {
      cur = predecessorNode;
      predecessorNode = predecessorNode.parent;
    }
    return predecessorNode;
  }
  traversal() {
    let cur = this.left_most_node(this.root);
    while (cur) {
      console.log("Traversal in order: ", cur.key, cur.data);
      cur = this.successor_node(cur);
    }
    return null;
  }
  traversal_reverse() {
    let cur = this.right_most_node(this.root);
    while (cur) {
      console.log("Traversal in order reverse: ", cur.key, cur.data);
      cur = this.predecessor_node(cur);
    }
    return null;
  }
  level_order_traversal_for_inspection() {
    const queue = new Queue();
    queue.enqueue(this.root);
    let cur;
    while (!queue.empty()) {
      cur = queue.front();
      queue.dequeue();
      console.log(cur.data);
      if (cur.lc != null) {
        queue.enqueue(cur.lc);
      }
      if (cur.rc != null) {
        queue.enqueue(cur.rc);
      }
    }
  }
  insert(newNode, cur) {
    if (newNode.key < cur.key) {
      if (cur.lc === null) {
        newNode.parent = cur;
        cur.lc = newNode;
      } else {
        this.insert(newNode, cur.lc);
      }
    } else {
      if (cur.rc === null) {
        newNode.parent = cur;
        cur.rc = newNode;
      } else {
        this.insert(newNode, cur.rc);
      }
    }
  }
  remove(deleteNode) {
    let removeNode = null;
    let removeChildNode = null;

    if (deleteNode.lc == null || deleteNode.lc == null) {
      // Deal with the node which will be removed that contains only one child or none.
      removeNode = deleteNode;
    } else {
      // For two child case, set the successor of deleteNode to removeNode.
      removeNode = this.successor_node(deleteNode);
    }

    // No matter how many child
    // Get "which" childNode in order to connect back to BST
    if (removeNode.lc !== null) {
      removeChildNode = removeNode.lc;
    } else {
      removeChildNode = removeNode.rc;
    }

    // No matter how many child
    // Connect childNode's "parent" property to BST
    if (removeChildNode != null) {
      removeChildNode.parent = removeNode.parent;
    }

    // No matter how many child
    // Deal with properties: parentNode's lc and rc
    if (removeNode.parent == null) {
      this.root = removeChildNode;
    } else if (removeNode == removeNode.parent.lc) {
      removeNode.parent.lc = removeChildNode;
    } else {
      removeNode.parent.rc = removeChildNode;
    }

    // For two-child case only
    // replace the key and data by the successor
    if (removeNode != deleteNode) {
      deleteNode.key = removeNode.key;
      deleteNode.data = removeNode.data;
    }
    removeNode = null;
  }
}

// BST or In-order Binary Tree
class BST extends LowerLevelBST {
  constructor(jsonStr) {
    const itemArr = JSON.parse(jsonStr);
    const root = new TreeNode(Number(itemArr[0].id), itemArr[0].data);
    super(root);
    this.itemArr = itemArr;
    this.root = root;
  }
  construct() {
    let newNode;
    this.itemArr.slice(1).forEach((item) => {
      newNode = new TreeNode(Number(item.id), item.data);
      this.insert(newNode, this.root);
    });
    return null;
  }
  read_node_by_key(key) {
    return this.get_node_by_key(key);
  }
  create_new_node(item) {
    let itemObj;
    try {
      itemObj = JSON.parse(JSON.stringify(item));
    } catch (error) {
      console.log("Input Object error", error);
    }
    if (itemObj.hasOwnProperty("id") && itemObj.hasOwnProperty("data")) {
      if (Object.prototype.toString.call(itemObj.id) === "[object Number]") {
        let newNode = new TreeNode(itemObj.id, itemObj.data);
        this.insert(newNode, this.root);
      } else {
        console.log("id is not number");
      }
    }
  }

  delete_node_by_key(key) {
    const deleteNode = this.get_node_by_key(key);
    if (!deleteNode) return;
    this.remove(deleteNode);
  }
}

// const input =
//   '[{"id":"16","data":{"test":"AA","name":"haha"}},{"id":"22","data":{"test":"BB","name":"haha88"}},{"id":"23","data":{"test":"CC","name":"haha123"}},{"id":"3","data":{"test":"DD","name":"haha77"}},{"id":"37","data":{"test":"EE","name":"haha2"}},{"id":"45","data":{"test":"FF","name":"haha4"}},{"id":"99","data":{"test":"GG","name":"haha22"}}]';
// const tree = new BST(input);
// tree.construct();
// console.log("Level-order Traversal:");
// tree.level_order_traversal_for_inspection();
// tree.create_new_node({ id: 55, data: {} });
// tree.read_node_by_key(37);
// tree.delete_node_by_key(37);
// console.log("Inorder Traversal:");
// tree.traversal();

module.exports = BST;
