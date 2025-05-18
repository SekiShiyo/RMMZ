/*:
 * @target MZ
 * @plugindesc Adjusts the position of the message pause sign (the down arrow).
 * @author SekiShiyo
 * @url https://github.com/SekiShiyo/RMMZ/new/main/MessagePauseSignPosition.js
 * 
 * @param xOffset
 * @text X Offset
 * @desc Horizontal offset for the pause sign (positive = right, negative = left)
 * @default 0
 * @type number
 * @min -500
 * @max 500
 *
 * @param yOffset
 * @text Y Offset
 * @desc Vertical offset for the pause sign (positive = down, negative = up)
 * @default -10
 * @type number
 * @min -500
 * @max 500
 *
 * @help
 * ============================================================================
 * [Plugin Name] MessagePauseSignPosition
 * ============================================================================
 * Author: SekiShiyo
 *
 * This plugin allows you to adjust the position of the message window's pause sign,
 * which is the small down arrow that appears when the message is waiting for input.
 *
 * ▶ How to Use:
 * Install and activate the plugin in the Plugin Manager.
 * Configure the `xOffset` and `yOffset` parameters to reposition the arrow.
 *
 * ▶ Example Use Cases:
 * - Move the arrow away from custom background images or speaker portraits
 * - Align the pause sign with modified window positions or designs
 *
 * ▶ Compatibility:
 * This plugin overrides the `_refreshPauseSign()` function of Window. It is designed
 * to be lightweight and should be compatible with most UI modifications unless other
 * plugins also override this method directly.
 *
 * ============================================================================
 */

(() => {
    const pluginName = "MessagePauseSignPosition";
    const parameters = PluginManager.parameters(pluginName);
    const xOffset = Number(parameters['xOffset'] || 0);
    const yOffset = Number(parameters['yOffset'] || -10);

    const _Window__refreshPauseSign = Window.prototype._refreshPauseSign;
    Window.prototype._refreshPauseSign = function() {
        _Window__refreshPauseSign.call(this);
        this._pauseSignSprite.x += xOffset;
        this._pauseSignSprite.y += yOffset;
    };
})();
