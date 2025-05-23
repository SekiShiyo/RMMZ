# 🎁 Seki's Gift System Plugin v1.3.6

**Gift System Plugin for RPG Maker MZ – Supports both Character Name and ID Triggering**

Developed by **SekiShiyo**, this plugin introduces an in-game gifting system where players can give items to NPCs. The system includes dynamic affection changes, custom responses, and visual dialogue using face graphics. It is fully compatible with UI layouts like `GridItem` which you can find in the other folder.

---

## 🌟 Features

* Start the gift interaction by **Character Name** or **Character ID**.
* Define characters’ **favorite, liked, and hated** items.
* Supports **customized face images, names, and response messages**.
* Fully **integrated affection system**, using variables to track relationship level.
* Compatible with **GridItem-style UIs** (you can find this in another folder in my github).
* Visual feedback after gifting, including **dialogue response and affection change report**.

---

## 🛠️ How to Use

### Plugin Commands

#### 1. `Gift`

Start the gifting process by entering the **character name** (case-sensitive or fuzzy match supported).

```yaml
@command Gift
@arg characterName
@type string
```

#### 2. `GiftById`

Trigger gift interaction using a predefined **character ID**.

```yaml
@command GiftById
@arg characterId
@type number
```

---

## ⚙️ Plugin Parameters

### `Characters` (Array of CharacterGift)

Configure each gift-receiving character:

* **Id**: Unique plugin ID for the character.
* **ActorId**: RPG Maker actor ID (used to fetch face/name).
* **FavorVariableId**: Game variable ID used for storing affection.
* **LoveItems**: Array of item IDs considered "loved".
* **LikeItems**: Array of item IDs considered "liked".
* **HateItems**: Array of item IDs considered "hated".
* **MessageLove/Like/Hate**: Custom responses based on gift type.
* **FaceName**: Face graphic filename (optional).
* **FaceIndex**: Face graphic index (0–7).
* **CharacterName**: Display name (optional override).

### `DefaultValues`

Set affection change values for each item type.

```yaml
LoveValue: +20
LikeValue: +10
HateValue: -10
```

---

## 🧩 Example Workflow

1. Add this plugin in Plugin Manager.
2. Configure characters and default values.
3. Call the `Gift` or `GiftById` plugin command in an event.
4. The player chooses an item to gift.
5. The character reacts with a customized message and face image.
6. The affection variable is automatically updated.
7. A second message shows the new affection value.

---

## 📁 Face Image & Name Priority

1. If `FaceName` is defined → use it.
2. If only `ActorId` is defined → pull from the actor.
3. If none → fallback to default image `"Actor1"` and name `"Character"`.

---

## 📌 Notes

* Only normal items (`itypeId === 1`) are allowed. Important/key items are excluded.
* The plugin filters and only shows items the player owns.
* Custom logic and compatibility with other inventory UI plugins can be added.

---

## 📷 Screenshot

*Not included – please test in-game for visual flow.*

---

## 📄 License

MIT License – Free to use and modify with attribution. 

---
