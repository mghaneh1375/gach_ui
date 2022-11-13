let { id, color, pos } = register_new_player();

class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }
  addNode(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    this.AdjList.get(w).push(v);
  }
  SP(start, end) {
    let queue = [[start]];
    let visitedNodes = new Set();
    while (queue.length > 0) {
      let path = queue.shift();
      let currentNode = path[path.length - 1];
      console.log(currentNode);
      if (currentNode === end) {
        return path;
      } else if (!visitedNodes.has(currentNode)) {
        let neighborNodes = this.AdjList.get(currentNode);
        // queue.append(neighborNodes);
        queue.push(neighborNodes);
        visitedNodes.add(currentNode);
      }
    }
  }

  BFS(startingNode) {
    // create a visited object
    var visited = {};

    // Create an object for queue
    var q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(startingNode);

    // loop until queue is empty
    while (!q.isEmpty) {
      // get the element from the queue
      var getQueueElement = q.dequeue();

      // passing the current vertex to callback function
      console.log(getQueueElement);

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var i in get_List) {
        var neigh = get_List[i];

        if (!visited[neigh]) {
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
    }
  }
}

let g = new Graph(100);

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    g.addNode(i + "_" + (j + ""));
  }
}

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (data_table[i][j] === -1) continue;

    if (j < 9 && data_table[i][j + 1] !== -1)
      g.addEdge(i + "_" + (j + ""), i + "_" + (j + 1 + ""));

    if (i < 9 && data_table[i + 1][j] !== -1)
      g.addEdge(i + "_" + (j + ""), i + 1 + "_" + (j + ""));
  }
}

console.log(g.SP(pos.x + "_" + pos.y, goal_pos.x + "_" + goal_pos.y));
