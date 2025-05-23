/*:
 * @target MZ
 * @plugindesc 自定义列表商店系统 v4.0.0 - Scene模式 
 * 
 * @author SekiShiyo
 * @help
 * 
 * This is a fully customizable shop system that uses a separate scene,
 * simulating the behavior of the default shop with support for:
 * shop configuration, item categorization, and custom UI layouts.
 * If you need a translation, please do it by yourself.
 *
 * 批量物品配置说明：
 * - 单个ID: "5"
 * - 连续范围: "1-10" 
 * - 混合格式: "1,3,5-8,12,15-20"
 * 
 * 使用方法：
 * 1. 在插件参数中配置商店和物品分类
 * 2. 使用插件指令打开指定商店
 * 
 * 插件指令：
 * - 打开商店: openShop shopId
 * 
 * @command openShop
 * @text 打开商店
 * @desc 打开指定ID的商店界面
 * 
 * @arg shopId
 * @text 商店ID
 * @desc 要打开的商店ID（需要在插件参数中预先配置）
 * @type string
 * @default 
 * 
 * @param windowSettings
 * @text 窗口设置
 * 
 * @param backgroundImage
 * @text 背景图片
 * @parent windowSettings
 * @type file
 * @dir img/pictures
 * @desc 商店窗口的背景图片
 * @default 
 * 
 * @param windowWidth
 * @text 窗口宽度
 * @parent windowSettings
 * @type number
 * @min 400
 * @max 1200
 * @desc 商店窗口的宽度
 * @default 600
 * 
 * @param windowHeight
 * @text 窗口高度
 * @parent windowSettings
 * @type number
 * @min 300
 * @max 800
 * @desc 商店窗口的高度
 * @default 500
 * 
 * @param windowX
 * @text 窗口X位置
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 商店窗口的X坐标（-1表示居中）
 * @default -1
 * 
 * @param windowY
 * @text 窗口Y位置
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 商店窗口的Y坐标（-1表示居中）
 * @default -1
 * 
 * @param backgroundScaleX
 * @text 背景X缩放
 * @parent windowSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3.0
 * @desc 背景图片的X轴缩放比例
 * @default 1.00
 * 
 * @param backgroundScaleY
 * @text 背景Y缩放
 * @parent windowSettings
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 3.0
 * @desc 背景图片的Y轴缩放比例
 * @default 1.00
 * 
 * @param backgroundOffsetX
 * @text 背景X偏移
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 500
 * @desc 背景图片的X轴偏移
 * @default 0
 * 
 * @param backgroundOffsetY
 * @text 背景Y偏移
 * @parent windowSettings
 * @type number
 * @min -500
 * @max 500
 * @desc 背景图片的Y轴偏移
 * @default 0
 * 
 * @param fontSize
 * @text 字体大小
 * @parent windowSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 界面字体大小
 * @default 16
 * 
 * @param buttonFontSize
 * @text 按钮字体大小
 * @parent windowSettings
 * @type number
 * @min 12
 * @max 28
 * @desc 按钮字体大小
 * @default 18
 * 
 * @param buyButtonFontSize
 * @text 购买按钮字体大小
 * @parent windowSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 购买按钮的字体大小
 * @default 18
 * 
 * @param sellButtonFontSize
 * @text 出售按钮字体大小
 * @parent windowSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 出售按钮的字体大小
 * @default 18
 * 
 * @param titleFontSize
 * @text 标题字体大小
 * @parent windowSettings
 * @type number
 * @min 16
 * @max 36
 * @desc 物品名称等标题字体大小
 * @default 20
 * 
 * @param buttonSettings
 * @text 按钮设置
 * 
 * @param buyButtonX
 * @text 购买按钮X位置
 * @parent buttonSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 购买按钮的X坐标（相对于窗口）
 * @default 50
 * 
 * @param buyButtonY
 * @text 购买按钮Y位置
 * @parent buttonSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 购买按钮的Y坐标（相对于窗口）
 * @default 20
 * 
 * @param sellButtonX
 * @text 出售按钮X位置
 * @parent buttonSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 出售按钮的X坐标（相对于窗口）
 * @default 150
 * 
 * @param sellButtonY
 * @text 出售按钮Y位置
 * @parent buttonSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 出售按钮的Y坐标（相对于窗口）
 * @default 20
 * 
 * @param colorSettings
 * @text 颜色设置
 * 
 * @param itemNameColor
 * @text 物品名称颜色
 * @parent colorSettings
 * @type string
 * @desc 物品名称的颜色 (十六进制格式，如 #ffffff)
 * @default #ffffff
 * 
 * @param priceColor
 * @text 价格颜色
 * @parent colorSettings
 * @type string
 * @desc 价格文字的颜色
 * @default #ffcc00
 * 
 * @param quantityColor
 * @text 数量颜色
 * @parent colorSettings
 * @type string
 * @desc 拥有数量的颜色
 * @default #00ff00
 * 
 * @param descriptionColor
 * @text 描述颜色
 * @parent colorSettings
 * @type string
 * @desc 物品描述的颜色
 * @default #cccccc
 * 
 * @param helpTextColor
 * @text 帮助文字颜色
 * @parent colorSettings
 * @type string
 * @desc 帮助文字的颜色
 * @default #ffffff
 * 
 * @param activeButtonColor
 * @text 激活按钮颜色
 * @parent colorSettings
 * @type string
 * @desc 当前激活按钮的颜色
 * @default #ffcc00
 * 
 * @param inactiveButtonColor
 * @text 非激活按钮颜色
 * @parent colorSettings
 * @type string
 * @desc 非激活按钮的颜色
 * @default #ffffff
 * 
 * @param shops
 * @text 商店列表
 * @type struct<Shop>[]
 * @desc 配置不同的商店
 * @default []
 * 
 * @param maxVisibleItems
 * @text 每页最大显示数量
 * @type number
 * @min 3
 * @max 20
 * @desc 一页最多显示多少个物品
 * @default 8
 * 
 * @param itemHeight
 * @text 物品行高
 * @type number
 * @min 30
 * @max 100
 * @desc 每个物品条目的高度
 * @default 50
 * 
 * @param layoutSettings
 * @text 布局设置
 * 
 * @param detailX
 * @text 详情窗口X位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 详情窗口的X坐标（相对于窗口，-1表示自动）
 * @default -1
 * 
 * @param detailY
 * @text 详情窗口Y位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 详情窗口的Y坐标（相对于窗口）
 * @default 100
 * 
 * @param goldX
 * @text 金币显示X位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 金币显示的X坐标（相对于窗口）
 * @default 20
 * 
 * @param goldY
 * @text 金币显示Y位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 金币显示的Y坐标（相对于窗口）
 * @default 460
 * 
 * @param globalShopkeeperX
 * @text 店员全局X位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 店员的全局X坐标（相对于窗口，商店单独设置会覆盖此值）
 * @default 20
 * 
 * @param globalShopkeeperY
 * @text 店员全局Y位置
 * @parent layoutSettings
 * @type number
 * @min -500
 * @max 1500
 * @desc 店员的全局Y坐标（相对于窗口，商店单独设置会覆盖此值）
 * @default 300
 * 
 * @param itemListWidth
 * @text 商品列表宽度
 * @parent layoutSettings
 * @type number
 * @min 150
 * @max 800
 * @desc 商品列表的宽度
 * @default 280
 * 
 * @param showItemNameInDetail
 * @text 详情中显示物品名
 * @parent layoutSettings
 * @type boolean
 * @desc 是否在物品详情中显示物品名称
 * @default true
 * 
 * @param detailSettings
 * @text 详情设置
 * 
 * @param detailItemNameFontSize
 * @text 详情物品名字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 36
 * @desc 详情中物品名称的字体大小
 * @default 20
 * 
 * @param detailItemNameColor
 * @text 详情物品名颜色
 * @parent detailSettings
 * @type string
 * @desc 详情中物品名称的颜色
 * @default #ffffff
 * 
 * @param detailItemNameX
 * @text 详情物品名X位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中物品名称的X位置（相对于详情窗口）
 * @default 10
 * 
 * @param detailItemNameY
 * @text 详情物品名Y位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中物品名称的Y位置（相对于详情窗口）
 * @default 10
 * 
 * @param detailPriceFontSize
 * @text 详情价格字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 详情中价格的字体大小
 * @default 16
 * 
 * @param detailPriceColor
 * @text 详情价格颜色
 * @parent detailSettings
 * @type string
 * @desc 详情中价格的颜色
 * @default #ffcc00
 * 
 * @param detailPriceX
 * @text 详情价格X位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中价格的X位置（相对于详情窗口）
 * @default 10
 * 
 * @param detailPriceY
 * @text 详情价格Y位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中价格的Y位置（相对于详情窗口）
 * @default 50
 * 
 * @param detailDescFontSize
 * @text 详情描述字体大小
 * @parent detailSettings
 * @type number
 * @min 10
 * @max 28
 * @desc 详情中描述的字体大小
 * @default 14
 * 
 * @param detailDescColor
 * @text 详情描述颜色
 * @parent detailSettings
 * @type string
 * @desc 详情中描述的颜色
 * @default #cccccc
 * 
 * @param detailDescX
 * @text 详情描述X位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中描述的X位置（相对于详情窗口）
 * @default 10
 * 
 * @param detailDescY
 * @text 详情描述Y位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中描述的Y位置（相对于详情窗口）
 * @default 80
 * 
 * @param detailQuantityFontSize
 * @text 详情拥有数量字体大小
 * @parent detailSettings
 * @type number
 * @min 12
 * @max 32
 * @desc 详情中拥有数量的字体大小
 * @default 16
 * 
 * @param detailQuantityColor
 * @text 详情拥有数量颜色
 * @parent detailSettings
 * @type string
 * @desc 详情中拥有数量的颜色
 * @default #00ff00
 * 
 * @param detailQuantityX
 * @text 详情拥有数量X位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中拥有数量的X位置（相对于详情窗口）
 * @default 10
 * 
 * @param detailQuantityY
 * @text 详情拥有数量Y位置
 * @parent detailSettings
 * @type number
 * @min -200
 * @max 500
 * @desc 详情中拥有数量的Y位置（相对于详情窗口）
 * @default 80
 */

/*~struct~Shop:
 * @param id
 * @text 商店ID
 * @type string
 * @desc 商店的唯一标识符
 * 
 * @param name
 * @text 商店名称
 * @type string
 * @desc 商店的显示名称
 * 
 * @param shopkeeperImage
 * @text 店员形象文件
 * @type file
 * @dir img/characters
 * @desc 店员的角色图片文件
 * @default 
 * 
 * @param shopkeeperIndex
 * @text 店员形象索引
 * @type number
 * @min 0
 * @max 11
 * @desc 角色格子索引（0-11，3列x4行布局）
 * @default 0
 * 
 * @param shopkeeperX
 * @text 店员X位置
 * @type number
 * @min -500
 * @max 1500
 * @desc 店员形象的X坐标（相对于窗口）
 * @default 20
 * 
 * @param shopkeeperY
 * @text 店员Y位置
 * @type number
 * @min -500
 * @max 1500
 * @desc 店员形象的Y坐标（相对于窗口）
 * @default 300
 * 
 * @param buyItems
 * @text 可购买物品（单个）
 * @type struct<ShopItem>[]
 * @desc 商店中可购买的单个物品列表
 * @default []
 * 
 * @param batchItems
 * @text 可购买物品（批量）
 * @type struct<BatchShopItem>[]
 * @desc 商店中可购买的批量物品列表
 * @default []
 */

/*~struct~ShopItem:
 * @param itemType
 * @text 物品类型
 * @type select
 * @option 物品
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @desc 物品的类型
 * 
 * @param itemId
 * @text 物品ID
 * @type number
 * @desc 物品的ID
 * 
 * @param price
 * @text 价格
 * @type number
 * @desc 物品价格（-1表示使用默认价格）
 * @default -1
 */

/*~struct~BatchShopItem:
 * @param itemType
 * @text 物品类型
 * @type select
 * @option 物品
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @desc 物品的类型
 * 
 * @param itemIds
 * @text 物品ID范围
 * @type string
 * @desc 批量物品ID，格式：1-10 或 1,3,5-8,12
 * 
 * @param priceMode
 * @text 价格模式
 * @type select
 * @option 使用默认价格
 * @value default
 * @option 自定义统一价格
 * @value custom
 * @desc 批量配置时的价格设置方式
 * @default default
 * 
 * @param price
 * @text 自定义价格
 * @type number
 * @desc 当价格模式为"自定义统一价格"时使用的价格
 * @default 100
 */

(() => {
    'use strict';
    
    // 获取插件参数
    const pluginName = "Seki_ShopGrid";
    const parameters = PluginManager.parameters(pluginName);
    
    // 解析窗口设置参数
    const backgroundImage = String(parameters['backgroundImage'] || '');
    const windowWidth = Number(parameters['windowWidth'] || 600);
    const windowHeight = Number(parameters['windowHeight'] || 500);
    const windowX = Number(parameters['windowX'] || -1);
    const windowY = Number(parameters['windowY'] || -1);
    const backgroundScaleX = Number(parameters['backgroundScaleX'] || 1.00);
    const backgroundScaleY = Number(parameters['backgroundScaleY'] || 1.00);
    const backgroundOffsetX = Number(parameters['backgroundOffsetX'] || 0);
    const backgroundOffsetY = Number(parameters['backgroundOffsetY'] || 0);
    const fontSize = Number(parameters['fontSize'] || 16);
    const buttonFontSize = Number(parameters['buttonFontSize'] || 18);
    const buyButtonFontSize = Number(parameters['buyButtonFontSize'] || 18);
    const sellButtonFontSize = Number(parameters['sellButtonFontSize'] || 18);
    const titleFontSize = Number(parameters['titleFontSize'] || 20);
    
    // 解析按钮设置参数
    const buyButtonX = Number(parameters['buyButtonX'] || 50);
    const buyButtonY = Number(parameters['buyButtonY'] || 20);
    const sellButtonX = Number(parameters['sellButtonX'] || 150);
    const sellButtonY = Number(parameters['sellButtonY'] || 20);
    
    // 解析布局设置参数
    const detailX = Number(parameters['detailX'] || -1);
    const detailY = Number(parameters['detailY'] || 100);
    const goldX = Number(parameters['goldX'] || 20);
    const goldY = Number(parameters['goldY'] || 460);
    const globalShopkeeperX = Number(parameters['globalShopkeeperX'] || 20);
    const globalShopkeeperY = Number(parameters['globalShopkeeperY'] || 300);
    const itemListWidth = Number(parameters['itemListWidth'] || 280);
    const showItemNameInDetail = parameters['showItemNameInDetail'] !== 'false';
    
    // 解析颜色设置参数
    const itemNameColor = String(parameters['itemNameColor'] || '#ffffff');
    const priceColor = String(parameters['priceColor'] || '#ffcc00');
    const quantityColor = String(parameters['quantityColor'] || '#00ff00');
    const descriptionColor = String(parameters['descriptionColor'] || '#cccccc');
    const helpTextColor = String(parameters['helpTextColor'] || '#ffffff');
    const activeButtonColor = String(parameters['activeButtonColor'] || '#ffcc00');
    const inactiveButtonColor = String(parameters['inactiveButtonColor'] || '#ffffff');
    
    const shops = JSON.parse(parameters['shops'] || '[]').map(shop => {
        const parsed = JSON.parse(shop);
        parsed.buyItems = JSON.parse(parsed.buyItems || '[]').map(item => JSON.parse(item));
        parsed.batchItems = JSON.parse(parsed.batchItems || '[]').map(item => JSON.parse(item));
        return parsed;
    });
    
    const maxVisibleItems = Number(parameters['maxVisibleItems'] || 8);
    const itemHeight = Number(parameters['itemHeight'] || 50);
    
    // 解析详情设置参数
    const detailItemNameFontSize = Number(parameters['detailItemNameFontSize'] || 20);
    const detailItemNameColor = String(parameters['detailItemNameColor'] || '#ffffff');
    const detailItemNameX = Number(parameters['detailItemNameX'] || 10);
    const detailItemNameY = Number(parameters['detailItemNameY'] || 10);
    
    const detailPriceFontSize = Number(parameters['detailPriceFontSize'] || 16);
    const detailPriceColor = String(parameters['detailPriceColor'] || '#ffcc00');
    const detailPriceX = Number(parameters['detailPriceX'] || 10);
    const detailPriceY = Number(parameters['detailPriceY'] || 50);
    
    const detailDescFontSize = Number(parameters['detailDescFontSize'] || 14);
    const detailDescColor = String(parameters['detailDescColor'] || '#cccccc');
    const detailDescX = Number(parameters['detailDescX'] || 10);
    const detailDescY = Number(parameters['detailDescY'] || 80);
    
    const detailQuantityFontSize = Number(parameters['detailQuantityFontSize'] || 16);
    const detailQuantityColor = String(parameters['detailQuantityColor'] || '#00ff00');
    const detailQuantityX = Number(parameters['detailQuantityX'] || 10);
    const detailQuantityY = Number(parameters['detailQuantityY'] || 80);
    
    // 解析ID范围字符串
    function parseIdRange(rangeStr) {
        const ids = [];
        const parts = rangeStr.split(',');
        
        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.includes('-')) {
                // 范围格式：1-10
                const [start, end] = trimmed.split('-').map(x => parseInt(x.trim()));
                for (let i = start; i <= end; i++) {
                    ids.push(i);
                }
            } else {
                // 单个ID
                const id = parseInt(trimmed);
                if (!isNaN(id)) {
                    ids.push(id);
                }
            }
        }
        
        return ids;
    }
    
    // 获取物品对象的辅助函数
    function getItemObject(itemType, itemId) {
        let item = null;
        switch (itemType) {
            case 'item': 
                item = $dataItems[itemId];
                break;
            case 'weapon': 
                item = $dataWeapons[itemId];
                break;
            case 'armor': 
                item = $dataArmors[itemId];
                break;
            default: 
                return null;
        }
        
        // 检查物品是否真的存在且有名称
        return (item && item.name && item.name.trim() !== '') ? item : null;
    }
    
    // 展开商店物品配置
    function expandShopItems(buyItems, batchItems) {
        const expandedItems = [];
        
        // 处理单个物品
        for (const shopItem of buyItems) {
            const itemObject = getItemObject(shopItem.itemType, shopItem.itemId);
            // 只添加存在的物品
            if (itemObject && itemObject.name) {
                expandedItems.push({
                    itemType: shopItem.itemType,
                    itemId: shopItem.itemId,
                    price: shopItem.price
                });
            }
        }
        
        // 处理批量物品
        for (const batchItem of batchItems) {
            if (batchItem.itemIds && batchItem.itemIds.trim()) {
                const ids = parseIdRange(batchItem.itemIds);
                for (const id of ids) {
                    const itemObject = getItemObject(batchItem.itemType, id);
                    // 只添加存在的物品
                    if (itemObject && itemObject.name) {
                        let itemPrice;
                        if (batchItem.priceMode === 'custom') {
                            itemPrice = batchItem.price || 100;
                        } else {
                            itemPrice = -1; // 使用默认价格
                        }
                        
                        expandedItems.push({
                            itemType: batchItem.itemType,
                            itemId: id,
                            price: itemPrice
                        });
                    }
                }
            }
        }
        
        return expandedItems;
    }
    
    // 插件指令
    PluginManager.registerCommand(pluginName, "openShop", args => {
        const shopId = args.shopId;
        SceneManager.push(Scene_CustomShop);
        SceneManager.prepareNextScene(shopId);
    });
    
    //=============================================================================
    // * 自定义商店场景
    //=============================================================================
    
    function Scene_CustomShop() {
        this.initialize(...arguments);
    }
    
    Scene_CustomShop.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_CustomShop.prototype.constructor = Scene_CustomShop;
    
    Scene_CustomShop.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._shopId = null;
        this._currentMode = 'buy';
        this._selectedIndex = 0;
        this._scrollIndex = 0;
        this._currentItems = [];
    };
    
    Scene_CustomShop.prototype.prepare = function(shopId) {
        this._shopId = shopId;
        this._shopData = shops.find(shop => shop.id === shopId);
        
        console.log('Opening shop:', shopId, this._shopData);
    };
    
    Scene_CustomShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createCustomBackground();
        this.createElements();
        this.refreshItems();
    };
    
    Scene_CustomShop.prototype.createCustomBackground = function() {
        // 只在有背景图片时创建背景，否则直接使用默认背景
        if (backgroundImage) {
            this._customBackground = new Sprite();
            this._customBackground.bitmap = ImageManager.loadPicture(backgroundImage);
            this._customBackground.bitmap.addLoadListener(() => {
                this._customBackground.scale.x = backgroundScaleX;
                this._customBackground.scale.y = backgroundScaleY;
                this._customBackground.x = (Graphics.width - this._customBackground.width * backgroundScaleX) / 2 + backgroundOffsetX;
                this._customBackground.y = (Graphics.height - this._customBackground.height * backgroundScaleY) / 2 + backgroundOffsetY;
            });
            this.addChild(this._customBackground);
        }
        // 如果没有背景图片，直接使用Scene_MenuBase的默认背景
    };
    
    Scene_CustomShop.prototype.createElements = function() {
        // 计算窗口位置
        const finalX = windowX === -1 ? (Graphics.width - windowWidth) / 2 : windowX;
        const finalY = windowY === -1 ? (Graphics.height - windowHeight) / 2 : windowY;
        
        // 创建主面板（不填充背景色）
        this._panelSprite = new Sprite();
        this._panelSprite.bitmap = new Bitmap(windowWidth, windowHeight);
        // 不填充任何背景色，保持透明
        this._panelSprite.x = finalX;
        this._panelSprite.y = finalY;
        this.addChild(this._panelSprite);
        
        // 存储面板位置供其他方法使用
        this._panelX = finalX;
        this._panelY = finalY;
        
        this.createButtons();
        this.createItemDisplay();
        this.createGoldDisplay();
        this.createShopkeeperDisplay();
    };
    
    Scene_CustomShop.prototype.createButtons = function() {
        // 买卖切换按钮
        this._buyButton = this.createTextButton('购买', this._panelX + buyButtonX, this._panelY + buyButtonY, () => {
            this._currentMode = 'buy';
            this._selectedIndex = 0;
            this._scrollIndex = 0;
            this.refreshItems();
        }, buyButtonFontSize);
        
        this._sellButton = this.createTextButton('出售', this._panelX + sellButtonX, this._panelY + sellButtonY, () => {
            this._currentMode = 'sell';
            this._selectedIndex = 0;
            this._scrollIndex = 0;
            this.refreshItems();
        }, sellButtonFontSize);
    };
    
    Scene_CustomShop.prototype.createTextButton = function(text, x, y, callback, customFontSize) {
        const sprite = new Sprite();
        sprite.bitmap = new Bitmap(80, 40);
        sprite.bitmap.fontFace = $gameSystem.mainFontFace();
        sprite.bitmap.fontSize = customFontSize || buttonFontSize;
        sprite.bitmap.textColor = inactiveButtonColor;
        sprite.bitmap.drawText(text, 0, 0, 80, 40, 'center');
        sprite.x = x;
        sprite.y = y;
        sprite._callback = callback;
        sprite._isButton = true;
        this.addChild(sprite);
        return sprite;
    };
    
    Scene_CustomShop.prototype.createItemDisplay = function() {
        // 物品列表区域
        this._itemListSprites = [];
        
        // 选择框
        this._selectionSprite = new Sprite();
        this._selectionSprite.bitmap = new Bitmap(itemListWidth, itemHeight);
        this._selectionSprite.bitmap.fillAll('#ffcc00');
        this._selectionSprite.opacity = 100;
        this._selectionSprite.visible = false;
        this.addChild(this._selectionSprite);
        
        // 详情显示区域
        const detailWidth = windowWidth - itemListWidth - 80; // 窗口宽度减去列表宽度和边距
        this._detailSprite = new Sprite();
        this._detailSprite.bitmap = new Bitmap(detailWidth, windowHeight - 100);
        
        // 计算详情窗口位置
        const finalDetailX = detailX === -1 ? this._panelX + itemListWidth + 60 : this._panelX + detailX;
        this._detailSprite.x = finalDetailX;
        this._detailSprite.y = this._panelY + detailY;
        this.addChild(this._detailSprite);
    };
    
    Scene_CustomShop.prototype.createGoldDisplay = function() {
        // 金币显示
        this._goldSprite = new Sprite();
        this._goldSprite.bitmap = new Bitmap(200, 30);
        this._goldSprite.x = this._panelX + goldX;
        this._goldSprite.y = this._panelY + goldY;
        this.addChild(this._goldSprite);
        this.refreshGoldDisplay();
    };
    
    Scene_CustomShop.prototype.refreshGoldDisplay = function() {
        this._goldSprite.bitmap.clear();
        this._goldSprite.bitmap.fontFace = $gameSystem.mainFontFace();
        this._goldSprite.bitmap.fontSize = fontSize;
        this._goldSprite.bitmap.textColor = priceColor;
        this._goldSprite.bitmap.drawText($gameParty.gold() + $dataSystem.currencyUnit, 0, 0, 200, 30);
    };
    
    Scene_CustomShop.prototype.createShopkeeperDisplay = function() {
        // 检查是否配置了店员形象
        console.log('Shop data:', this._shopData);
        console.log('Global shopkeeper position:', globalShopkeeperX, globalShopkeeperY);
        
        if (this._shopData && this._shopData.shopkeeperImage && this._shopData.shopkeeperImage.trim() !== '') {
            console.log('Creating shopkeeper with image:', this._shopData.shopkeeperImage);
            
            this._shopkeeperSprite = new Sprite();
            
            // 简化位置逻辑 - 优先使用商店设置，否则使用全局设置
            const shopkeeperX = Number(this._shopData.shopkeeperX || globalShopkeeperX);
            const shopkeeperY = Number(this._shopData.shopkeeperY || globalShopkeeperY);
            const shopkeeperIndex = Number(this._shopData.shopkeeperIndex || 0);
            
            console.log('Using shopkeeper position:', shopkeeperX, shopkeeperY, 'index:', shopkeeperIndex);
            
            // 先设置位置
            this._shopkeeperSprite.x = this._panelX + shopkeeperX;
            this._shopkeeperSprite.y = this._panelY + shopkeeperY;
            
            console.log('Absolute shopkeeper position:', this._shopkeeperSprite.x, this._shopkeeperSprite.y);
            
            // 加载角色图像
            this._shopkeeperSprite.bitmap = ImageManager.loadCharacter(this._shopData.shopkeeperImage);
            
            this._shopkeeperSprite.bitmap.addLoadListener(() => {
                console.log('Shopkeeper image loaded, size:', this._shopkeeperSprite.bitmap.width, 'x', this._shopkeeperSprite.bitmap.height);
                
                // 参考ChangeCloth插件的切割方法，适应3x4格式
                const sw = 48;  // 标准角色格子宽度
                const sh = 48;  // 标准角色格子高度
                
                // 计算切割位置（索引0-11，3列x4行）
                const col = shopkeeperIndex % 3;              // 列位置 (0-2)
                const row = Math.floor(shopkeeperIndex / 3);  // 行位置 (0-3)
                
                const sx = col * sw;
                const sy = row * sh;
                
                console.log('Cutting sprite - sw:', sw, 'sh:', sh, 'sx:', sx, 'sy:', sy, 'index:', shopkeeperIndex, 'col:', col, 'row:', row);
                
                // 使用和ChangeCloth相同的切割方法
                const characterBitmap = new Bitmap(sw, sh);
                characterBitmap.blt(this._shopkeeperSprite.bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
                
                // 替换精灵的位图
                this._shopkeeperSprite.bitmap = characterBitmap;
                
                console.log('Shopkeeper sprite final position:', this._shopkeeperSprite.x, this._shopkeeperSprite.y);
                console.log('Cropped sprite size: 48x48');
            });
            
            this.addChild(this._shopkeeperSprite);
            console.log('Shopkeeper sprite added to scene');
        } else {
            console.log('No shopkeeper image configured or image is empty');
        }
    };
    
    Scene_CustomShop.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.updateInput();
        this.updateTouch();
    };
    
    Scene_CustomShop.prototype.updateInput = function() {
        if (Input.isTriggered('cancel')) {
            this.popScene();
            return;
        }
        
        if (Input.isTriggered('ok')) {
            this.processOk();
            return;
        }
        
        if (Input.isRepeated('up')) {
            this.moveCursor(-1);
        } else if (Input.isRepeated('down')) {
            this.moveCursor(1);
        }
        
        if (Input.isTriggered('left')) {
            if (this._currentMode === 'sell') {
                this._buyButton._callback();
            }
        } else if (Input.isTriggered('right')) {
            if (this._currentMode === 'buy') {
                this._sellButton._callback();
            }
        }
    };
    
    Scene_CustomShop.prototype.updateTouch = function() {
        if (TouchInput.isTriggered()) {
            // 检查按钮点击
            const sprites = [this._buyButton, this._sellButton];
            for (const sprite of sprites) {
                if (this.isSpriteClicked(sprite)) {
                    sprite._callback();
                    return;
                }
            }
        }
    };
    
    Scene_CustomShop.prototype.isSpriteClicked = function(sprite) {
        const x = TouchInput.x;
        const y = TouchInput.y;
        return x >= sprite.x && x < sprite.x + sprite.bitmap.width &&
               y >= sprite.y && y < sprite.y + sprite.bitmap.height;
    };
    
    Scene_CustomShop.prototype.moveCursor = function(direction) {
        if (this._currentItems.length === 0) return;
        
        const newIndex = this._selectedIndex + direction;
        if (newIndex >= 0 && newIndex < this._currentItems.length) {
            this._selectedIndex = newIndex;
            
            // 更新滚动
            if (this._selectedIndex < this._scrollIndex) {
                this._scrollIndex = this._selectedIndex;
                this.refreshItemList();
            } else if (this._selectedIndex >= this._scrollIndex + maxVisibleItems) {
                this._scrollIndex = this._selectedIndex - maxVisibleItems + 1;
                this.refreshItemList();
            } else {
                this.refreshSelection();
            }
            
            this.refreshDetailWindow();
            SoundManager.playCursor();
        }
    };
    
    Scene_CustomShop.prototype.processOk = function() {
        if (this._currentItems.length === 0) return;
        
        const item = this._currentItems[this._selectedIndex];
        if (!item) return;
        
        if (this._currentMode === 'buy') {
            this.processBuy(item);
        } else {
            this.processSell(item);
        }
    };
    
    Scene_CustomShop.prototype.processBuy = function(item) {
        if ($gameParty.gold() >= item.finalPrice) {
            $gameParty.loseGold(item.finalPrice);
            $gameParty.gainItem(item.itemObject, 1);
            SoundManager.playShop();
            this.refreshDetailWindow();
            this.refreshGoldDisplay();
        } else {
            SoundManager.playBuzzer();
        }
    };
    
    Scene_CustomShop.prototype.processSell = function(item) {
        if ($gameParty.numItems(item.itemObject) > 0) {
            $gameParty.loseItem(item.itemObject, 1);
            $gameParty.gainGold(item.finalPrice);
            SoundManager.playShop();
            this.refreshItems(); // 重新刷新物品列表
            this.refreshGoldDisplay();
        } else {
            SoundManager.playBuzzer();
        }
    };
    
    Scene_CustomShop.prototype.refreshItems = function() {
        this._currentItems = [];
        
        if (this._currentMode === 'buy' && this._shopData) {
            // 购买模式
            const expandedItems = expandShopItems(this._shopData.buyItems, this._shopData.batchItems);
            console.log('Expanded items count:', expandedItems.length);
            
            this._currentItems = expandedItems.map(shopItem => {
                const itemObject = getItemObject(shopItem.itemType, shopItem.itemId);
                if (itemObject) {
                    return {
                        ...shopItem,
                        itemObject: itemObject,
                        finalPrice: shopItem.price >= 0 ? shopItem.price : itemObject.price
                    };
                }
                return null;
            }).filter(item => item !== null);
            
            console.log('Final items count:', this._currentItems.length);
        } else if (this._currentMode === 'sell') {
            // 出售模式 - 显示背包中所有有价值的物品
            const allItems = $gameParty.allItems();
            this._currentItems = allItems.filter(item => {
                return item && item.name && item.name.trim() !== '' && item.price > 0 && $gameParty.numItems(item) > 0;
            }).map(item => {
                const itemType = DataManager.isItem(item) ? 'item' : 
                               DataManager.isWeapon(item) ? 'weapon' : 'armor';
                return {
                    itemType: itemType,
                    itemId: item.id,
                    itemObject: item,
                    finalPrice: Math.floor(item.price / 2), // 一半价格
                    quantity: $gameParty.numItems(item)
                };
            });
        }
        
        // 确保选中索引在范围内
        if (this._selectedIndex >= this._currentItems.length) {
            this._selectedIndex = Math.max(0, this._currentItems.length - 1);
        }
        
        this.refreshItemList();
        this.refreshDetailWindow();
        this.refreshButtons();
    };
    
    Scene_CustomShop.prototype.refreshItemList = function() {
        // 清除旧的物品精灵
        this._itemListSprites.forEach(sprite => {
            if (sprite.parent) sprite.parent.removeChild(sprite);
        });
        this._itemListSprites = [];
        
        const startY = this._panelY + 80;
        
        // 显示当前页的物品
        const startIndex = this._scrollIndex;
        const endIndex = Math.min(startIndex + maxVisibleItems, this._currentItems.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = this._currentItems[i];
            const listIndex = i - startIndex;
            const y = startY + listIndex * itemHeight;
            
            // 创建物品精灵
            const itemSprite = new Sprite();
            itemSprite.bitmap = new Bitmap(itemListWidth, itemHeight);
            itemSprite.bitmap.fontFace = $gameSystem.mainFontFace();
            itemSprite.bitmap.fontSize = fontSize;
            itemSprite.x = this._panelX + 20;
            itemSprite.y = y;
            
            // 绘制图标
            if (item.itemObject.iconIndex > 0) {
                const iconIndex = item.itemObject.iconIndex;
                const iconBitmap = ImageManager.loadSystem('IconSet');
                const pw = ImageManager.iconWidth;
                const ph = ImageManager.iconHeight;
                const sx = (iconIndex % 16) * pw;
                const sy = Math.floor(iconIndex / 16) * ph;
                
                iconBitmap.addLoadListener(() => {
                    itemSprite.bitmap.blt(iconBitmap, sx, sy, pw, ph, 5, 5, 32, 32);
                });
            }
            
            // 绘制物品名称
            itemSprite.bitmap.textColor = itemNameColor;
            itemSprite.bitmap.drawText(item.itemObject.name, 45, 5, itemListWidth - 125, 20);
            
            // 绘制价格
            itemSprite.bitmap.textColor = priceColor;
            itemSprite.bitmap.drawText(item.finalPrice + $dataSystem.currencyUnit, itemListWidth - 80, 5, 75, 20, 'right');
            
            // 出售模式显示数量
            if (this._currentMode === 'sell' && item.quantity) {
                itemSprite.bitmap.textColor = quantityColor;
                itemSprite.bitmap.fontSize = Math.max(12, fontSize - 2);
                itemSprite.bitmap.drawText('x' + item.quantity, itemListWidth - 80, 25, 75, 20, 'right');
            }
            
            this.addChild(itemSprite);
            this._itemListSprites.push(itemSprite);
        }
        
        this.refreshSelection();
    };
    
    Scene_CustomShop.prototype.refreshSelection = function() {
        if (this._currentItems.length === 0) {
            this._selectionSprite.visible = false;
            return;
        }
        
        const visibleIndex = this._selectedIndex - this._scrollIndex;
        if (visibleIndex >= 0 && visibleIndex < maxVisibleItems) {
            // 重新创建选择框大小如果需要
            if (this._selectionSprite.bitmap.width !== itemListWidth) {
                this._selectionSprite.bitmap = new Bitmap(itemListWidth, itemHeight);
                this._selectionSprite.bitmap.fillAll('#ffcc00');
                this._selectionSprite.opacity = 100;
            }
            
            this._selectionSprite.x = this._panelX + 20;
            this._selectionSprite.y = this._panelY + 80 + visibleIndex * itemHeight;
            this._selectionSprite.visible = true;
        } else {
            this._selectionSprite.visible = false;
        }
    };
    
    Scene_CustomShop.prototype.refreshDetailWindow = function() {
        this._detailSprite.bitmap.clear();
        this._detailSprite.bitmap.fontFace = $gameSystem.mainFontFace();
        
        if (this._currentItems.length > 0 && this._selectedIndex < this._currentItems.length) {
            const item = this._currentItems[this._selectedIndex];
            
            // 物品名称（可选显示，使用自定义设置）
            if (showItemNameInDetail) {
                this._detailSprite.bitmap.fontSize = detailItemNameFontSize;
                this._detailSprite.bitmap.textColor = detailItemNameColor;
                this._detailSprite.bitmap.drawText(
                    item.itemObject.name, 
                    detailItemNameX, 
                    detailItemNameY, 
                    this._detailSprite.bitmap.width - detailItemNameX - 10, 
                    30
                );
            }
            
            // 价格（使用自定义设置）
            this._detailSprite.bitmap.fontSize = detailPriceFontSize;
            this._detailSprite.bitmap.textColor = detailPriceColor;
            const priceText = this._currentMode === 'buy' ? '购买价格: ' : '出售价格: ';
            this._detailSprite.bitmap.drawText(
                priceText + item.finalPrice + $dataSystem.currencyUnit, 
                detailPriceX, 
                detailPriceY, 
                this._detailSprite.bitmap.width - detailPriceX - 10, 
                25
            );
            
            // 拥有数量（如果是出售模式）
            if (this._currentMode === 'sell' && item.quantity) {
                // 使用价格的设置但位置稍微下移
                this._detailSprite.bitmap.fontSize = detailQuantityFontSize;
                this._detailSprite.bitmap.textColor = detailQuantityColor;
                this._detailSprite.bitmap.drawText(
                    '拥有数量: ' + item.quantity, 
                    detailQuantityX, 
                    detailQuantityY, 
                    this._detailSprite.bitmap.width - detailQuantityX - 10, 
                    25
                );
            }
            
            // 描述（使用自定义设置）
            this._detailSprite.bitmap.fontSize = detailDescFontSize;
            this._detailSprite.bitmap.textColor = detailDescColor;
            
            // 计算描述区域的可用高度
            const descAvailableHeight = this._detailSprite.bitmap.height - detailDescY - 20;
            const descAvailableWidth = this._detailSprite.bitmap.width - detailDescX - 10;
            
            this.drawWrappedText(
                item.itemObject.description, 
                detailDescX, 
                detailDescY, 
                descAvailableWidth, 
                descAvailableHeight
            );
        }
    };
    
    Scene_CustomShop.prototype.drawWrappedText = function(text, x, y, maxWidth, maxHeight) {
        const lineHeight = 18;
        const words = text.split('');
        let currentLine = '';
        let currentY = y;
        
        for (let i = 0; i < words.length; i++) {
            const char = words[i];
            const testLine = currentLine + char;
            const width = this._detailSprite.bitmap.measureTextWidth(testLine);
            
            if (width > maxWidth && currentLine) {
                this._detailSprite.bitmap.drawText(currentLine, x, currentY, maxWidth, lineHeight);
                currentLine = char;
                currentY += lineHeight;
                if (currentY + lineHeight > y + maxHeight) break;
            } else {
                currentLine = testLine;
            }
        }
        
        if (currentLine && currentY + lineHeight <= y + maxHeight) {
            this._detailSprite.bitmap.drawText(currentLine, x, currentY, maxWidth, lineHeight);
        }
    };
    
    Scene_CustomShop.prototype.refreshButtons = function() {
        // 更新按钮状态
        this._buyButton.bitmap.clear();
        this._buyButton.bitmap.fontFace = $gameSystem.mainFontFace();
        this._buyButton.bitmap.fontSize = buyButtonFontSize;
        this._buyButton.bitmap.textColor = this._currentMode === 'buy' ? activeButtonColor : inactiveButtonColor;
        this._buyButton.bitmap.drawText('购买', 0, 0, 80, 40, 'center');
        
        this._sellButton.bitmap.clear();
        this._sellButton.bitmap.fontFace = $gameSystem.mainFontFace();
        this._sellButton.bitmap.fontSize = sellButtonFontSize;
        this._sellButton.bitmap.textColor = this._currentMode === 'sell' ? activeButtonColor : inactiveButtonColor;
        this._sellButton.bitmap.drawText('出售', 0, 0, 80, 40, 'center');
    };
})(); 
