# Lifestyle Interaction System for RPG Maker MZ  
**By SekiShiyo**

A lightweight, event-based system that adds three immersive player behaviors to your RPG Maker MZ game:

- 🪑 **Sit** on chairs (Region 3)  
- 🛏️ **Lie** on beds (Region 2)  
- 🌊 **Swim** in water (Region 1)  

Everything is automatic and no external plugin is required—just drop in a single Parallel Common Event.

---

## ✨ Features

| Action | Region ID | Trigger                                                                 | Behavior                                                                                  |
|:------:|:---------:|:------------------------------------------------------------------------|:------------------------------------------------------------------------------------------|
| **Sit** | 3         | Stand on or face a chair-tile and press **OK**                          | Walk onto the chair (if needed), switch to `$<Outfit>_Sit` sprite, lock position, OK to stand back. |
| **Lie** | 2         | Stand on or face a bed-tile and press **OK**                            | Walk onto the bed (if needed), switch to `$<Outfit>_Lie` sprite, lock position, OK to stand back. |
| **Swim**| 1         | Enter a water-tile                                                        | Automatically switch to `$<Outfit>_Swim` sprite and slower move speed; exit to revert.    |

---

## 📁 Installation

1. **Create one Parallel Common Event**  
   - In your database → Common Events → New  
   - Trigger: **Parallel**  
   - Priority: Below Characters  
   - Paste the full **Sit–Lie–Swim** script (see below).

2. **Paint your map tiles**  
   - Region 1 → water (swim)  
   - Region 2 → bed (lie)  
   - Region 3 → chair (sit)

3. **Prepare your character sheets**  
   - Use single-character sheets with a `$` prefix:  
     - `$<Outfit>_A.png`     — standing frames  
     - `$<Outfit>_Sit.png`   — sitting frames  
     - `$<Outfit>_Lie.png`   — lying frames  
     - `$<Outfit>_Swim.png`  — swimming frames  
   - Example:  
     ```
     $Uniform_A.png     → standing in Uniform  
     $Uniform_Sit.png   → sitting in Uniform  
     $Uniform_Lie.png   → lying in Uniform  
     $Uniform_Swim.png  → swimming in Uniform  
     ```

4. **Variables used (you can reassign if needed)**  
   - `#2`  → sitting state (0 = no, 1 = yes)  
   - `#3,4` → sit position X/Y  
   - `#5,6` → origin position X/Y  
   - `#10` → lying state (0 = no, 1 = yes)  
   - `#11,12` → lie position X/Y  
   - `#13,14` → origin position X/Y  
   - `#20` → swimming state (0 = no, 1 = yes)

---

## 📜 Full Script

```js
(() => {
  // —— Helpers —— //
  const getOutfitPrefix = () => {
    const n = $gamePlayer._characterName;
    const m = n.match(/^\$?(.+?)_/);
    return m ? m[1] : n.replace(/^\$/, "").split("_")[0];
  };
  const prefix   = getOutfitPrefix;
  const getStand = () => "$" + prefix() + "_A";
  const getSit   = () => "$" + prefix() + "_Sit";
  const getLie   = () => "$" + prefix() + "_Lie";
  const getSwim  = () => "$" + prefix() + "_Swim";

  // —— States —— //
  let sitting  = $gameVariables.value(2);
  let lying    = $gameVariables.value(10);
  let swimming = $gameVariables.value(20);

  // —— Player & Map Info —— //
  const dir  = $gamePlayer.direction();
  const x    = $gamePlayer.x;
  const y    = $gamePlayer.y;
  let dx = 0, dy = 0;
  if (dir === 2) dy = 1;
  if (dir === 4) dx = -1;
  if (dir === 6) dx = 1;
  if (dir === 8) dy = -1;
  const fx    = x + dx;
  const fy    = y + dy;
  const here  = $gameMap.regionId(x,  y);
  const front = $gameMap.regionId(fx, fy);

  // —— Reset on Leaving —— //
  if (sitting && !(here === 3 || front === 3)) {
    $gameVariables.setValue(2, 0);
    $gamePlayer.setImage(getStand(), 0);
    sitting = 0;
  }
  if (lying && !(here === 2 || front === 2)) {
    $gameVariables.setValue(10, 0);
    $gamePlayer.setImage(getStand(), 0);
    lying = 0;
  }

  // —— Sit (Region 3) —— //
  if (!sitting && (here === 3 || front === 3) && Input.isTriggered("ok")) {
    const tx = here === 3 ? x : fx;
    const ty = here === 3 ? y : fy;
    $gamePlayer.setDirection(dir);
    if (here !== 3) $gamePlayer.moveStraight(dir);
    setTimeout(() => {
      $gamePlayer.setImage(getSit(), 0);
      $gameVariables.setValue(2, 1);
      $gameVariables.setValue(3, tx);
      $gameVariables.setValue(4, ty);
      $gameVariables.setValue(5, x);
      $gameVariables.setValue(6, y);
    }, 100);
    return;
  }
  if (sitting) {
    if ($gamePlayer.x !== $gameVariables.value(3) ||
        $gamePlayer.y !== $gameVariables.value(4)) {
      $gamePlayer.locate($gameVariables.value(3), $gameVariables.value(4));
    }
    if (Input.isTriggered("ok")) {
      $gamePlayer.setImage(getStand(), 0);
      $gamePlayer.locate(
        $gameVariables.value(5),
        $gameVariables.value(6)
      );
      $gameVariables.setValue(2, 0);
    }
    return;
  }

  // —— Lie (Region 2) —— //
  if (!lying && (here === 2 || front === 2) && Input.isTriggered("ok")) {
    const tx = here === 2 ? x : fx;
    const ty = here === 2 ? y : fy;
    $gamePlayer.setDirection(dir);
    if (here !== 2) $gamePlayer.moveStraight(dir);
    setTimeout(() => {
      $gamePlayer.setImage(getLie(), 0);
      $gameVariables.setValue(10, 1);
      $gameVariables.setValue(11, tx);
      $gameVariables.setValue(12, ty);
      $gameVariables.setValue(13, x);
      $gameVariables.setValue(14, y);
    }, 100);
    return;
  }
  if (lying) {
    if ($gamePlayer.x !== $gameVariables.value(11) ||
        $gamePlayer.y !== $gameVariables.value(12)) {
      $gamePlayer.locate($gameVariables.value(11), $gameVariables.value(12));
    }
    if (Input.isTriggered("ok")) {
      $gamePlayer.setImage(getStand(), 0);
      $gamePlayer.locate(
        $gameVariables.value(13),
        $gameVariables.value(14)
      );
      $gameVariables.setValue(10, 0);
    }
    return;
  }

  // —— Swim (Region 1) —— //
  if (!swimming && here === 1) {
    $gamePlayer.setImage(getSwim(), 0);
    $gamePlayer.setMoveSpeed(4);
    $gameVariables.setValue(20, 1);
  } else if (swimming && here !== 1) {
    $gamePlayer.setImage(getStand(), 0);
    $gamePlayer.setMoveSpeed(5);
    $gameVariables.setValue(20, 0);
  }
})();
