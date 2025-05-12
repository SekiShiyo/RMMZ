# DialogueTint Plugin v1.6 (RPG Maker MZ)

This RPG Maker MZ plugin changes the background color of the **message window** and **name box** based on the speaker's name.

---

## ✨ Features

- ✅ Change background color based on speaker name.
- ✅ Automatically hides name box background if no name is provided.
- ✅ **No white flash** when switching lines or closing the name box.
- ✅ Fully **preserves the default window skin** (`Window.png`) and its border style.
- ✅ Supports **semi-transparent RGBA** values.

---

## 📥 Installation

1. Download `DialogueTint_v1.6.js`.
2. Place it in your project's `js/plugins/` folder.
3. Open the Plugin Manager and enable **DialogueTint_v1.6**.
4. Configure the speaker-color mapping in the plugin parameters.

---

## 🔧 Plugin Parameters

### SpeakerColors

List of speaker configurations. Each entry includes:

- `name`: The exact name used in the "Name" field of the Show Text command.
- `color`: The background color in RGBA format, e.g., `rgba(255,0,0,0.4)`.

### DefaultColor

Color to use when no matching speaker name is found. Supports RGBA.

---

## 🧪 Example

If you configure:
```json
[
  { "name": "Rei", "color": "rgba(100,100,255,0.5)" },
  { "name": "Asuka", "color": "rgba(255,100,100,180)" }
]
```

Then when you use the "Show Text" command and set "Name" to `Rei`, the name window background will use a semi-transparent blue. If no name is set, the name box will be hidden.

---

## 🧠 Notes

- This plugin works with **all default and custom window skins**.
- It ensures compatibility by cleaning the system `contentsBack` layer to prevent the flash.
- You can combine this with other UI plugins if needed.

---

## 🧑‍💻 Author

Plugin by **SekiShiyo**

MIT License | RPG Maker MZ Plugin
