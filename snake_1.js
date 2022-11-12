let { id, color, pos } = register_new_player();

game_timer = setInterval(function () {
  if (goal_pos.x < pos.x) move(id, "up");
  else if (goal_pos.y < pos.y) move(id, "left");
  else if (goal_pos.x > pos.x) move(id, "down");
  else if (goal_pos.y > pos.y) move(id, "right");
}, 1000);
