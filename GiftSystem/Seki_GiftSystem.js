/*:
 * @target MZ
 * @plugindesc Gift System Plugin v1.3.6 - Supports character name-based gifting by Seki
 * @author SekiShiyo
 *
 * @command Gift
 * @text Gift Operation
 * @desc Initiates the gifting process where the player selects an item to give to a specific character.
 *
 * @arg characterName
 * @type string
 * @text Character Name
 * @desc Enter the name of the character. The system will automatically match the corresponding configuration.
 *
 * @command GiftById
 * @text Gift Operation (by ID)
 * @desc Starts the gifting process using a character's configured ID.
 *
 * @arg characterId
 * @type number
 * @text Character ID
 * @desc The character ID defined in the plugin configuration, used to map affection and preferences.
 *
 * @param Characters
 * @text Character Gift Configurations
 * @type struct<CharacterGift>[]
 * @desc Configure all characters who can receive gifts, including affection variables, item preferences, and dialogue responses.
 *
 * @param DefaultValues
 * @text Default Settings
 * @type struct<GiftDefaults>
 * @desc Set default affection values for loved/liked/hated items.
 */

/*~struct~CharacterGift:
 * @param Id
 * @type number
 * @text Character ID
 *
 * @param ActorId
 * @type actor
 * @text RPG Actor ID
 * @desc The actor ID in the database used to fetch face image and name.
 *
 * @param FavorVariableId
 * @type variable
 * @text Affection Variable
 *
 * @param LoveItems
 * @type number[]
 * @text Loved Item IDs
 *
 * @param LikeItems
 * @type number[]
 * @text Liked Item IDs
 *
 * @param HateItems
 * @type number[]
 * @text Hated Item IDs
 *
 * @param MessageLove
 * @text Loved Response
 * @default Wow, this is my favorite thing ever!
 *
 * @param MessageLike
 * @text Liked Response
 * @default Thank you, I really like it.
 *
 * @param MessageHate
 * @text Hated Response
 * @default Are you sure you want to give me this...?
 *
 * @param FaceName
 * @type file
 * @dir img/faces/
 * @text Face Image
 * @desc Filename for the face graphic (leave empty to use the ActorId's default face).
 *
 * @param FaceIndex
 * @type number
 * @min 0
 * @max 7
 * @text Face Index
 * @desc Index position of the face in the image file (0–7).
 * @default 0
 *
 * @param CharacterName
 * @type string
 * @text Display Name
 * @desc Character name to show (leave empty to use the name from ActorId).
 */

/*~struct~GiftDefaults:
 * @param LoveValue
 * @type number
 * @default 20
 *
 * @param LikeValue
 * @type number
 * @default 10
 *
 * @param HateValue
 * @type number
 * @default -10
 */

(() => {
  const pluginName = "Seki_GiftSystem";
  const parameters = PluginManager.parameters(pluginName);
  const characters = JSON.parse(parameters.Characters || "[]").map(e => {
    const parsed = JSON.parse(e);
    parsed.LoveItems = parsed.LoveItems ? JSON.parse(parsed.LoveItems) : [];
    parsed.LikeItems = parsed.LikeItems ? JSON.parse(parsed.LikeItems) : [];
    parsed.HateItems = parsed.HateItems ? JSON.parse(parsed.HateItems) : [];
    return parsed;
  });
  const defaults = JSON.parse(parameters.DefaultValues || "{}");

  // 通过名称查找角色
  function findCharacterByName(name) {
    // 首先尝试完全匹配
    let charData = characters.find(c => 
      c.CharacterName === name || 
      (c.ActorId && $gameActors.actor(Number(c.ActorId)) && 
       $gameActors.actor(Number(c.ActorId)).name() === name)
    );
    
    // 如果没找到，尝试部分匹配
    if (!charData) {
      charData = characters.find(c => {
        const charName = c.CharacterName || 
          (c.ActorId && $gameActors.actor(Number(c.ActorId)) ? 
           $gameActors.actor(Number(c.ActorId)).name() : "");
        return charName.includes(name) || name.includes(charName);
      });
    }
    
    return charData;
  }

  // 通过名称送礼
  PluginManager.registerCommand(pluginName, "Gift", args => {
    const charName = args.characterName;
    const charData = findCharacterByName(charName);
    
    if (!charData) {
      console.warn(`未找到名称为"${charName}"的角色配置`);
      // 显示错误消息
      $gameMessage.add(`未找到名称为"${charName}"的角色配置`);
      return;
    }
    
    // 直接打开送礼菜单
    SceneManager.push(Scene_GiftItem);
    Scene_GiftItem.prepare(charData, defaults);
  });
  
  // 保留原来通过ID送礼的方法
  PluginManager.registerCommand(pluginName, "GiftById", args => {
    const charId = Number(args.characterId);
    const charData = characters.find(e => Number(e.Id) === charId);
    if (!charData) {
      console.warn("未找到角色配置：" + charId);
      return;
    }
    
    // 直接打开送礼菜单
    SceneManager.push(Scene_GiftItem);
    Scene_GiftItem.prepare(charData, defaults);
  });
  
  //=============================================================================
  // * 送礼场景 - 完全兼容GridItem界面
  //=============================================================================
  function Scene_GiftItem() {
    this.initialize(...arguments);
  }
  
  Scene_GiftItem.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_GiftItem.prototype.constructor = Scene_GiftItem;
  
  Scene_GiftItem._charData = null;
  Scene_GiftItem._defaults = null;
  
  Scene_GiftItem.prepare = function(charData, defaults) {
    this._charData = charData;
    this._defaults = defaults;
  };
  
  Scene_GiftItem.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };
  
  Scene_GiftItem.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createItemWindow();
    this._charData = Scene_GiftItem._charData;
    this._defaults = Scene_GiftItem._defaults;
  };
  
  // 重写helpAreaHeight方法，使其返回0以避免背景下移
  Scene_GiftItem.prototype.helpAreaHeight = function() {
    return 0;
  };
  
  // 重写onItemOk方法
  Scene_GiftItem.prototype.onItemOk = function() {
    this.processGiftItem(this.item());
  };
  
  // 获取当前选择的物品
  Scene_GiftItem.prototype.item = function() {
    return this._itemWindow.item();
  };
  
  // 重写actor方法，防止打开角色窗口
  Scene_GiftItem.prototype.actor = function() {
    return null;
  };
  
  // 重写user方法，防止打开角色窗口
  Scene_GiftItem.prototype.user = function() {
    return null;
  };
  
  // 重写物品是否可用的判断
  Scene_GiftItem.prototype.isItemEnabled = function(item) {
    return true;
  };
  
  // 重写物品窗口的创建方法
  Scene_GiftItem.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_GiftItemList(rect);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._itemWindow);
    this._itemWindow.refresh();
    this._itemWindow.select(0);
    this._itemWindow.activate();
  };
  
  // 重写物品窗口的矩形计算方法
  Scene_GiftItem.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = 0; // 从顶部开始，没有帮助窗口
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
  };
  
  // 自定义礼物物品列表窗口
  function Window_GiftItemList() {
    this.initialize(...arguments);
  }
  
  Window_GiftItemList.prototype = Object.create(Window_ItemList.prototype);
  Window_GiftItemList.prototype.constructor = Window_GiftItemList;
  
  // 重写物品是否可用的判断
  Window_GiftItemList.prototype.isEnabled = function(item) {
    return item ? true : false;
  };
  
  // 重写当前物品是否可用的判断
  Window_GiftItemList.prototype.isCurrentItemEnabled = function() {
    return this.item() ? true : false;
  };
  
  // 处理确定按钮
  Window_GiftItemList.prototype.processOk = function() {
    if (this.item()) {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callOkHandler();
    } else {
      this.playBuzzerSound();
    }
  };
  
  // 重写包含物品的判断，只显示普通物品
  Window_GiftItemList.prototype.includes = function(item) {
    // 只包含普通物品(itypeId === 1)，不包含重要物品(itypeId === 2)
    return item && 
           DataManager.isItem(item) && 
           item.itypeId === 1 && 
           $gameParty.numItems(item) > 0;
  };
  
  // 重写分类设置方法，始终显示所有物品
  Window_GiftItemList.prototype.setCategory = function(category) {
    // 不做任何事情，忽略分类
  };
  
  // 重写物品列表创建，显示所有物品
  Window_GiftItemList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(item => this.includes(item));
  };
  
  Scene_GiftItem.prototype.processGiftItem = function(item) {
    if (!item) return;
    
    const itemId = item.id;
    const name = item.name;
    
    const love = this._charData.LoveItems.map(Number);
    const like = this._charData.LikeItems.map(Number);
    const hate = this._charData.HateItems.map(Number);
    const favorVar = Number(this._charData.FavorVariableId);
    
    const loveVal = Number(this._defaults.LoveValue || 20);
    const likeVal = Number(this._defaults.LikeValue || 10);
    const hateVal = Number(this._defaults.HateValue || -10);
    
    const messageLove = this._charData.MessageLove || "哇，这是我最喜欢的东西了！";
    const messageLike = this._charData.MessageLike || "谢谢你，我很喜欢。";
    const messageHate = this._charData.MessageHate || "你确定要给我这个……？";
    
    // 获取角色信息
    const actorId = Number(this._charData.ActorId || 0);
    let faceName = this._charData.FaceName || "";
    let faceIndex = Number(this._charData.FaceIndex || 0);
    let characterName = this._charData.CharacterName || "";
    
    // 如果没有指定头像和名称，但指定了角色ID，则使用角色的头像和名称
    if (actorId > 0) {
      const actor = $gameActors.actor(actorId);
      if (actor) {
        if (!faceName) faceName = actor.faceName();
        if (!characterName) characterName = actor.name();
      }
    }
    
    // 如果还是没有头像，使用默认头像
    if (!faceName) {
      faceName = "Actor1";
      faceIndex = 0;
    }
    
    // 如果还是没有名称，使用默认名称
    if (!characterName) {
      characterName = "角色";
    }
    
    // 直接使用游戏消息系统显示确认对话
    $gameMessage.setFaceImage("", 0); // 不显示脸图
    $gameMessage.setBackground(0); // 0 = 普通窗口
    $gameMessage.setSpeakerName(""); // 不显示名字
    $gameMessage.add(`要送出【${name}】吗？`);
    
    // 显示选择
    $gameMessage.setChoices(["是", "否"], 0, 0);
    $gameMessage.setChoiceCallback(n => {
      if (n === 0) { // 选择"是"
        // 处理赠送礼物
        let favorChange = 0;
        let message = "";
        if (love.includes(itemId)) {
          favorChange = loveVal;
          message = messageLove;
        } else if (hate.includes(itemId)) {
          favorChange = hateVal;
          message = messageHate;
        } else {
          favorChange = likeVal;
          message = messageLike;
        }
        
        // 获取原有好感度
        const oldFavor = $gameVariables.value(favorVar);
        
        // 增加好感度
        $gameVariables.setValue(favorVar, oldFavor + favorChange);
        
        // 添加调试日志
        console.log(`送礼系统: 更新变量ID ${favorVar}, 原值 ${oldFavor}, 变化 ${favorChange}, 新值 ${oldFavor + favorChange}`);
        
        // 减少物品
        $gameParty.loseItem(item, 1);
        
        // 使用队列方式显示多个对话框
        const showMessages = () => {
          // 重置标记，确保每次送礼都能显示好感度变化
          $gameMessage._giftResponseShown = false;
          $gameMessage._favorChangeShown = false;
          
          // 1. 先显示角色回应 - 有脸图和名字
          $gameMessage.clear();
          $gameMessage.setFaceImage(faceName, faceIndex);
          $gameMessage.setBackground(0); // 0 = 普通窗口，改为普通窗口以避免透明
          $gameMessage.setSpeakerName(characterName);
          $gameMessage.add(message);
          
          // 保存原始更新函数
          const originalMessageUpdate = Window_Message.prototype.update;
          
          // 创建一个更新监听器函数
          const giftUpdateListener = function() {
            originalMessageUpdate.call(this);
            
            // 如果消息窗口处于空闲状态，且我们的回应已经显示但好感度消息尚未显示
            if (!this._textState && !$gameMessage.isBusy() && 
                $gameMessage._giftResponseShown && !$gameMessage._favorChangeShown) {
              
              // 标记好感度变化已显示
              $gameMessage._favorChangeShown = true;
              
              // 恢复原始更新函数
              Window_Message.prototype.update = originalMessageUpdate;
              
              // 显示好感度变化
              setTimeout(() => {
                $gameMessage.clear();
                $gameMessage.setFaceImage("", 0);
                $gameMessage.setBackground(0);
                $gameMessage.setSpeakerName("");
                
                let favorText = "";
                if (favorChange > 0) {
                  favorText = `好感度提升了 ${favorChange} 点！\n当前好感度：${oldFavor + favorChange}`;
                } else if (favorChange < 0) {
                  favorText = `好感度下降了 ${Math.abs(favorChange)} 点！\n当前好感度：${oldFavor + favorChange}`;
                } else {
                  favorText = `好感度没有变化。\n当前好感度：${oldFavor + favorChange}`;
                }
                
                $gameMessage.add(favorText);
              }, 100);
            }
            
            // 如果消息窗口显示完成且标记尚未设置，则设置标记
            if (!this._textState && !$gameMessage.isBusy() && !$gameMessage._giftResponseShown) {
              $gameMessage._giftResponseShown = true;
            }
          };
          
          // 设置更新监听器
          Window_Message.prototype.update = giftUpdateListener;
        };
        
        // 延迟一帧执行，确保场景已经切换到地图场景
        setTimeout(showMessages, 50);
      } else { // 选择"否"
        // 显示取消消息 - 系统消息，无脸图和名字
        $gameMessage.clear();
        $gameMessage.setFaceImage("", 0);
        $gameMessage.setBackground(0);
        $gameMessage.setSpeakerName("");
        $gameMessage.add("你决定不送出礼物。");
      }
    });
    
    // 关闭物品菜单
    this.popScene();
    
    // 确保回到地图场景
    SceneManager.goto(Scene_Map);
  };
})();
