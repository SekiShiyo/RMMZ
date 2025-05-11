# Sit & Lie System for RMMZ
By **SekiShiyo**

This is a lightweight event-based system that allows the player to **sit on chairs** and **lie on beds** in RPG Maker MZ using region ID detection and interaction keys.

## 🎮 Features

- Sit on chairs by facing or standing on them (Region ID 3)
- Lie down on beds by facing or standing on them (Region ID 2)
- Toggle between sit/lie and stand by pressing the confirm key (Z/Enter/Space)
- Auto-lock player position while sitting/lying
- Fully event-based, **no plugin required**
- Of course you can change the ID and only use one of them..

---

## 📐 How to Use

1. **Create a Parallel Common Event** and paste the full script below
2. Paint your map tiles:
   - Use **Region 3** for chairs
   - Use **Region 2** for beds
3. Replace the character graphic names as needed:
   - `Sit_Player` → your sitting character sheet
   - `Lie_Player` → your lying down sheet
   - `Actor1` → your default standing character sheet

---

## 🧩 Script (Paste in Common Event)

```js
// See full script in repository
// https://github.com/SekiShiyo/RMMZ/SitLieSystem/README.md
