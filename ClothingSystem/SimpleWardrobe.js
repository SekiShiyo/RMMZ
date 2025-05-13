/*:
 * @target MZ
 * @plugindesc ♣ Simple Wardrobe System · Native Window UI (3×4 single‐character sheets, preview cell 1–9 + preload)
 * @author SekiShiyo
 *
 * @param clothes
 * @text Wardrobe Clothing List
 * @type struct<Cloth>[]
 * @default []
 *
 * @command OpenWardrobe
 * @text Open Wardrobe
 * @desc Open the wardrobe window to select and apply an outfit.
 */

/*~struct~Cloth:
 * @param name
 * @text Display Name
 * @type text
 * @desc The name shown in the list.
 *
 * @param imageName
 * @text Character Sheet Filename
 * @type text
 * @desc Filename under img/characters (must include `$` prefix) of the 3×4 single‐character sheet.
 *
 * @param previewCell
 * @text Preview Cell Index
 * @type number
 * @min 1
 * @max 9
 * @desc Which cell (1–9 in a 3×3 grid) to show as the preview.
 */

(() => {
  const pluginName = document.currentScript.src
    .split('/')
    .pop()
    .replace(/\.js$/, '');
  const params = PluginManager.parameters(pluginName);
  const raw    = JSON.parse(params['clothes'] || '[]');
  const CLOTHES = raw.map(s => JSON.parse(s));

  // Register plugin command: Open Wardrobe
  PluginManager.registerCommand(pluginName, 'OpenWardrobe', () => {
    SceneManager.push(Scene_Wardrobe);
  });

  // Hook to persist outfit across maps
  const _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    _Game_Player_refresh.call(this);
    const sys  = $gameSystem;
    const name = sys._clothingName || $gameParty.leader().characterName();
    this.setImage(name, 0);
    this._followers.refresh();
  };

  // Scene: Wardrobe selection
  class Scene_Wardrobe extends Scene_MenuBase {
    create() {
      super.create();
      this.createWindowLayer();
      this.createWardrobeWindow();
    }

    createWardrobeWindow() {
      const ww = Graphics.boxWidth * 0.8;
      const wh = Graphics.boxHeight * 0.6;
      const wx = (Graphics.boxWidth - ww) / 2;
      const wy = (Graphics.boxHeight - wh) / 2;
      const rect = new Rectangle(wx, wy, ww, wh);
      this._window = new Window_Wardrobe(rect, CLOTHES);
      this._window.setHandler('ok',     this.onOk.bind(this));
      this._window.setHandler('cancel', this.popScene.bind(this));
      this.addWindow(this._window);
      this._window.activate();
    }

    onOk() {
      const item = this._window.item();
      $gameSystem._clothingName = item.imageName;
      $gamePlayer.setImage(item.imageName, 0);
      $gamePlayer.refresh();
      this.popScene();
    }
  }
  window.Scene_Wardrobe = Scene_Wardrobe;

  // Window: Wardrobe list with previews
  class Window_Wardrobe extends Window_Selectable {
    constructor(rect, data) {
      super(rect);
      this._data = data;
      this._loadedCount = 0;
      // Preload all character sheets
      this._data.forEach(item => {
        const bmp = ImageManager.loadCharacter(item.imageName);
        bmp.addLoadListener(() => {
          this._loadedCount++;
          if (this._loadedCount >= this._data.length) {
            this.refresh();
          }
        });
      });
      this.refresh();
      this.select(0);
    }

    maxItems() { return this._data.length; }
    item()     { return this._data[this.index()]; }
    itemHeight() {
      return Math.max(48 + this.itemPadding() * 2, this.lineHeight());
    }

    drawItem(index) {
      const item = this._data[index];
      const rect = this.itemLineRect(index);
      const pad  = this.itemPadding();

      // Draw preview cell from the character sheet
      const bmp  = ImageManager.loadCharacter(item.imageName);
      const cell = Number(item.previewCell) - 1;
      const cols = 3;
      const sw   = 48;
      const sh   = 48;
      const sx   = (cell % cols) * sw;
      const sy   = Math.floor(cell / cols) * sh;
      const dx   = rect.x + pad;
      const dy   = rect.y + pad;
      this.contents.blt(bmp, sx, sy, sw, sh, dx, dy, sw, sh);

      // Draw name text
      const textX = dx + sw + pad;
      const textY = dy;
      const textW = rect.width - sw - pad * 2;
      this.resetTextColor();
      this.drawText(item.name, textX, textY, textW);
    }
  }
  window.Window_Wardrobe = Window_Wardrobe;
})();
