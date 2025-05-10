/*:
 * @target MZ
 * @plugindesc A plugin that allows customization of the background color for unselected choices in dialogue options
 * @author Seki
 * 
 * @param BackgroundColor
 * @text Background Color for Unselected Items
 * @desc Set the background color for unselected items. You can use HTML/CSS color values like #ffffff or rgba(255,255,255,1)
 * @default rgba(255, 255, 255, 1)
 * 
 * @help
 * This plugin allows you to customize the background color of unselected choices in the dialogue window.
 * By default, RPG Maker MZ uses a gray color for unselected choices.
 * You can freely change the color using the plugin parameter "Background Color for Unselected Items" without modifying the code.
 */

(() => {
  const parameters = PluginManager.parameters("NonSelectedChoiceBG"); // Plugin name must match your file name
  const bgColor = parameters["BackgroundColor"] || "rgba(255, 255, 255, 1)";

  Window_Selectable.prototype.drawBackgroundRect = function(rect) {
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contentsBack.fillRect(x, y, w, h, bgColor);
  };
})();
