# ClothingSystem Plugin Suite for RPG Maker MZ

This project offers **two versions** of the ClothingSystem plugin:

1. **Basic Version** (`SimpleWardrobe.js`) - Outfit selection and persistent sprite swapping.
2. **Extended Version** (`Change_Cloth_with_Face_and_action.js`) - Includes all Basic features, **plus** dynamic dialogue face swapping.

---

## 1. Basic Version: SimpleWardrobe.js

### Features

* **Native Window UI**: Displays a wardrobe list with 48×48 previews from a 3×4 character sprite.
* **Persistent Outfit**: Selected outfit persists across map transfers, saves, and loads.

### Installation

1. Copy `SimpleWardrobe.js` into your project's `js/plugins/` folder.
2. Open the Plugin Manager and enable **SimpleWardrobe**.

### Parameters (`clothes`)

An array of outfit entries:

| Field         | Type   | Example   | Description                                       |
| ------------- | ------ | --------- | ------------------------------------------------- |
| `name`        | text   | `Casual`  | Label shown in the wardrobe list.                 |
| `imageName`   | text   | `$Casual` | Filename in `img/characters` (include `$`).       |
| `previewCell` | number | `2`       | Which 48×48 cell (1–12) to preview (top-left 3×4). |

### Usage

1. Create a map event and add the Plugin Command:

   ```
   Plugin: SimpleWardrobe
   Command: OpenWardrobe
   ```
2. During play, trigger the event to open the wardrobe, select an outfit, and the player sprite updates immediately.

---

## 2. Extended Version: Change_Cloth_with_Face_and_action.js

### Additional Features

* **Dialogue Face Swapping**: Automatically replace the Show Text face image for a specified speaker name when wearing an outfit.

### Installation

1. Copy `Change_Cloth_with_Face_and_action.js` into `js/plugins/`.
2. Enable **Change_Cloth_with_Face_and_action** in the Plugin Manager.

### Parameters (`clothes`)

An array of entries combining outfit and face mapping:

| Field         | Type   | Example      | Description                                                         |
| ------------- | ------ | ------------ | ------------------------------------------------------------------- |
| `name`        | text   | `Casual`     | Label shown in the wardrobe list.                                   |
| `imageName`   | text   | `$Casual`    | Character sprite filename in `img/characters` (include `$`).        |
| `previewCell` | number | `2`          | Preview cell index (1–12) from the top-left 3×4 of the sprite.       |
| `actorName`   | text   | `Hero`       | Show Text → Name field to match for face swapping.                  |
| `faceName`    | text   | `CasualFace` | Filename in `img/faces` (no extension) to use as the dialogue face. |
| `faceIndex`   | number | `0`          | (Optional) Cell index in a 4×N face sheet; default `0`.             |

### Usage

1. Place a map event and add the Plugin Command:

   ```
   Plugin: Change_Cloth_with_Face_and_action
   Command: OpenWardrobe
   ```
2. In your Show Text commands for the specified `actorName`, the face image will automatically switch to the `faceName`/`faceIndex` configured for the current outfit.

---

## Notes

* You can enable **both** versions side by side, but typically you would only use one.
* The Basic and Extended versions **share** the same `clothes` parameter structure, but Extended packs extra fields (`actorName`, `faceName`, `faceIndex`).
* Make sure your filenames and actor names match exactly (case-sensitive) in the Plugin Manager.

Enjoy seamless outfit and dialogue face customization! Feel free to rename the plugin files if needed to avoid conflicts.
