const BST = require("./BinarySearchTree");

class TreeNode {
  constructor(key, data) {
    this.parent = null;
    this.lc = null;
    this.rc = null;
    this.key = key;
    this.color = 0; // 0: red; 1: black
    this.data = data;
  }
}

class RBT extends BST {
  constructor(jsonStr) {
    super(jsonStr);
    this.nullptr = null;
  }
  construct() {
    let newNode;
    // or you can use arrow function
    this.itemArr.slice(1).forEach(function (item) {
      newNode = new TreeNode(Number(item.id), item.data);
      this.insert.call(this, newNode, this.root);
    }, this);
    return null;
  }
  left_rotation(cur) {
    let oldRC = cur.rc;
    cur.rc = oldRC.lc;
    if (oldRC.lc !== null) {
      oldRC.lc.parent = cur;
    }
    oldRC.parent = cur.parent;
    if (cur.parent == null) {
      this.root = oldRC;
    } else if (cur == cur.parent.lc) {
      cur.parent.lc = oldRC;
    } else {
      cur.parent.rc = oldRC;
    }
    oldRC.lc = cur;
    cur.parent = oldRC;
  }
  right_rotation(cur) {
    let oldLC = cur.lc;
    cur.lc = oldLC.rc;
    if (oldLC.rc !== null) {
      oldLC.rc.parent = cur;
    }
    oldLC.parent = cur.parent;
    if (cur.parent == null) {
      this.root = oldLC;
    } else if (cur == cur.parent.rc) {
      cur.parent.rc = oldLC;
    } else {
      cur.parent.lc = oldLC;
    }
    oldLC.rc = cur;
    cur.parent = oldLC;
  }
  get_parent(newNode) {
    return newNode === this.nullptr ? this.nullptr : newNode.parent;
  }
  get_grand_parent(newNode) {
    return this.get_parent(this.get_parent(newNode)).bind(this);
  }
  get_sibling(newNode) {
    const parent = this.get_parent(newNode);
    if (parent == this.nullptr) {
      return this.nullptr;
    }
    if (newNode == this.nullptr) {
      return this.nullptr;
    }
    if (newNode == parent.lc) {
      return parent.rc;
    } else {
      return parent.lc;
    }
  }
  get_uncle(newNode) {
    const parent = this.get_parent(newNode);
    return this.get_sibling(parent);
  }

  insert(newNode, cur) {
    if (cur !== this.nullptr) {
      if (newNode.key < cur.key) {
        if (cur.lc === this.nullptr) {
          cur.lc = newNode;
        } else {
          this.insert(newNode, cur.lc);
        }
      } else {
        if (cur.rc === this.nullptr) {
          cur.rc = newNode;
        } else {
          this.insert(newNode, cur.rc);
        }
      }
    }
    newNode.parent = cur;
    newNode.color = 0;
    newNode.lc = this.nullptr;
    newNode.rc = this.nullptr;
  }
  insert_repair_tree(newNode) {
    // https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
    if (this.get_parent(newNode) == this.nullptr) {
      this.insert_repair_case_1(newNode);
    } else if (
      this.get_uncle(newNode) !== this.nullptr &&
      this.get_uncle(newNode).color == 0
    ) {
      this.insert_repair_case_3(newNode);
    } else {
      this.insert_repair_case_4(newNode);
    }
  }
  insert_repair_case_1(newNode) {
    newNode.color = 1;
  }
  insert_repair_case_3(newNode) {
    this.get_parent(newNode).color = 1;
    this.get_uncle(newNode).color = 1;
    this.get_grand_parent(newNode).color = 0;
    this.insert_repair_tree(this.get_parent(newNode));
  }
  insert_repair_case_4(newNode) {
    const parent = this.get_parent(newNode);
    const grand_parent = this.get_grand_parent(newNode);
    if (newNode == parent.rc && p == grand_parent.lc) {
      RotateLeft(p);
      newNode = newNode.lc;
    } else if (newNode == parent.rc && p == grand_parent.rc) {
      RotateRight(p);
      newNode = newNode.rc;
      this.insert_repair_case_4_2(newNode);
    }
  }
  insert_repair_case_4_2(newNode) {
    const parent = this.get_parent(newNode);
    const grand_parent = this.get_grand_parent(newNode);
    if (newNode == parent.left) {
      RotateRight(g);
    } else {
      RotateLeft(g);
    }
    parent.color = BLACK;
    grand_parent.color = RED;
  }
  create_new_node(item) {
    let newNode = new TreeNode(itemObj.id, itemObj.data);
    this.insert(newNode, this.root);
    this.insert_repair_tree(newNode);
  }
}

const input =
  '[{"id":"16","data":{"test":"AA","name":"haha"}},{"id":"22","data":{"test":"BB","name":"haha88"}},{"id":"23","data":{"test":"CC","name":"haha123"}},{"id":"3","data":{"test":"DD","name":"haha77"}},{"id":"37","data":{"test":"EE","name":"haha2"}},{"id":"45","data":{"test":"FF","name":"haha4"}},{"id":"99","data":{"test":"GG","name":"haha22"}}]';
const tree = new RBT(input);
tree.construct();
// console.log("Level-order Traversal:");
tree.level_order_traversal_for_inspection();
