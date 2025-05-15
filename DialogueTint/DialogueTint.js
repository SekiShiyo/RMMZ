/*:
 * @target MZ
 * @plugindesc Speaker-based message and name box and name box background color v1.7 (no flash, preserves skin) by SekiShiyo
 * @author SekiShiyo
 * @url https://github.com/SekiShiyo/RMMZ/edit/main/DialogueTint/DialogueTint.js
 * @param SpeakerColors
 * @text Speaker Color Config
 * @type struct<ColorConfig>[]
 * @desc Set background colors for specific speakers
 *
 * @param DefaultColor
 * @text Default Background Color
 * @type string
 * @default rgba(0,0,0,0.3)
 * @desc Used when no speaker name matches; supports transparency
 *
 * @help
 * ✅ Keeps default window skin and border
 * ✅ Prevents white flash on name window open/close
 * ✅ Auto-hides background if no speaker name is shown
 */

/*~struct~ColorConfig:
 * @param name
 * @text Speaker Name
 * @type string
 *
 * @param color
 * @text Background Color (RGBA)
 * @type string
 * @default rgba(0,0,0,180)
 */

(() => {
    const pluginName = "SpeakerWindowColor";
    const params = PluginManager.parameters(pluginName);
  
    const colorConfigs = JSON.parse(params["SpeakerColors"] || "[]").map(str => {
      const obj = JSON.parse(str);
      return { name: obj.name, color: obj.color };
    });
    const defaultColor = params["DefaultColor"] || "rgba(0,0,0,0.3)";
  
    function parseCssColor(text) {
      const vals = text.replace(/\s+/g, "").replace(/^rgba?\(/i, "").replace(/\)$/, "").split(",");
      if (vals.length >= 3) {
        const r = parseInt(vals[0]);
        const g = parseInt(vals[1]);
        const b = parseInt(vals[2]);
        let a = parseFloat(vals[3] ?? "255");
        if (a > 1) a = a / 255;
        return `rgba(${r},${g},${b},${a.toFixed(3)})`;
      }
      return text;
    }
  
    // ✅ Message window background
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
      const name = $gameMessage.speakerName();
      const match = colorConfigs.find(cfg => cfg.name === name);
      const color = match ? parseCssColor(match.color) : parseCssColor(defaultColor);
  
      if (!this._customBgSprite) {
        this._customBgSprite = new Sprite(new Bitmap(this.width, this.height));
        this._customBgSprite.z = -1;
        this.addChildToBack(this._customBgSprite);
      }
  
      const bmp = this._customBgSprite.bitmap;
      bmp.resize(this.width, this.height);
      bmp.clear();
      bmp.fillRect(0, 0, this.width, this.height, color);
  
      _Window_Message_startMessage.call(this);
    };
  
    // ✅ Name box with no flash and window skin
    const _Window_NameBox_start = Window_NameBox.prototype.start;
    Window_NameBox.prototype.start = function () {
      const name = $gameMessage.speakerName();
      const showBg = name && name.trim();
      this._lastSpeakerName = name;
  
      if (this._customNameBg) {
        this.removeChild(this._customNameBg);
        this._customNameBg.destroy();
        this._customNameBg = null;
      }
  
      _Window_NameBox_start.call(this); // ← run system layout first
  
      if (showBg && this.width > 0 && this.height > 0) {
        const match = colorConfigs.find(cfg => cfg.name === name);
        const color = match ? parseCssColor(match.color) : parseCssColor(defaultColor);
  
        const bmp = new Bitmap(this.width, this.height);
        bmp.fillRect(0, 0, this.width, this.height, color);
        this._customNameBg = new Sprite(bmp);
        this._customNameBg.z = -2;
        this.addChildToBack(this._customNameBg);
      }
  
      if (this.contentsBack) {
        this.contentsBack.clear(); // 💡 prevent flashing system white bg
      }
    };
    // ✅ Choice list background color + remove item highlight
const _Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function () {
  _Window_ChoiceList_start.call(this);

  const name = $gameMessage.speakerName();
  const match = colorConfigs.find(cfg => cfg.name === name);
  const color = match ? parseCssColor(match.color) : parseCssColor(defaultColor);

  // ✅ choice background color
  if (!this._customChoiceBg) {
    this._customChoiceBg = new Sprite(new Bitmap(this.width, this.height));
    this._customChoiceBg.z = -1;
    this.addChildToBack(this._customChoiceBg);
  }

  const bmp = this._customChoiceBg.bitmap;
  bmp.resize(this.width, this.height);
  bmp.clear();
  bmp.fillRect(0, 0, this.width, this.height, color);
};

// ✅ choice original color removed
Window_ChoiceList.prototype.drawItemBackground = function(index) {
  
};
  })();
