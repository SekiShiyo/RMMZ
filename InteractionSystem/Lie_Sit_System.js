const dir = $gamePlayer.direction();
const x = $gamePlayer.x;
const y = $gamePlayer.y;
let dx = 0, dy = 0;
if (dir === 2) dy = 1;
if (dir === 4) dx = -1;
if (dir === 6) dx = 1;
if (dir === 8) dy = -1;

const fx = x + dx;
const fy = y + dy;
const here = $gameMap.regionId(x, y);
const front = $gameMap.regionId(fx, fy);

// --------------------【Sit】--------------------
const isSitting = $gameVariables.value(2);
const canSit = (here === 3 || front === 3);

if (canSit && isSitting === 0 && Input.isTriggered("ok")) {
  const tx = here === 3 ? x : fx;
  const ty = here === 3 ? y : fy;

  $gamePlayer.setDirection(dir);
  if (here !== 3) {
    $gamePlayer.moveStraight(dir);  // Move to the chair
  }

  setTimeout(() => {
    $gamePlayer.setImage("Sit_Player", 0);      // replaced by the sitting pic
    $gameVariables.setValue(2, 1);
    $gameVariables.setValue(3, tx);             // sitting position
    $gameVariables.setValue(4, ty);
    $gameVariables.setValue(5, x);              // go back when you stand up
    $gameVariables.setValue(6, y);
  }, 100);
}

if (isSitting === 1) {
  if ($gamePlayer.x !== $gameVariables.value(3) || $gamePlayer.y !== $gameVariables.value(4)) {
    $gamePlayer.locate($gameVariables.value(3), $gameVariables.value(4));
  }

  if (Input.isTriggered("ok")) {
    $gamePlayer.setImage("Actor1", 0);          // replaced by standing pic
    $gamePlayer.locate($gameVariables.value(5), $gameVariables.value(6));
    $gameVariables.setValue(2, 0);
  }
}

// --------------------【Lie】--------------------
const isLying = $gameVariables.value(10);
const canLie = (here === 2 || front === 2);

if (canLie && isLying === 0 && Input.isTriggered("ok")) {
  const tx = here === 2 ? x : fx;
  const ty = here === 2 ? y : fy;

  $gamePlayer.setDirection(dir);
  if (here !== 2) {
    $gamePlayer.moveStraight(dir);  // go to the bed
  }

  setTimeout(() => {
    $gamePlayer.setImage("Lie_Player", 0);      // replaced by lying pic
    $gameVariables.setValue(10, 1);
    $gameVariables.setValue(11, tx);            // lying position
    $gameVariables.setValue(12, ty);
    $gameVariables.setValue(13, x);             // go back when you stand up
    $gameVariables.setValue(14, y);
  }, 100);
}

if (isLying === 1) {
  if ($gamePlayer.x !== $gameVariables.value(11) || $gamePlayer.y !== $gameVariables.value(12)) {
    $gamePlayer.locate($gameVariables.value(11), $gameVariables.value(12));
  }

  if (Input.isTriggered("ok")) {
    $gamePlayer.setImage("Actor1", 0);          // replced by standing pic
    $gamePlayer.locate($gameVariables.value(13), $gameVariables.value(14));
    $gameVariables.setValue(10, 0);
  }
}
