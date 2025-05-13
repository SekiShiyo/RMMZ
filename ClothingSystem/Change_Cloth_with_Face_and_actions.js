/*:
 * @target MZ
 * @plugindesc ♣ Simple Outfit & Dialogue Face Switcher (Native Window UI) v1.0
 * @author SekiShiyo
 *
 * @param clothes
 * @text Wardrobe & Face Map
 * @type struct<Outfit>[]
 * @default []
 * @url https://github.com/SekiShiyo/RMMZ/new/main/ClothingSystem/Change_Cloth_with_Face_and_actions.js
 * 
 * @command OpenWardrobe
 * @text Open Wardrobe
 * @desc Show the wardrobe window to pick an outfit and swap dialogue faces.
 */

/*~struct~Outfit:
 * @param name
 * @text Display Name
 * @type text
 * @desc Label shown in the wardrobe list.
 *
 * @param imageName
 * @text Character Sprite
 * @type text
 * @desc Filename in img/characters (include leading $, 3×4 single sprite).
 *
 * @param previewCell
 * @text Preview Cell
 * @type number
 * @min 1
 * @max 9
 * @desc Which 48×48 cell (from 3×3 top-left) to show as preview.
 *
 * @param actorName
 * @text Dialogue Speaker
 * @type text
 * @desc Name used in “Show Text” → Speaker field to trigger face swap.
 *
 * @param faceName
 * @text Replacement Face
 * @type text
 * @desc Filename in img/faces (no extension). Cell 0 used by default.
 *
 * @param faceIndex
 * @text Face Index
 * @type number
 * @min 0
 * @desc (Optional) Which cell in a 4×n face sheet to use; default = 0.
 */

(() => {
  const pluginName = document.currentScript.src.split('/').pop().replace(/\.js$/, '');
  const params     = PluginManager.parameters(pluginName);
  const CLOTHES    = JSON.parse(params.clothes || '[]').map(s => JSON.parse(s));

  // Plugin Command: OpenWardrobe
  PluginManager.registerCommand(pluginName, 'OpenWardrobe', () => {
    SceneManager.push(Scene_Wardrobe);
  });

  // Hook Game_Player.refresh to persistently apply selected outfit
  const _GP_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    const sys   = $gameSystem;
    const actor = $gameParty.leader();
    const name  = sys._clothingName || actor.characterName();
    this.setImage(name, 0);
    this._followers.refresh();
  };

  // Hook Message.faceName/index to swap when speaker matches
  const _GM_faceName  = Game_Message.prototype.faceName;
  const _GM_faceIndex = Game_Message.prototype.faceIndex;
  Game_Message.prototype.faceName = function() {
    const orig    = _GM_faceName.call(this);
    const speaker = this.speakerName();
    const kit     = CLOTHES.find(c =>
      c.imageName === $gameSystem._clothingName && c.actorName === speaker
    );
    return kit && kit.faceName ? kit.faceName : orig;
  };
  Game_Message.prototype.faceIndex = function() {
    const orig    = _GM_faceIndex.call(this);
    const speaker = this.speakerName();
    const kit     = CLOTHES.find(c =>
      c.imageName === $gameSystem._clothingName && c.actorName === speaker
    );
    return kit && kit.faceIndex != null ? Number(kit.faceIndex) : orig;
  };

  // Scene: Wardrobe Window
  class Scene_Wardrobe extends Scene_MenuBase {
    create() {
      super.create();
      this.createWindowLayer();
      this.createWardrobeWindow();
    }
    createWardrobeWindow() {
      const ww   = Graphics.boxWidth * 0.8;
      const wh   = Graphics.boxHeight * 0.6;
      const wx   = (Graphics.boxWidth - ww) / 2;
      const wy   = (Graphics.boxHeight - wh) / 2;
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

  // Window: Wardrobe List + Preview
  class Window_Wardrobe extends Window_Selectable {
    constructor(rect, data) {
      super(rect);
      this._data        = data;
      this._loadedCount = 0;
      data.forEach(i => {
        const bmp = ImageManager.loadCharacter(i.imageName);
        bmp.addLoadListener(() => {
          if (++this._loadedCount >= data.length) this.refresh();
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
      const it   = this._data[index];
      const r    = this.itemLineRect(index);
      const pad  = this.itemPadding();
      const bmp  = ImageManager.loadCharacter(it.imageName);
      const cell = Number(it.previewCell) - 1;
      const sw   = 48, sh = 48;
      const sx   = (cell % 3) * sw;
      const sy   = Math.floor(cell / 3) * sh;
      const dx   = r.x + pad;
      const dy   = r.y + pad;
      this.contents.blt(bmp, sx, sy, sw, sh, dx, dy, sw, sh);
      this.resetTextColor();
      this.drawText(it.name, dx + sw + pad, dy, r.width - sw - pad * 2);
    }
  }
  window.Window_Wardrobe = Window_Wardrobe;
})();
