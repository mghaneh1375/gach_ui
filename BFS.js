let [id_2, color_2, pos_2] = register_new_player();
console.log(pos_2);
console.log("my id_2 is" + id_2);

let row = 10;
let col = 10;
function safeNeighbor(r, c) {
  if (r < 0 || r >= row) return false;
  if (c < 0 || c >= col) return false;
  if (data_table[r][c] === -1) return false;
  return true;
}

exploreLocation = function (location) {
  let r = location.x;
  let c = location.y;
  let allNeighbors = [];
  //left
  if (safeNeighbor(r, c - 1)) allNeighbors.push({ x: r, y: c - 1 });
  //right
  if (safeNeighbor(r, c + 1)) allNeighbors.push({ x: r, y: c + 1 });
  //top
  if (safeNeighbor(r - 1, c)) allNeighbors.push({ x: r - 1, y: c });
  //bottom
  if (safeNeighbor(r + 1, c)) allNeighbors.push({ x: r + 1, y: c });

  return allNeighbors;
};

findPath = function () {
  let path = undefined;
  var location = { x: pos_2.x, y: pos_2.y };
  var queue = [];
  queue.push(location);
  let grid = [];
  for (let i = 0; i < 10; i++) {
    let tmp = [];
    for (let j = 0; j < 10; j++) {
      tmp.push({
        state: "unvisited",
        parent: undefined,
      });
    }
    grid.push(tmp);
  }

  var currentLocation;

  while (queue.length) {
    currentLocation = queue.shift();
    path = [];

    if (currentLocation.x == goal_pos.x && currentLocation.y == goal_pos.y) {
      let tmp2 = {
        x: currentLocation.x,
        y: currentLocation.y,
      };

      path.push(tmp2);

      while (tmp2.x !== pos_2.x || tmp2.y !== pos_2.y) {
        path.push(grid[tmp2.x][tmp2.y].parent);
        tmp2 = {
          x: grid[tmp2.x][tmp2.y].parent.x,
          y: grid[tmp2.x][tmp2.y].parent.y,
        };
      }
      return path;
    }

    grid[currentLocation.x][currentLocation.y].state = "visited";

    var neighbors = exploreLocation(currentLocation);

    neighbors.forEach((neighbor) => {
      if (grid[neighbor.x][neighbor.y].state != "visited") {
        queue.push(neighbor);
        grid[neighbor.x][neighbor.y]["parent"] = currentLocation;
      }
    });
  }

  return false;
};

function check_start2() {
  setTimeout(function () {
    if (start) {
      start_game2();
      return;
    }
    check_start2();
  }, 50);
}

check_start2();

function start_game2() {
  path = findPath();
  if (path !== undefined) {
    path.pop();
    setTimeout(next_move2, 1000);
  }
}

function next_move2() {
  let node = path.pop();
  if (node === undefined) {
    path = findPath();
    if (path !== undefined) path.pop();
    node = path.pop();
  }
  let move_;
  if (pos_2.x == node.x + 1) {
    move_ = "up";
  } else if (pos_2.x == node.x - 1) {
    move_ = "down";
  } else if (pos_2.y == node.y + 1) {
    move_ = "left";
  } else if (pos_2.y == node.y - 1) {
    move_ = "right";
  }
  let move_result = move(id_2, move_);
  console.log(move_result);
  if (!move_result) {
    // clearInterval(my_game_timer);
    console.log("heyyyy");
  } else {
    setTimeout(function () {
      next_move2();
    }, 1000);
  }
}
