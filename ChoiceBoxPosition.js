/*:
 * @target MZ
 * @plugindesc Lets you customize the X and Y position of the choice list window (Window_ChoiceList) in RPG Maker MZ.
 * @author SekiShiyo
 * @url https://github.com/SekiShiyo/RMMZ/edit/main/ChoiceBoxPosition.js
 * 
 * 
 * @param ChoiceX
 * @text Choice Window X
 * @desc X position of the choice window
 * @default 240
 * 
 * @param ChoiceY
 * @text Choice Window Y
 * @desc Y position of the choice window
 * @default 360
 */

(() => {
    const params = PluginManager.parameters("ChoiceBoxPosition");
    const choiceX = Number(params["ChoiceX"] || 240);
    const choiceY = Number(params["ChoiceY"] || 360);
  
    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
      _Window_ChoiceList_updatePlacement.call(this);
      this.x = choiceX;
      this.y = choiceY;
    };
  })();
  
