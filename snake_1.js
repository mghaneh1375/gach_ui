let [id, color, pos] = register_new_player();
let last_move = undefined;

function check_for_best(wanted_move) {
  if (wanted_move === 'up' && goal_pos.x < pos.x) return true;
  else if (wanted_move === 'left' && goal_pos.y < pos.y) return true;
  else if (wanted_move === 'down' && goal_pos.x > pos.x) return true;
  else if (wanted_move === 'right' && goal_pos.y > pos.y) return true;

  return false;
}

function check_for_move(wanted_move) {
  if (wanted_move === 'up' && last_move !== 'down') return true;
  else if (wanted_move === 'left' && last_move !== 'right') return true;
  else if (wanted_move === 'down' && last_move !== 'up') return true;
  else if (wanted_move === 'right' && last_move !== 'left') return true;

  return false;
}

function check_for_can_move(wanted_move) {
  if (wanted_move === 'up' && pos.x === 0) return false;

  if (wanted_move === 'left' && pos.y === 0) return false;

  if (wanted_move === 'down' && pos.x === 9) return false;

  if (wanted_move === 'right' && pos.y === 9) return false;

  if (
    wanted_move === 'up' &&
    obstacles.find((elem, index) => {
      return elem.x === pos.x - 1 && elem.y === pos.y;
    }) === undefined
  )
    return true;

  if (
    wanted_move === 'left' &&
    obstacles.find((elem, index) => {
      return elem.x === pos.x && elem.y === pos.y - 1;
    }) === undefined
  )
    return true;

  if (
    wanted_move === 'down' &&
    obstacles.find((elem, index) => {
      return elem.x === pos.x + 1 && elem.y === pos.y;
    }) === undefined
  )
    return true;

  if (
    wanted_move === 'right' &&
    obstacles.find((elem, index) => {
      return elem.x === pos.x && elem.y === pos.y + 1;
    }) === undefined
  )
    return true;

  return false;
}

let avaialble_moves = ['up', 'down', 'left', 'right'];

function check_start() {
  setTimeout(function () {
    if (start) {
      start_game();
      return;
    }
    check_start();
  }, 50);
}

check_start();

function start_game() {
  setTimeout(next_move, 1000);
}

function next_move() {
  let avaialble_choices = [];
  let curr_avaialble_moves = [];

  for (let i = 0; i < avaialble_moves.length; i++) {
    if (check_for_can_move(avaialble_moves[i])) {
      avaialble_choices.push(avaialble_moves[i]);
      curr_avaialble_moves.push(avaialble_moves[i]);
    }
  }

  // console.log(curr_avaialble_moves);

  let best_move = undefined;

  while (avaialble_choices.length > 0) {
    r = Math.floor(Math.random() * avaialble_choices.length);

    if (check_for_best(avaialble_choices[r])) {
      best_move = avaialble_choices[r];
      break;
    }
    avaialble_choices.splice(r, 1);
  }

  if (best_move !== undefined) {
    last_move = best_move;

    let move_res = move(id, best_move);
    console.log(move_res);
    if (!move_res) console.log('heyyy');
    else setTimeout(next_move, 1000);
    return;
  }

  while (curr_avaialble_moves.length > 0) {
    r = Math.floor(Math.random() * curr_avaialble_moves.length);

    if (check_for_move(curr_avaialble_moves[r])) {
      best_move = curr_avaialble_moves[r];
      break;
    }

    curr_avaialble_moves.splice(r, 1);
  }

  if (best_move !== undefined) {
    last_move = best_move;
    if (!move(id, best_move)) clearInterval(my_game_timer);
    return;
  }

  let move_res = move(
    id,
    last_move === 'up'
      ? 'down'
      : last_move === 'down'
      ? 'up'
      : last_move === 'left'
      ? 'right'
      : 'left',
  );
  if (!move_res) console.log('heyyy');
  else setTimeout(next_move, 1000);
}
