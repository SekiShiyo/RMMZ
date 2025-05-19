/*:
* @target MZ
* @plugindesc 自定义主菜单UI
* @author SekiShiyo
* @help
*
* 这个插件懒得翻译了，English Users please translate if needed.
* 允许你自定义主菜单的UI外观，可以为菜单命令窗口、
* 状态窗口和金币窗口设置自定义背景图片。
*
* 使用方法：
* 1. 准备好你想用作背景的图片，放在img/pictures文件夹中
* 2. 在插件参数中设置各个窗口对应的背景图片
* 3. 调整其他参数如透明度、文本颜色等
*
* 默认窗口尺寸参考（根据默认分辨率816x624）：
* * 命令窗口：240x504像素（宽x高）
* * 状态窗口：576x504像素（宽x高）
* * 金币窗口：240x72像素（宽x高）
*
* 窗口位置参考：
* * 命令窗口：左侧从(0,120)开始
* * 状态窗口：右侧从(240,120)开始
* * 金币窗口：左下角从(0,552)开始
*
* 注意：如果你修改了游戏分辨率或使用了布局设置参数，
* 窗口的尺寸和位置会相应变化。
*
* 调试模式：
* 开启调试模式后，进入菜单时会在各窗口上显示其尺寸和位置信息，
* 方便你制作精确尺寸的背景图片。
*
* 背景图片缩放：
* 如果你的背景图片尺寸与窗口不完全匹配，可以使用缩放设置来调整。
* 设置为1.0表示原始大小，小于1.0表示缩小，大于1.0表示放大。
*
* 窗口位置调整：
* 可以通过设置X和Y坐标偏移量来调整窗口的位置。
* 正值表示向右/向下移动，负值表示向左/向上移动。
*
* 窗口尺寸调整：
* 可以自定义窗口的宽度和高度，让窗口完全符合你的设计需求。
*
* @param commandWindowUI
* @text 命令窗口UI
* @type file
* @dir img/pictures
* @desc 主菜单命令窗口的UI背景图片
* @default
*
* @param statusWindowUI
* @text 状态窗口UI
* @type file
* @dir img/pictures
* @desc 主菜单状态窗口的UI背景图片
* @default
*
* @param goldWindowUI
* @text 金币窗口UI
* @type file
* @dir img/pictures
* @desc 主菜单金币窗口的UI背景图片
* @default
*
* @param commandOpacity
* @text 命令窗口透明度
* @type number
* @min 0
* @max 255
* @desc 命令窗口的透明度(0-255)，设置为0时完全透明
* @default 255
*
* @param statusOpacity
* @text 状态窗口透明度
* @type number
* @min 0
* @max 255
* @desc 状态窗口的透明度(0-255)，设置为0时完全透明
* @default 255
*
* @param goldOpacity
* @text 金币窗口透明度
* @type number
* @min 0
* @max 255
* @desc 金币窗口的透明度(0-255)，设置为0时完全透明
* @default 255
*
* @param textColorSettings
* @text 文本颜色设置
* @type struct<TextColorStruct>
* @desc 设置主菜单中文本的颜色
* @default {"commandTextColor":"#ffffff","statusTextColor":"#ffffff","goldTextColor":"#ffffff"}
*
* @param fontSettings
* @text 字体设置
* @type struct<FontStruct>
* @desc 设置主菜单中文本的字体
* @default {"commandFontSize":"26","statusFontSize":"18","goldFontSize":"24"}
*
* @param layoutSettings
* @text 布局设置
* @type struct<LayoutStruct>
* @desc 设置主菜单的布局
* @default {"commandWidth":"240","commandHeight":"","statusWidth":"","statusHeight":"","goldWidth":"","goldHeight":"","commandAlign":"left"}
*
* @param positionSettings
* @text 位置设置
* @type struct<PositionStruct>
* @desc 设置窗口的位置偏移量
* @default {"commandX":"0","commandY":"0","statusX":"0","statusY":"0","goldX":"0","goldY":"0"}
*
* @param scaleSettings
* @text 背景图片缩放设置
* @type struct<ScaleStruct>
* @desc 设置背景图片的缩放比例
* @default {"commandScale":"1.0","statusScale":"1.0","goldScale":"1.0"}
*
* @param debugMode
* @text 调试模式
* @type boolean
* @desc 开启调试模式，显示窗口尺寸和位置信息
* @default false
  \*/

/\*~~struct~~TextColorStruct:

* @param commandTextColor
* @text 命令窗口文本颜色
* @desc 命令窗口的文本颜色(CSS格式，如#ffffff)
* @default #ffffff
*
* @param statusTextColor
* @text 状态窗口文本颜色
* @desc 状态窗口的文本颜色(CSS格式，如#ffffff)
* @default #ffffff
*
* @param goldTextColor
* @text 金币窗口文本颜色
* @desc 金币窗口的文本颜色(CSS格式，如#ffffff)
* @default #ffffff
  \*/

/\*~~struct~~FontStruct:

* @param commandFontSize
* @text 命令窗口字体大小
* @type number
* @min 12
* @max 72
* @desc 命令窗口的字体大小
* @default 26
*
* @param statusFontSize
* @text 状态窗口字体大小
* @type number
* @min 12
* @max 72
* @desc 状态窗口的字体大小
* @default 18
*
* @param goldFontSize
* @text 金币窗口字体大小
* @type number
* @min 12
* @max 72
* @desc 金币窗口的字体大小
* @default 24
  \*/

/\*~~struct~~LayoutStruct:

* @param commandWidth
* @text 命令窗口宽度
* @type string
* @desc 命令窗口的宽度(留空使用默认值)
* @default 240
*
* @param commandHeight
* @text 命令窗口高度
* @type string
* @desc 命令窗口的高度(留空使用默认值)
* @default
*
* @param statusWidth
* @text 状态窗口宽度
* @type string
* @desc 状态窗口的宽度(留空使用默认值)
* @default
*
* @param statusHeight
* @text 状态窗口高度
* @type string
* @desc 状态窗口的高度(留空使用默认值)
* @default
*
* @param goldWidth
* @text 金币窗口宽度
* @type string
* @desc 金币窗口的宽度(留空使用默认值)
* @default
*
* @param goldHeight
* @text 金币窗口高度
* @type string
* @desc 金币窗口的高度(留空使用默认值)
* @default
*
* @param commandAlign
* @text 命令文本对齐方式
* @type select
* @option 左对齐
* @value left
* @option 居中
* @value center
* @option 右对齐
* @value right
* @desc 命令窗口中文本的对齐方式
* @default left
  \*/

/\*~~struct~~PositionStruct:

* @param commandX
* @text 命令窗口X偏移
* @type number
* @min -1000
* @max 1000
* @desc 命令窗口的X坐标偏移量(正数向右，负数向左)
* @default 0
*
* @param commandY
* @text 命令窗口Y偏移
* @type number
* @min -1000
* @max 1000
* @desc 命令窗口的Y坐标偏移量(正数向下，负数向上)
* @default 0
*
* @param statusX
* @text 状态窗口X偏移
* @type number
* @min -1000
* @max 1000
* @desc 状态窗口的X坐标偏移量(正数向右，负数向左)
* @default 0
*
* @param statusY
* @text 状态窗口Y偏移
* @type number
* @min -1000
* @max 1000
* @desc 状态窗口的Y坐标偏移量(正数向下，负数向上)
* @default 0
*
* @param goldX
* @text 金币窗口X偏移
* @type number
* @min -1000
* @max 1000
* @desc 金币窗口的X坐标偏移量(正数向右，负数向左)
* @default 0
*
* @param goldY
* @text 金币窗口Y偏移
* @type number
* @min -1000
* @max 1000
* @desc 金币窗口的Y坐标偏移量(正数向下，负数向上)
* @default 0
  \*/

/\*~~struct~~ScaleStruct:

* @param commandScale
* @text 命令窗口背景缩放
* @type string
* @desc 命令窗口背景图片的缩放比例
* @default 1.0
*
* @param statusScale
* @text 状态窗口背景缩放
* @type string
* @desc 状态窗口背景图片的缩放比例
* @default 1.0
*
* @param goldScale
* @text 金币窗口背景缩放
* @type string
* @desc 金币窗口背景图片的缩放比例
* @default 1.0
  \*/

(function() {
'use strict';

```
// 获取插件参数
const pluginName = "CustomMenuUI";
const parameters = PluginManager.parameters(pluginName);
const commandWindowUI = String(parameters['commandWindowUI'] || '');
const statusWindowUI = String(parameters['statusWindowUI'] || '');
const goldWindowUI = String(parameters['goldWindowUI'] || '');
const commandOpacity = Number(parameters['commandOpacity'] || 255);
const statusOpacity = Number(parameters['statusOpacity'] || 255);
const goldOpacity = Number(parameters['goldOpacity'] || 255);
const debugMode = parameters['debugMode'] === 'true';

// 解析JSON结构参数
const parseStructParam = function(paramString) {
    try {
        return JSON.parse(paramString);
    } catch (e) {
        return {};
    }
};

// 文本颜色设置
const textColorSettings = parseStructParam(parameters['textColorSettings'] || '{}');
const commandTextColor = String(textColorSettings.commandTextColor || '#ffffff');
const statusTextColor = String(textColorSettings.statusTextColor || '#ffffff');
const goldTextColor = String(textColorSettings.goldTextColor || '#ffffff');

// 字体设置
const fontSettings = parseStructParam(parameters['fontSettings'] || '{}');
const commandFontSize = Number(fontSettings.commandFontSize || 26);
const statusFontSize = Number(fontSettings.statusFontSize || 18);
const goldFontSize = Number(fontSettings.goldFontSize || 24);

// 布局设置
const layoutSettings = parseStructParam(parameters['layoutSettings'] || '{}');
const customCommandWidth = String(layoutSettings.commandWidth || '');
const customCommandHeight = String(layoutSettings.commandHeight || '');
const customStatusWidth = String(layoutSettings.statusWidth || '');
const customStatusHeight = String(layoutSettings.statusHeight || '');
const customGoldWidth = String(layoutSettings.goldWidth || '');
const customGoldHeight = String(layoutSettings.goldHeight || '');
const commandAlign = String(layoutSettings.commandAlign || 'left');

// 位置设置
const positionSettings = parseStructParam(parameters['positionSettings'] || '{}');
const commandX = Number(positionSettings.commandX || 0);
const commandY = Number(positionSettings.commandY || 0);
const statusX = Number(positionSettings.statusX || 0);
const statusY = Number(positionSettings.statusY || 0);
const goldX = Number(positionSettings.goldX || 0);
const goldY = Number(positionSettings.goldY || 0);

// 缩放设置
const scaleSettings = parseStructParam(parameters['scaleSettings'] || '{}');
const commandScale = Number(scaleSettings.commandScale || 1.0);
const statusScale = Number(scaleSettings.statusScale || 1.0);
const goldScale = Number(scaleSettings.goldScale || 1.0);

//=============================================================================
// 窗口基类扩展 - 添加UI背景图片功能
//=============================================================================
const _Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
    _Window_Base_initialize.call(this, rect);
    this._uiSprite = null;
};

// 设置UI背景图片
Window_Base.prototype.setupUiSprite = function(imageName, scale = 1.0) {
    if (imageName) {
        if (!this._uiSprite) {
            this._uiSprite = new Sprite();
            this.addChildToBack(this._uiSprite);
        }
        this._uiSprite.bitmap = ImageManager.loadPicture(imageName);
        this._uiSprite.x = 0;
        this._uiSprite.y = 0;
        
        // 设置缩放
        if (scale !== 1.0) {
            this._uiSprite.scale.x = scale;
            this._uiSprite.scale.y = scale;
        }
        
        // 图片加载完成后调整位置
        this._uiSprite.bitmap.addLoadListener(() => {
            // 如果缩放后图片比窗口大，则居中显示
            if (this._uiSprite.width > this.width || this._uiSprite.height > this.height) {
                this._uiSprite.x = (this.width - this._uiSprite.width) / 2;
                this._uiSprite.y = (this.height - this._uiSprite.height) / 2;
            }
        });
    }
};

// 调试模式 - 显示窗口信息
Window_Base.prototype.showDebugInfo = function(name) {
    if (!debugMode) return;
    
    this.contents.fontSize = 16;
    this.contents.fontBold = true;
    this.changeTextColor("#ff0000");
    
    const info = `${name}\nX: ${this.x}, Y: ${this.y}\nW: ${this.width}, H: ${this.height}`;
    this.drawText(info, 4, 4, this.contents.width - 8, 'left');
    
    // 恢复原始设置
    this.resetFontSettings();
};

//=============================================================================
// Scene_Menu 扩展 - 自定义窗口尺寸和位置
//=============================================================================
// 命令窗口位置和尺寸
const _Scene_Menu_commandWindowRect = Scene_Menu.prototype.commandWindowRect;
Scene_Menu.prototype.commandWindowRect = function() {
    const rect = _Scene_Menu_commandWindowRect.call(this);
    if (customCommandWidth) {
        rect.width = Number(customCommandWidth);
    }
    if (customCommandHeight) {
        rect.height = Number(customCommandHeight);
    }
    rect.x += commandX;
    rect.y += commandY;
    return rect;
};

// 状态窗口位置和尺寸
const _Scene_Menu_statusWindowRect = Scene_Menu.prototype.statusWindowRect;
Scene_Menu.prototype.statusWindowRect = function() {
    const rect = _Scene_Menu_statusWindowRect.call(this);
    if (customStatusWidth) {
        rect.width = Number(customStatusWidth);
    }
    if (customStatusHeight) {
        rect.height = Number(customStatusHeight);
    }
    rect.x += statusX;
    rect.y += statusY;
    return rect;
};

// 金币窗口位置和尺寸
const _Scene_Menu_goldWindowRect = Scene_Menu.prototype.goldWindowRect;
Scene_Menu.prototype.goldWindowRect = function() {
    const rect = _Scene_Menu_goldWindowRect.call(this);
    if (customGoldWidth) {
        rect.width = Number(customGoldWidth);
    }
    if (customGoldHeight) {
        rect.height = Number(customGoldHeight);
    }
    rect.x += goldX;
    rect.y += goldY;
    return rect;
};

//=============================================================================
// 菜单命令窗口扩展
//=============================================================================
const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
Window_MenuCommand.prototype.initialize = function(rect) {
    _Window_MenuCommand_initialize.call(this, rect);
    this.setupUiSprite(commandWindowUI, commandScale);
    this.opacity = commandOpacity;
    this.resetTextColor();
    this.contents.fontSize = commandFontSize;
    this.refresh();
    
    if (debugMode) {
        this.showDebugInfo("命令窗口");
    }
};

const _Window_MenuCommand_resetTextColor = Window_MenuCommand.prototype.resetTextColor;
Window_MenuCommand.prototype.resetTextColor = function() {
    _Window_MenuCommand_resetTextColor.call(this);
    if (commandTextColor) {
        this.changeTextColor(commandTextColor);
    }
};

const _Window_MenuCommand_itemTextAlign = Window_MenuCommand.prototype.itemTextAlign;
Window_MenuCommand.prototype.itemTextAlign = function() {
    return commandAlign || _Window_MenuCommand_itemTextAlign.call(this);
};

//=============================================================================
// 菜单状态窗口扩展
//=============================================================================
const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
Window_MenuStatus.prototype.initialize = function(rect) {
    _Window_MenuStatus_initialize.call(this, rect);
    this.setupUiSprite(statusWindowUI, statusScale);
    this.opacity = statusOpacity;
    this.resetTextColor();
    this.contents.fontSize = statusFontSize;
    this.refresh();
    
    if (debugMode) {
        this.showDebugInfo("状态窗口");
    }
};

const _Window_MenuStatus_resetTextColor = Window_MenuStatus.prototype.resetTextColor;
Window_MenuStatus.prototype.resetTextColor = function() {
    _Window_MenuStatus_resetTextColor.call(this);
    if (statusTextColor) {
        this.changeTextColor(statusTextColor);
    }
};

//=============================================================================
// 金币窗口扩展
//=============================================================================
const _Window_Gold_initialize = Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize = function(rect) {
    _Window_Gold_initialize.call(this, rect);
    this.setupUiSprite(goldWindowUI, goldScale);
    this.opacity = goldOpacity;
    this.resetTextColor();
    this.contents.fontSize = goldFontSize;
    this.refresh();
    
    if (debugMode) {
        this.showDebugInfo("金币窗口");
    }
};

const _Window_Gold_resetTextColor = Window_Gold.prototype.resetTextColor;
Window_Gold.prototype.resetTextColor = function() {
    _Window_Gold_resetTextColor.call(this);
    if (goldTextColor) {
        this.changeTextColor(goldTextColor);
    }
};
```

})();
