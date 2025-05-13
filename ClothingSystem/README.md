# Simple Wardrobe Plugin for RPG Maker MZ  
**By SekiShiyo**

A lightweight, native Window-based outfit‐changing system for RPG Maker MZ.  
Supports any number of single‐character 3×4 spritesheets (with `$` prefix) and previews a selected cell in the wardrobe list.

---

## 📌 Features

- **Outfit List**: Define as many garments as you like via plugin parameters.  
- **Live Preview**: Shows a 48×48 cell preview (1–9) from each spritesheet.  
- **Persistent Change**: The player’s character graphic updates immediately and persists across map transfers.  
- **Native UI**: Uses a custom `Window_Selectable` wardrobe interface—no extra UI plugins required.

---

## ⚙️ Installation

1. **Place the .js file**  
   Copy `SimpleWardrobe.js` into your project’s `js/plugins/` folder.  

2. **Enable the plugin**  
   In the Plugin Manager, add “Simple Wardrobe” and make sure it’s turned ON.

3. **Configure outfits**  
   - Open the plugin’s parameters.  
   - Click **Add** to create entries in **Clothes**.  
   - For each entry:  
     - **Name**: the display text (e.g. “Casual Wear”).  
     - **ImageName**: the filename of your 3×4 single‐character spritesheet (include the `$` prefix, e.g. `$Casual_A`).  
     - **PreviewCell**: a number 1–12 indicating which cell (3 columns × 4 rows) to show in the list preview.

4. **Prepare your sprite files**  
   Place your `.png` sheets under `img/characters/`. Filenames must include `$` and follow your chosen naming convention.

---

## 🚪 Usage

- **Open the Wardrobe**  
  Call the plugin command **OpenWardrobe** (via event “Plugin Command → Simple Wardrobe → OpenWardrobe”) to display the outfit selection window.

- **Select & Apply**  
  - Navigate the list with Arrow keys.  
  - Press **OK** to equip the highlighted outfit and close the scene.  
  - Press **Cancel** to exit without changes.

---

## 🧩 Plugin Commands

| Command       | Description                            |
|---------------|----------------------------------------|
| OpenWardrobe  | Opens the wardrobe selection window.   |

---

## 🔧 Technical Notes

- **Character Refresh Hook**  
  Overrides `Game_Player.refresh()` to re‐apply the last chosen spritesheet on map load.  
- **Persistent Storage**  
  Stores the active outfit in `$gameSystem._clothingName` so it keeps applied across scenes and saves.  
- **Preview Loading**  
  Automatically preloads each character sheet so the preview grid is fully rendered on first open.

---

## 🎨 Example Configuration

| Name         | ImageName      | PreviewCell |
|--------------|----------------|-------------|
| Casual Wear  | `$Casual_A`    | 5           |
| Uniform      | `$Uniform_A`   | 1           |
| Swim Suit    | `$Swimsuit_A`  | 3           |

---

## 📄 License

MIT License — free for personal and commercial use. Attribution appreciated.  
