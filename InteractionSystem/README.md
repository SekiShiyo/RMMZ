# Lifestyle Interaction System for RPG Maker MZ
By **SekiShiyo**

A lightweight modular interaction system that adds immersive behavior to your game:
🪑 Sit on chairs, 🛏️ Lie on beds, and 🌊 Swim through water!

No plugins required — all logic is event-based and easy to install.

---

## ✨ Features

| Action | Trigger Region | Behavior |
|--------|----------------|----------|
| Sit    | Region 3       | Face chair and press OK to sit down. Press again to stand and return. |
| Lie    | Region 2       | Stand on or face a bed and press OK to lie down. Press again to stand and return. |
| Swim   | Region 1       | Enter water tile to switch to swimming graphic, exit to return to normal. |

(OF course you can change the region, as region is in the Tile R Section.)
---

## 📦 Installation

1. Add a **Parallel Common Event** and copy code from `SitLieSystem.js`
2. Add a **Parallel Event** on each map with water, using `SwimSystem.js`
3. Assign Region IDs:
   - `1` → water/swimming areas
   - `2` → beds (lying)
   - `3` → chairs (sitting)
4. Replace graphic file names as needed:
   - `Sit_Player`, `Lie_Player`, `Swim_Player`, `Actor1`

---

## 📸 Demos

| Sit / Lie / Swim |
|------------------|
| ![](InteractionSystem/copy_58CF73E1-00F6-4CD0-8F0A-810623F1E16F.GIF)|

---

## 🧑‍💻 Author

Created with pixel love by **SekiShiyo**  
Twitter / GitHub: [@sekishiyo](https://github.com/SekiShiyo)

---

## 📄 License

MIT License — Free to use in personal and commercial RPG Maker projects.  
Credit appreciated but not required. Enjoy!
