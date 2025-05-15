# DialogueTint Plugin v1.7 (RPG Maker MZ)
Author: SekiShiyo


This RPG Maker MZ plugin changes the background color of the **message window** and **name box** and **choices box** based on the speaker's name.


⸻

✨ Features

🎨 Automatically changes the background color of:
	•	Message Window
	•	Name Box
	•	Choice Box

🧠 Based on the speaker name set in the “Show Text” event command.

✅ Stable and safe:
	•	No white flash or residual artifacts
	•	Fully compatible with default window skins and borders
	•	Works across maps and multi-event chains
	•	Supports custom RGBA color formats with or without decimal transparency

⸻

🔧 Plugin Parameters

Parameter	Type	Description
SpeakerColors	Array of Speaker + RGBA	Set a background color for each speaker name
DefaultColor	RGBA string	Fallback color if no speaker name matches


⸻

🎨 Color Format
	•	Accepts both:
	•	rgba(100,100,255,0.4) ← standard CSS
	•	rgba(255,100,100,180) ← alpha over 1 will auto-convert to 0~1

⸻

📦 Example Configuration

[
  { "name": "绫波丽", "color": "rgba(100,100,255,180)" },
  { "name": "明日香", "color": "rgba(255,100,100,180)" },
  { "name": "渚薰",   "color": "rgba(180,180,255,160)" }
]

Speaker names must exactly match what’s entered in the “Name” field of Show Text commands.

⸻

🧪 What This Plugin Does

Window Type	Behavior
Message	Background color changes based on speaker
NameBox	Color synced with speaker, auto-hides when speaker name is empty
ChoiceList	Background color matches current speaker, item highlight removed


⸻

🆕 v1.6 Update Notes

New in this version:

✅ Added support for Choice Window:
	•	Matches background color with speaker name
	•	Removes the default highlight background from each choice option
	•	Keeps selected item visible via default skin border or custom underline

✅ Enhanced Name Window stability:
	•	No longer leaves residual background when name changes
	•	No visual glitch when switching maps rapidly

⸻

🗂 Use Case Example

Event Command → Show Text

Name: 绫波丽
Text: “欢迎回来。”

✅ The message window, name window, and following choice window will all use 绫波丽’s configured background color.

⸻

🔌 Installation
	1.	Place SpeakerWindowColor.js in your project’s /js/plugins/ folder
	2.	Enable it in Plugin Manager
	3.	Configure parameters in the UI

⸻

📎 Compatibility
	•	Designed for RPG Maker MZ
	•	Fully compatible with other message-enhancing plugins (as long as they don’t overwrite Window_Message, Window_NameBox, or Window_ChoiceList)

⸻

📮 Credits
	•	Plugin by @SekiShiyo
	•	Special thanks to players testing EVA-themed emotional RPG scenarios 💙

⸻
