const { Dictionary } = require("../Dictionary/Dictionary");
const { Queue } = require("../Queue/Queue");

class Graph {
  constructor() {
    // this.adjList = new Dictionary();
    this.adjList = new Map();
    this.visitedArr = [];
    this.predecessor = [];
    this.distance = [];
  }
  add_vertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }
  add_edge(vertex, node) {
    if (this.adjList.get(vertex)) {
      if (this.adjList.has(node)) {
        let arr = this.adjList.get(vertex);
        if (arr.includes(node)) return;
        arr.push(node);
      } else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }
  get_graph() {
    for (let [key, value] of this.adjList) {
      console.log(key, value);
    }
  }
  set_visited_node(key = 0, color = 0) {
    this.visitedArr[key] = color;
  }
  set_predecessor_node(key = 0, color = 0) {
    this.predecessor[key] = color;
  }
  set_distance_node(key = 0, color = 0) {
    this.distance[key] = color;
  }
  set_finish_node() {
    this.finish[key] = color;
  }
  set_discover_node() {
    this.discover[key] = color;
  }
  bfs() {
    // initialization
    // 1. set all vertex to 0
    // 2. set all distances to infinity
    // 3. predecessor
    // 4. Establish Queue
    const queue = new Queue();
    for (let i = 0; i < this.adjList.size; i++) {
      this.set_visited_node(i, 0);
      this.set_predecessor_node(i, -1);
      this.set_distance_node(i, this.adjList.size + 1);
    }

    // Set start point
    // 1. push vertex[0] to queue
    // 2. set vertex[0] to grey
    // 3. set distance[A] to 0 as start point
    // 4. unset predecessor[A]
    for (let i = 0; i < this.adjList.size; i++) {
      if (this.visitedArr[i] == 0) {
        this.set_visited_node(i, 1);
        this.set_predecessor_node(i, -1);
        this.set_distance_node(i, this.adjList.size + 1);
        queue.enqueue(i);
        while (!queue.empty()) {
          let currentNode = queue.front();
          for (let ele of this.adjList.get(currentNode)) {
            if (this.visitedArr[ele] === 0) {
              this.visitedArr[ele] = 1;
              this.predecessor[ele] = currentNode;
              this.distance[ele] = this.distance[currentNode] + 1;
              queue.enqueue(ele);
            }
          }
          queue.dequeue();
          this.visitedArr[currentNode] = 2;
        }
      }
    }
    console.log(this.visitedArr);
    console.log(this.predecessor);
  }
  dfs() {
    for (let i = 0; i < this.adjList.size; i++) {
      this.set_visited_node(i, 0);
      this.set_predecessor_node(i, -1);
      this.set_distance_node(i, this.adjList.size + 1);
    }
  }
}

const g = new Graph();
g.add_vertex(0);
g.add_vertex(1);
g.add_vertex(2);
g.add_vertex(3);
g.add_vertex(4);
g.add_vertex(5);
g.add_vertex(6);
g.add_vertex(7);
g.add_edge(0, 1);
g.add_edge(0, 2);
g.add_edge(0, 3);
g.add_edge(1, 0);
g.add_edge(1, 4);
g.add_edge(2, 0);
g.add_edge(2, 4);
g.add_edge(5, 6);
g.add_edge(6, 7);
g.bfs();

module.exports = { Graph };
