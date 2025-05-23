/*:
 * @target MZ
 * @plugindesc Simplified Desktop-Style Menu Icons Plugin
 * @author SekiShiyo
 * @help
 * 
 * This plugin transforms the command window in the main menu into a desktop-style icon grid.
 * You can customize each command with its own icon and label.
 * 
 * How to Use:
 * 1. Place your icon images in the `img/pictures` folder.
 * 2. Assign each command an image in the plugin parameters.
 * 3. Use the grid settings to control layout behavior.
 *
 * @param layoutSettings
 * @text Layout Settings
 * 
 * @param useGrid
 * @text Use Grid Layout
 * @parent layoutSettings
 * @type boolean
 * @desc Whether to arrange icons automatically in a grid.
 * @default true
 * 
 * @param columns
 * @text Icons per Row
 * @parent layoutSettings
 * @type number
 * @min 1
 * @max 10
 * @desc Number of icons per row in grid layout.
 * @default 4
 * 
 * @param rowSpacing
 * @text Row Spacing
 * @parent layoutSettings
 * @type number
 * @min 50
 * @max 300
 * @desc Vertical spacing between icon rows.
 * @default 120
 * 
 * @param columnSpacing
 * @text Column Spacing
 * @parent layoutSettings
 * @type number
 * @min 50
 * @max 300
 * @desc Horizontal spacing between icons.
 * @default 100
 * 
 * @param startX
 * @text Start X Position
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 1000
 * @desc X coordinate where the icon grid starts.
 * @default 100
 * 
 * @param startY
 * @text Start Y Position
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 1000
 * @desc Y coordinate where the icon grid starts.
 * @default 100
 * 
 * @param windowOpacity
 * @text Command Window Opacity
 * @parent layoutSettings
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of the command window background.
 * @default 0
 * 
 * @param windowSettings
 * @text Window Position Settings
 * 
 * @param menuWindowX
 * @text Menu Window X Offset
 * @parent windowSettings
 * @type number
 * @min -1000
 * @max 1000
 * @desc Horizontal offset for the command window.
 * @default 0
 * 
 * @param menuWindowY
 * @text Menu Window Y Offset
 * @parent windowSettings
 * @type number
 * @min -1000
 * @max 1000
 * @desc Vertical offset for the command window.
 * @default 0
 * 
 * @param menuWindowWidth
 * @text Menu Window Width
 * @parent windowSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc Width of the command window.
 * @default 800
 * 
 * @param menuWindowHeight
 * @text Menu Window Height
 * @parent windowSettings
 * @type number
 * @min 0
 * @max 2000
 * @desc Height of the command window.
 * @default 600
 * 
 * @param backgroundImage
 * @text Menu Background Image
 * @parent layoutSettings
 * @type file
 * @dir img/pictures
 * @desc Background image used for the menu.
 * @default 
 * 
 * @param orderSettings
 * @text Icon Order Settings
 * 
 * @param customOrder
 * @text Use Custom Order
 * @parent orderSettings
 * @type boolean
 * @desc Whether to use a custom command order instead of default.
 * @default false
 * 
 * @param commandOrder
 * @text Command Display Order
 * @parent orderSettings
 * @type select[]
 * @option Item
 * @value item
 * @option Skill
 * @value skill
 * @option Equip
 * @value equip
 * @option Status
 * @value status
 * @option Formation
 * @value formation
 * @option Options
 * @value options
 * @option Save
 * @value save
 * @option Game End
 * @value gameEnd
 * @option Bond (Favor)
 * @value favor
 * @option Tasks
 * @value task
 * @desc The display order of commands from top to bottom.
 * @default ["item","skill","equip","status","formation","options","save","gameEnd","favor","task"]
 * 
 * @param otherWindowSettings
 * @text Other Window Settings
 * 
 * @param hideGoldWindow
 * @text Hide Gold Window
 * @parent otherWindowSettings
 * @type boolean
 * @desc Whether to hide the gold window in the menu.
 * @default true
 * 
 * @param hideStatusWindow
 * @text Hide Status Window
 * @parent otherWindowSettings
 * @type boolean
 * @desc Whether to hide the actor status window in the menu.
 * @default true
 * 
 * @param iconSettings
 * @text Icon Appearance Settings
 * 
 * @param iconWidth
 * @text Icon Width
 * @parent iconSettings
 * @type number
 * @min 20
 * @max 300
 * @desc Width of each icon.
 * @default 80
 * 
 * @param iconHeight
 * @text Icon Height
 * @parent iconSettings
 * @type number
 * @min 20
 * @max 300
 * @desc Height of each icon.
 * @default 80
 * 
 * @param selectionColor
 * @text Selection Highlight Color
 * @parent iconSettings
 * @type text
 * @desc Color used to highlight the selected icon (CSS format like #ffcc00).
 * @default #ffcc00
 * 
 * (… Individual icon/label/color configuration continues for each menu item: item, skill, equip, status, formation, options, save, gameEnd, favor, task …)
 * 
 * @param fontSize
 * @text Label Font Size
 * @type number
 * @min 10
 * @max 72
 * @desc Font size of the icon labels.
 * @default 16
 * 
 * @param debugMode
 * @text Debug Mode
 * @type boolean
 * @desc Enables debug mode to show command symbols and positions.
 * @default false
 */

(function() {
    'use strict';
    
    // 插件兼容性标记
    var Imported = Imported || {};
    Imported.SimpleIconMenu = true;
    
    // 检查其他插件
    var hasFavorSystem = Imported.FavorSystem || false;
    var hasTaskSystem = Imported.ExtremeSimpleTaskSystem || false;
    
    // 获取插件参数
    const pluginName = "SimpleIconMenu";
    const parameters = PluginManager.parameters(pluginName);
    
    // 布局设置
    const useGrid = parameters['useGrid'] === 'true';
    const columns = Number(parameters['columns'] || 4);
    const rowSpacing = Number(parameters['rowSpacing'] || 120);
    const columnSpacing = Number(parameters['columnSpacing'] || 100);
    const startX = Number(parameters['startX'] || 100);
    const startY = Number(parameters['startY'] || 100);
    const windowOpacity = Number(parameters['windowOpacity'] || 0);
    const backgroundImage = String(parameters['backgroundImage'] || '');
    
    // 窗口设置
    const menuWindowX = Number(parameters['menuWindowX'] || 0);
    const menuWindowY = Number(parameters['menuWindowY'] || 0);
    const menuWindowWidth = Number(parameters['menuWindowWidth'] || 800);
    const menuWindowHeight = Number(parameters['menuWindowHeight'] || 600);
    
    // 排序设置
    const customOrder = parameters['customOrder'] === 'true';
    
    // 解析命令排序顺序
    let commandOrder = [];
    try {
        if (parameters['commandOrder']) {
            commandOrder = JSON.parse(parameters['commandOrder']);
        }
    } catch (e) {
        console.error("命令排序顺序解析错误:", e);
        // 默认顺序
        commandOrder = ["item", "skill", "equip", "status", "formation", "options", "save", "gameEnd", "favor", "task"];
    }
    
    // 其他窗口设置
    const hideGoldWindow = parameters['hideGoldWindow'] === 'true';
    const hideStatusWindow = parameters['hideStatusWindow'] === 'true';
    
    // 图标设置
    const iconWidth = Number(parameters['iconWidth'] || 80);
    const iconHeight = Number(parameters['iconHeight'] || 80);
    const selectionColor = String(parameters['selectionColor'] || '#ffcc00');
    const fontSize = Number(parameters['fontSize'] || 16);
    
    // 调试模式
    const debugMode = parameters['debugMode'] === 'true';
    
    // 自定义命令设置
    const enableFavor = parameters['enableFavor'] === 'true';
    const enableTask = parameters['enableTask'] === 'true';
    
    // 图标配置映射表
    const iconConfigs = {
        item: {
            icon: String(parameters['itemIcon'] || ''),
            label: String(parameters['itemLabel'] || '物品'),
            color: String(parameters['itemColor'] || '#ffffff')
        },
        skill: {
            icon: String(parameters['skillIcon'] || ''),
            label: String(parameters['skillLabel'] || '技能'),
            color: String(parameters['skillColor'] || '#ffffff')
        },
        equip: {
            icon: String(parameters['equipIcon'] || ''),
            label: String(parameters['equipLabel'] || '装备'),
            color: String(parameters['equipColor'] || '#ffffff')
        },
        status: {
            icon: String(parameters['statusIcon'] || ''),
            label: String(parameters['statusLabel'] || '状态'),
            color: String(parameters['statusColor'] || '#ffffff')
        },
        formation: {
            icon: String(parameters['formationIcon'] || ''),
            label: String(parameters['formationLabel'] || '队形'),
            color: String(parameters['formationColor'] || '#ffffff')
        },
        options: {
            icon: String(parameters['optionsIcon'] || ''),
            label: String(parameters['optionsLabel'] || '选项'),
            color: String(parameters['optionsColor'] || '#ffffff')
        },
        save: {
            icon: String(parameters['saveIcon'] || ''),
            label: String(parameters['saveLabel'] || '保存'),
            color: String(parameters['saveColor'] || '#ffffff')
        },
        gameEnd: {
            icon: String(parameters['gameEndIcon'] || ''),
            label: String(parameters['gameEndLabel'] || '结束'),
            color: String(parameters['gameEndColor'] || '#ffffff')
        },
        favor: {
            icon: String(parameters['favorIcon'] || ''),
            label: String(parameters['favorLabel'] || '羁绊'),
            color: String(parameters['favorColor'] || '#ffccff')
        },
        task: {
            icon: String(parameters['taskIcon'] || ''),
            label: String(parameters['taskLabel'] || '任务'),
            color: String(parameters['taskColor'] || '#ffff99')
        }
    };
    
    //=============================================================================
    // 修改Scene_Menu支持自定义窗口位置和大小
    //=============================================================================
    
    // 重写命令窗口的位置和大小计算
    const _Scene_Menu_commandWindowRect = Scene_Menu.prototype.commandWindowRect;
    Scene_Menu.prototype.commandWindowRect = function() {
        const rect = _Scene_Menu_commandWindowRect.call(this);
        rect.x = menuWindowX;
        rect.y = menuWindowY;
        rect.width = menuWindowWidth;
        rect.height = menuWindowHeight;
        return rect;
    };
    
    //=============================================================================
    // 修改Scene_Menu隐藏金币和状态窗口
    //=============================================================================
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        
        // 隐藏所有窗口背景
        if (this._commandWindow) {
            this._commandWindow.frameVisible = false;
            this._commandWindow.opacity = 0;
            if (this._commandWindow._contentsBackSprite) {
                this._commandWindow._contentsBackSprite.opacity = 0;
            }
        }
        
        // 隐藏金币窗口
        if (hideGoldWindow && this._goldWindow) {
            this._goldWindow.visible = false;
            this._goldWindow.opacity = 0;
        }
        
        // 隐藏状态窗口
        if (hideStatusWindow && this._statusWindow) {
            this._statusWindow.visible = false;
            this._statusWindow.opacity = 0;
        }
    };
    
    //=============================================================================
    // 重新定义菜单命令窗口
    //=============================================================================
    
    // 完全重写Window_MenuCommand以确保所有功能正常工作
    const _Window_MenuCommand_initialize = Window_MenuCommand.prototype.initialize;
    Window_MenuCommand.prototype.initialize = function(rect) {
        // 调用原始初始化
        _Window_MenuCommand_initialize.call(this, rect);
        
        // 设置数组
        this._iconSprites = [];
        this._labelSprites = [];
        this._selectionSprites = [];
        
        // 设置背景
        this.opacity = windowOpacity;
        this.frameVisible = false; // 始终隐藏边框
        this.contents.opacity = 0; // 让内容完全透明，隐藏原有文本
        
        // 隐藏默认背景
        this._hideBackgroundSprites();
        
        // 设置背景图片
        if (backgroundImage) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(backgroundImage);
            this._backgroundSprite.z = 10; // 确保背景图在最顶层
            this.addChild(this._backgroundSprite);
        }
        
        // 刷新显示
        this.refresh();
    };
    
    // 隐藏窗口默认背景
    Window_MenuCommand.prototype._hideBackgroundSprites = function() {
        // 隐藏默认窗口背景和框架
        if (this._backSprite) {
            this._backSprite.visible = false;
        }
        if (this._frameSprite) {
            this._frameSprite.visible = false;
        }
        
        // 找到并隐藏可能的其他白色背景精灵
        for (const child of this.children) {
            // 隐藏所有内部背景和非图标精灵
            if (child && 
                !this._iconSprites?.includes(child) && 
                !this._labelSprites?.includes(child) && 
                !this._selectionSprites?.includes(child) &&
                child !== this._backgroundSprite) {
                
                if (child.bitmap && child.constructor.name === "Sprite") {
                    child.opacity = 0;
                }
            }
        }
    };
    
    // 重写背景精灵创建方法
    const _Window_Base_createBackSprite = Window_Base.prototype._createBackSprite;
    Window_Base.prototype._createBackSprite = function() {
        _Window_Base_createBackSprite.call(this);
        if (this instanceof Window_MenuCommand) {
            if (this._backSprite) {
                this._backSprite.visible = false;
            }
        }
    };
    
    // 重写边框精灵创建方法
    const _Window_Base_createFrameSprite = Window_Base.prototype._createFrameSprite;
    Window_Base.prototype._createFrameSprite = function() {
        _Window_Base_createFrameSprite.call(this);
        if (this instanceof Window_MenuCommand) {
            if (this._frameSprite) {
                this._frameSprite.visible = false;
            }
        }
    };
    
    // 重写refresh方法，保留原始菜单功能，同时添加图标
    const _Window_MenuCommand_refresh = Window_MenuCommand.prototype.refresh;
    Window_MenuCommand.prototype.refresh = function() {
        // 清除内容以隐藏默认文本
        this.contents.clear();
        
        // 先调用原始刷新方法以确保基本功能正常
        _Window_MenuCommand_refresh.call(this);
        
        // 然后添加我们的图标
        this._createIconSprites();
    };
    
    // 覆盖makCommandList方法，确保命令不重复
    const _Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        // 清空现有命令
        if (this._list) {
            this._list = [];
        }
        
        if (customOrder) {
            // 使用自定义顺序添加命令
            this.addCustomOrderedCommands();
        } else {
            // 调用修改后的addOriginalCommands方法，使用默认顺序
            this.addOriginalCommands();
        }
    };
    
    // 添加使用自定义顺序的命令
    Window_MenuCommand.prototype.addCustomOrderedCommands = function() {
        // 先添加所有标准命令到临时容器
        const allCommands = {};
        
        // 添加主要命令
        this.addMainCommandsToContainer(allCommands);
        
        // 添加队形命令
        if (this.needsCommand('formation')) {
            allCommands['formation'] = { name: TextManager.formation, symbol: 'formation', enabled: true };
        }
        
        // 添加选项命令
        allCommands['options'] = { name: TextManager.options, symbol: 'options', enabled: true };
        
        // 添加保存命令
        if (this.needsCommand('save')) {
            allCommands['save'] = { name: TextManager.save, symbol: 'save', enabled: true };
        }
        
        // 添加游戏结束命令
        allCommands['gameEnd'] = { name: TextManager.gameEnd, symbol: 'gameEnd', enabled: true };
        
        // 添加自定义命令
        const existingCommands = Object.keys(allCommands);
        
        // 添加好感度系统命令 - 仅当它不存在时
        if (enableFavor && !existingCommands.includes("favor")) {
            allCommands['favor'] = { name: iconConfigs.favor.label, symbol: 'favor', enabled: true };
        }
        
        // 添加任务系统命令 - 仅当它不存在时
        if (enableTask && !existingCommands.includes("task")) {
            allCommands['task'] = { name: iconConfigs.task.label, symbol: 'task', enabled: true };
        }
        
        // 按照自定义顺序添加命令
        for (let i = 0; i < commandOrder.length; i++) {
            const symbol = commandOrder[i];
            if (allCommands[symbol]) {
                const command = allCommands[symbol];
                this.addCommand(command.name, command.symbol, command.enabled);
            }
        }
    };
    
    // 将主要命令添加到容器中
    Window_MenuCommand.prototype.addMainCommandsToContainer = function(container) {
        // 使用正确的方法检查命令是否可用
        container['item'] = { name: TextManager.item, symbol: 'item', enabled: this.needsCommand('item') };
        container['skill'] = { name: TextManager.skill, symbol: 'skill', enabled: this.needsCommand('skill') };
        container['equip'] = { name: TextManager.equip, symbol: 'equip', enabled: this.needsCommand('equip') };
        container['status'] = { name: TextManager.status, symbol: 'status', enabled: this.needsCommand('status') };
    };
    
    // 创建图标精灵的方法
    Window_MenuCommand.prototype._createIconSprites = function() {
        // 清除旧的图标精灵
        this._clearIconSprites();
        
        // 创建新的图标精灵
        const commands = this._list;
        if (!commands || commands.length === 0) return;
        
        for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            if (!cmd) continue;
            
            const config = iconConfigs[cmd.symbol];
            if (!config) continue;
            
            // 决定图标位置
            let posX, posY;
            if (useGrid) {
                const col = i % columns;
                const row = Math.floor(i / columns);
                posX = startX + col * columnSpacing;
                posY = startY + row * rowSpacing;
            } else {
                posX = 100 + (i % 3) * 100;
                posY = 100 + Math.floor(i / 3) * 100;
            }
            
            // 创建选择框精灵
            const selectionSprite = new Sprite();
            selectionSprite.bitmap = new Bitmap(iconWidth + 20, iconHeight + 20);
            selectionSprite.bitmap.fillAll(selectionColor);
            selectionSprite.x = posX - 10;
            selectionSprite.y = posY - 10;
            selectionSprite.visible = (i === this.index());
            this.addChild(selectionSprite);
            this._selectionSprites.push(selectionSprite);
            
            // 创建图标精灵
            const iconSprite = new Sprite();
            if (config.icon) {
                iconSprite.bitmap = ImageManager.loadPicture(config.icon);
            } else {
                iconSprite.bitmap = new Bitmap(iconWidth, iconHeight);
                iconSprite.bitmap.fillRect(0, 0, iconWidth, iconHeight, '#777777');
                iconSprite.bitmap.fillRect(2, 2, iconWidth - 4, iconHeight - 4, '#333333');
                iconSprite.bitmap.drawText(cmd.name, 4, 4, iconWidth - 8, iconHeight - 8, 'center');
            }
            
            iconSprite.x = posX;
            iconSprite.y = posY;
            iconSprite._commandIndex = i;
            this.addChild(iconSprite);
            this._iconSprites.push(iconSprite);
            
            // 创建标签精灵
            const labelSprite = new Sprite();
            const labelText = config.label || cmd.name;
            const labelColor = config.color || '#ffffff';
            
            labelSprite.bitmap = new Bitmap(iconWidth + 40, 30);
            labelSprite.bitmap.fontSize = fontSize;
            labelSprite.bitmap.textColor = labelColor;
            labelSprite.bitmap.drawText(labelText, 0, 0, iconWidth + 40, 30, 'center');
            
            labelSprite.x = posX - 20;
            labelSprite.y = posY + iconHeight + 5;
            this.addChild(labelSprite);
            this._labelSprites.push(labelSprite);
            
            if (debugMode) {
                iconSprite.bitmap.fontSize = 12;
                iconSprite.bitmap.textColor = '#ff0000';
                iconSprite.bitmap.drawText(cmd.symbol, 5, 5, iconWidth - 10, 20, 'left');
                iconSprite.bitmap.drawText(`(${posX},${posY})`, 5, iconHeight - 20, iconWidth - 10, 20, 'left');
            }
        }
    };
    
    // 清除旧的图标精灵
    Window_MenuCommand.prototype._clearIconSprites = function() {
        if (this._iconSprites) {
            for (const sprite of this._iconSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        if (this._labelSprites) {
            for (const sprite of this._labelSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        if (this._selectionSprites) {
            for (const sprite of this._selectionSprites) {
                if (sprite) this.removeChild(sprite);
            }
        }
        
        this._iconSprites = [];
        this._labelSprites = [];
        this._selectionSprites = [];
    };
    
    // 更新选择状态
    const _Window_MenuCommand_update = Window_MenuCommand.prototype.update;
    Window_MenuCommand.prototype.update = function() {
        _Window_MenuCommand_update.call(this);
        this._updateIconSelection();
    };
    
    // 更新图标选择状态
    Window_MenuCommand.prototype._updateIconSelection = function() {
        const index = this.index();
        if (this._selectionSprites) {
            for (let i = 0; i < this._selectionSprites.length; i++) {
                const sprite = this._selectionSprites[i];
                if (sprite) {
                    sprite.visible = (i === index);
                    if (i === index) {
                        // 简单的选中动画
                        const scale = 1.0 + 0.1 * Math.sin(Date.now() * 0.01);
                        sprite.scale.x = scale;
                        sprite.scale.y = scale;
                    }
                }
            }
        }
    };
    
    // 重写对方向键的响应，实现网格导航
    Window_MenuCommand.prototype.cursorDown = function(wrap) {
        if (useGrid && columns > 0) {
            const maxItems = this.maxItems();
            const maxRows = Math.ceil(maxItems / columns);
            const currentRow = Math.floor(this.index() / columns);
            const currentCol = this.index() % columns;
            
            if (currentRow < maxRows - 1) {
                const nextIndex = (currentRow + 1) * columns + currentCol;
                if (nextIndex < maxItems) {
                    this.select(nextIndex);
                }
            } else if (wrap) {
                this.select(currentCol);
            }
        } else {
            Window_Selectable.prototype.cursorDown.call(this, wrap);
        }
    };

    Window_MenuCommand.prototype.cursorUp = function(wrap) {
        if (useGrid && columns > 0) {
            const maxItems = this.maxItems();
            const maxRows = Math.ceil(maxItems / columns);
            const currentRow = Math.floor(this.index() / columns);
            const currentCol = this.index() % columns;
            
            if (currentRow > 0) {
                this.select(this.index() - columns);
            } else if (wrap) {
                const lastRowIndex = Math.min(maxItems - 1, (maxRows - 1) * columns + currentCol);
                this.select(lastRowIndex);
            }
        } else {
            Window_Selectable.prototype.cursorUp.call(this, wrap);
        }
    };

    Window_MenuCommand.prototype.cursorRight = function(wrap) {
        if (useGrid && columns > 0) {
            const maxItems = this.maxItems();
            const currentRow = Math.floor(this.index() / columns);
            const currentCol = this.index() % columns;
            
            if (currentCol < columns - 1 && this.index() < maxItems - 1) {
                this.select(this.index() + 1);
            } else if (wrap) {
                this.select(currentRow * columns);
            }
        } else {
            Window_Selectable.prototype.cursorRight.call(this, wrap);
        }
    };

    Window_MenuCommand.prototype.cursorLeft = function(wrap) {
        if (useGrid && columns > 0) {
            const currentRow = Math.floor(this.index() / columns);
            const currentCol = this.index() % columns;
            
            if (currentCol > 0) {
                this.select(this.index() - 1);
            } else if (wrap) {
                const lastColIndex = Math.min(this.maxItems() - 1, (currentRow + 1) * columns - 1);
                this.select(lastColIndex);
            }
        } else {
            Window_Selectable.prototype.cursorLeft.call(this, wrap);
        }
    };
    
    // 覆盖绘制方法，隐藏原始文本
    Window_MenuCommand.prototype.drawItem = function(index) {
        // 保持为空，不调用原始方法，这样原始文本不会被绘制
    };
    
    // 保持原始光标矩形为空，这样系统光标就不会显示
    Window_MenuCommand.prototype._refreshCursor = function() {
        if (this._cursorSprite) {
            this._cursorSprite.visible = false;
        }
        this.setCursorRect(0, 0, 0, 0);
    };
    
    // 完全覆盖drawBackgroundRect方法
    Window_MenuCommand.prototype._drawBackgroundRect = function(rect) {
        // 什么都不做，防止绘制背景矩形
    };
    
    // 处理鼠标/触摸选择
    const _Window_MenuCommand_processTouch = Window_MenuCommand.prototype.processTouch;
    Window_MenuCommand.prototype.processTouch = function() {
        _Window_MenuCommand_processTouch.call(this);
        
        if (this.isOpenAndActive() && TouchInput.isTriggered()) {
            const touchPos = new Point(TouchInput.x - this.x, TouchInput.y - this.y);
            let hitIndex = -1;
            
            // 检测是否点击了图标
            if (this._iconSprites) {
                for (let i = 0; i < this._iconSprites.length; i++) {
                    const sprite = this._iconSprites[i];
                    if (!sprite) continue;
                    
                    const rect = new Rectangle(
                        sprite.x, 
                        sprite.y, 
                        iconWidth, 
                        iconHeight
                    );
                    
                    if (touchPos.x >= rect.x && touchPos.x <= rect.x + rect.width &&
                        touchPos.y >= rect.y && touchPos.y <= rect.y + rect.height) {
                        hitIndex = i;
                        break;
                    }
                }
            }
            
            // 如果点击了有效图标，则选择并执行
            if (hitIndex >= 0) {
                this.select(hitIndex);
                this.processOk();
            }
        }
    };
    
    // 确保键盘和按钮输入能正常工作
    const _Window_MenuCommand_processOk = Window_MenuCommand.prototype.processOk;
    Window_MenuCommand.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            const symbol = this.currentSymbol();
            
            // 调试输出以确认选择的命令
            if (debugMode) {
                console.log("选择的命令:", symbol);
            }
            
            _Window_MenuCommand_processOk.call(this);
        } else {
            this.playBuzzerSound();
        }
    };
    
    //=============================================================================
    // 添加自定义菜单命令的支持 - FavorSystem 和 TaskSystem
    //=============================================================================
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        // 不调用原始方法，防止命令重复
        // 而是手动添加除了自定义命令外的所有命令
        this.addMainCommands();
        this.addFormationCommand();
        this.addOptionsCommand();
        this.addSaveCommand();
        this.addGameEndCommand();
        
        // 添加自定义命令 - 仅当它们没有被其他插件添加过
        const existingCommands = this._list ? this._list.map(cmd => cmd.symbol) : [];
        
        // 添加好感度系统命令 - 仅当它不存在时
        if (enableFavor && !existingCommands.includes("favor")) {
            this.addCommand(iconConfigs.favor.label, "favor", true);
        }
        
        // 添加任务系统命令 - 仅当它不存在时
        if (enableTask && !existingCommands.includes("task")) {
            this.addCommand(iconConfigs.task.label, "task", true);
        }
    };
    
    // 扩展Scene_Menu以处理自定义命令
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        
        // 确保取消处理器被设置
        if (this._commandWindow) {
            // 仅当处理器尚未设置时注册处理器
            if (!this._commandWindow.isHandled("favor")) {
                this._commandWindow.setHandler("favor", this.commandFavor.bind(this));
            }
            
            if (!this._commandWindow.isHandled("task")) {
                this._commandWindow.setHandler("task", this.commandTask.bind(this));
            }
        }
    };
    
    // 好感度系统命令处理 - 使用window.Scene_Favor直接调用
    Scene_Menu.prototype.commandFavor = function() {
        if (debugMode) {
            console.log("进入羁绊系统");
        }
        
        // 直接使用window.Scene_Favor
        SceneManager.push(window.Scene_Favor);
    };
    
    // 任务系统命令处理 - 尝试多种场景名称
    Scene_Menu.prototype.commandTask = function() {
        if (debugMode) {
            console.log("尝试进入任务系统");
        }
        
        try {
            // 尝试多种可能的场景名称
            const possibleScenes = [
                "Scene_TaskSystem", 
                "Scene_Task", 
                "Scene_Quest", 
                "Scene_QuestSystem"
            ];
            
            // 尝试所有可能的场景名称
            let sceneFound = false;
            for (const sceneName of possibleScenes) {
                const sceneClass = window[sceneName];
                if (typeof sceneClass === "function") {
                    // 直接使用类而不是实例
                    SceneManager.push(sceneClass);
                    sceneFound = true;
                    if (debugMode) {
                        console.log("成功进入:", sceneName);
                    }
                    return; // 立即返回，防止后续代码执行
                }
            }
            
            // 如果没有找到适合的场景，使用通用方法调用
            if (!sceneFound) {
                // 防止递归调用，检查当前场景类型
                if (SceneManager._scene && 
                    SceneManager._scene.constructor !== Scene_Menu &&
                    typeof SceneManager._scene.commandTask === "function") {
                    
                    // 防止循环递归
                    const originalMethod = SceneManager._scene.commandTask;
                    SceneManager._scene.commandTask = function() {
                        // 临时禁用该方法，防止递归
                        this.commandTask = function() { this.activate(); };
                        
                        // 执行一次后恢复原方法
                        const result = originalMethod.call(this);
                        this.commandTask = originalMethod;
                        return result;
                    };
                    
                    // 调用该方法
                    SceneManager._scene.commandTask();
                    
                    if (debugMode) {
                        console.log("使用当前场景的commandTask方法");
                    }
                    return; // 立即返回，防止后续代码执行
                } else {
                    // 直接展示简单消息，避免更复杂的尝试
                    alert("任务系统无法打开。请确认任务系统插件已正确安装。");
                    this._commandWindow.activate();
                }
            }
        } catch (e) {
            if (debugMode) {
                console.error("进入任务系统出错:", e);
            }
            
            // 更安全的错误处理，避免进一步操作可能导致的错误
            alert("任务系统发生错误，正在返回主菜单。");
            
            // 强制返回菜单场景
            try {
                this._commandWindow.activate();
            } catch (innerError) {
                // 如果激活窗口失败，尝试完全重新打开菜单
                SceneManager.goto(Scene_Menu);
            }
        }
    };
})(); 
