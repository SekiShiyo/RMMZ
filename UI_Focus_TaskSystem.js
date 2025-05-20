// =============================================================================
// ExtremeSimpleTaskSystem.js
// =============================================================================
/*:
 * @target MZ
 * @plugindesc 动画效果但非常重UI（带动画背景）v1.1.0
 * @author SekiShiyo
 * @help
 * 
 * 〓 功能 〓
 * 
 * 1. 任务会出现在ESC唤起的主菜单内
 * 2. 可以通过插件命令接任务，完成任务
 * 3. 可以在插件参数中配置任务列表
 * 4. 简化的UI，支持动画背景、任务列表和任务详情
 * 5. 支持文本跑马灯效果，无缝循环滚动
 * 
 * 〓 插件命令 〓
 * 
 *    1. 接取任务       
 *    2. 完成任务       
 *    3. 打开任务界面   
 * 
 * 〓 脚本代码 〓
 * 
 * 1. 判断某个任务是否已经接取： $gameParty.hasTask(taskId)
 * 2. 判断某个任务是否完成： $gameParty.isTaskCompleted(taskId)
 * 3. 接取任务： $gameParty.takeTask(taskId)
 * 4. 完成任务： $gameParty.completeTask(taskId)
 * 5. 打开任务界面： SceneManager.push(Scene_Task)
 *
 * 〓 调试说明 〓
 * 
 * 1. 在插件参数中开启调试模式
 * 2. 在任务界面按下F5键可以切换调试信息显示
 * 3. 调试窗口会显示所有UI元素的坐标和尺寸
 * 4. 使用箭头键调整所选元素的位置（按住Shift可以调整尺寸）
 * 5. 按下S键保存当前调整后的配置到控制台
 *
 * 〓 动画背景使用说明 〓
 * 
 * 1. 将动画帧图片放入img/pictures文件夹
 * 2. 按照命名规则命名图片，例如"bg_frame1.png", "bg_frame2.png"等
 * 3. 配置动画背景相关参数
 *
 * @param taskList
 * @type struct<Task>[]
 * @text 任务列表
 * @desc 任务列表设置
 * @default []
 * 
 * @param backgroundImage
 * @type file
 * @dir img/pictures
 * @text 背景图片
 * @desc 任务界面背景图片
 * @default
 * 
 * @param backgroundX
 * @type number
 * @text 背景图X位置
 * @desc 背景图X位置
 * @default 0
 * 
 * @param backgroundY
 * @type number
 * @text 背景图Y位置
 * @desc 背景图Y位置
 * @default 0
 * 
 * @param listX
 * @type number
 * @text 任务列表X位置
 * @desc 任务列表X位置
 * @default 50
 * 
 * @param listY
 * @type number
 * @text 任务列表Y位置
 * @desc 任务列表Y位置
 * @default 100
 * 
 * @param listWidth
 * @type number
 * @text 任务列表宽度
 * @desc 任务列表宽度
 * @default 300
 * 
 * @param listHeight
 * @type number
 * @text 任务列表高度
 * @desc 任务列表高度
 * @default 400
 * 
 * @param listFontSize
 * @type number
 * @text 任务列表字体大小
 * @desc 任务列表字体大小
 * @default 20
 * 
 * @param lineHeight
 * @type number
 * @text 任务列表行高
 * @desc 固定的行高(像素)，影响任务列表中每项的高度
 * @default 36
 * 
 * @param maxVisibleTasks
 * @type number
 * @text 最大可见任务数
 * @desc 任务列表上同时显示的最大任务数量，超过会自动滚动
 * @default 10
 * 
 * @param selectionHighlightColor
 * @type number
 * @min 0
 * @max 31
 * @text 高亮选择颜色
 * @desc 选择任务时高亮的颜色(0-31的系统颜色索引)
 * @default 2
 * 
 * @param selectionHighlightOpacity
 * @type number
 * @min 0
 * @max 255
 * @text 高亮不透明度
 * @desc 高亮背景的不透明度(0-255)
 * @default 128
 * 
 * @param selectionHighlightPadding
 * @type number
 * @min 0
 * @max 10
 * @text 高亮内边距
 * @desc 高亮背景的内边距(0-10像素)
 * @default 2
 * 
 * @param selectionHighlightWidth
 * @type number
 * @min -1
 * @max 500
 * @text 高亮宽度
 * @desc 高亮区域的宽度。-1表示自动适应窗口宽度，0表示自动适应文本宽度，大于0表示固定宽度(像素)
 * @default -1
 * 
 * @param detailX
 * @type number
 * @text 任务详情X位置
 * @desc 任务详情X位置
 * @default 400
 * 
 * @param detailY
 * @type number
 * @text 任务详情Y位置
 * @desc 任务详情Y位置
 * @default 100
 * 
 * @param detailWidth
 * @type number
 * @text 任务详情宽度
 * @desc 任务详情宽度
 * @default 400
 * 
 * @param detailHeight
 * @type number
 * @text 任务详情高度
 * @desc 任务详情高度
 * @default 400
 * 
 * @param showTitleInDetail
 * @type boolean
 * @text 详情中显示任务名称
 * @desc 是否在详情窗口中显示任务名称
 * @default false
 * 
 * @param statusFontSize
 * @type number
 * @text 任务状态字体大小
 * @desc 任务状态字体大小
 * @default 20
 * 
 * @param statusX
 * @type number
 * @text 任务状态X位置
 * @desc 任务状态在详情窗口中的X位置
 * @default 0
 * 
 * @param statusY
 * @type number
 * @text 任务状态Y位置
 * @desc 任务状态在详情窗口中的Y位置
 * @default 0
 * 
 * @param titleFontSize
 * @type number
 * @text 任务标题字体大小
 * @desc 任务标题字体大小
 * @default 24
 * 
 * @param titleX
 * @type number
 * @text 任务标题X位置
 * @desc 任务标题在详情窗口中的X位置
 * @default 0
 * 
 * @param titleY
 * @type number
 * @text 任务标题Y位置
 * @desc 任务标题在详情窗口中的Y位置
 * @default 40
 * 
 * @param issuerFontSize
 * @type number
 * @text 发起人字体大小
 * @desc 发起人字体大小
 * @default 18
 * 
 * @param issuerX
 * @type number
 * @text 发起人X位置
 * @desc 发起人在详情窗口中的X位置
 * @default 0
 * 
 * @param issuerY
 * @type number
 * @text 发起人Y位置
 * @desc 发起人在详情窗口中的Y位置
 * @default 40
 * 
 * @param issuerLabelText
 * @type string
 * @text 发起人标签文本
 * @desc 发起人标签文本
 * @default 发起人：
 * 
 * @param locationFontSize
 * @type number
 * @text 任务地点字体大小
 * @desc 任务地点字体大小
 * @default 18
 * 
 * @param locationX
 * @type number
 * @text 任务地点X位置
 * @desc 任务地点在详情窗口中的X位置
 * @default 0
 * 
 * @param locationY
 * @type number
 * @text 任务地点Y位置
 * @desc 任务地点在详情窗口中的Y位置
 * @default 70
 * 
 * @param locationLabelText
 * @type string
 * @text 任务地点标签文本
 * @desc 任务地点标签文本
 * @default 地点：
 * 
 * @param descFontSize
 * @type number
 * @text 任务描述字体大小
 * @desc 任务描述字体大小
 * @default 18
 * 
 * @param descX
 * @type number
 * @text 任务描述X位置
 * @desc 任务描述在详情窗口中的X位置
 * @default 0
 * 
 * @param descY
 * @type number
 * @text 任务描述Y位置
 * @desc 任务描述在详情窗口中的Y位置
 * @default 100
 * 
 * @param descWidth
 * @type number
 * @text 任务描述最大宽度
 * @desc 任务描述的最大显示宽度，超出后启用滚动。设为0则不限制宽度
 * @default 0
 * 
 * @param descScrollSpeed
 * @type number
 * @min 1
 * @max 10
 * @text 描述滚动速度
 * @desc 任务描述文本滚动的速度(1-10)，数值越大滚动越快
 * @default 3
 * 
 * @param taskNameColor
 * @type number
 * @text 任务名称颜色
 * @desc 任务名称颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param ongoingStatusColor
 * @type number
 * @text 进行中状态颜色
 * @desc 进行中状态颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param completedStatusColor
 * @type number
 * @text 已完成状态颜色
 * @desc 已完成状态颜色(0-31的系统颜色索引)
 * @default 4
 * 
 * @param taskTitleColor
 * @type number
 * @text 详情中任务标题颜色
 * @desc 详情中任务标题颜色(0-31的系统颜色索引)
 * @default 0
 * 
 * @param issuerColor
 * @type number
 * @text 发起人颜色
 * @desc 发起人颜色(0-31的系统颜色索引)
 * @default 14
 * 
 * @param locationColor
 * @type number
 * @text 任务地点颜色
 * @desc 任务地点颜色(0-31的系统颜色索引)
 * @default 14
 * 
 * @param taskDescColor
 * @type number
 * @text 任务描述颜色
 * @desc 任务描述颜色(0-31的系统颜色索引)
 * @default 0
 *
 * @param debugMode
 * @type boolean
 * @text 调试模式
 * @desc 开启调试模式，可在任务界面中查看和调整UI元素的位置
 * @default false
 * 
 * @param useAnimatedBackground
 * @type boolean
 * @text 使用动画背景
 * @desc 是否使用动画背景替代静态背景图
 * @default false
 * 
 * @param frameBaseName
 * @type string
 * @text 动画帧基础名称
 * @desc 动画帧图片的基础名称，例如"bg_frame"会寻找"bg_frame1.png", "bg_frame2.png"等
 * @default bg_frame
 * 
 * @param frameCount
 * @type number
 * @text 动画帧数量
 * @desc 动画总共有多少帧
 * @default 5
 * 
 * @param animationSpeed
 * @type number
 * @text 动画速度
 * @desc 每隔多少游戏帧切换一次动画帧（60=1秒）
 * @default 10
 * 
 * @param loopAnimation
 * @type boolean
 * @text 循环动画
 * @desc 是否循环播放动画
 * @default true
 * 
 * @param bgScaleX
 * @type number
 * @decimals 2
 * @text 背景X轴缩放
 * @desc 背景图X轴缩放比例
 * @default 1.00
 * 
 * @param bgScaleY
 * @type number
 * @decimals 2
 * @text 背景Y轴缩放
 * @desc 背景图Y轴缩放比例
 * @default 1.00
 * 
 * @param bgOpacity
 * @type number
 * @min 0
 * @max 255
 * @text 背景透明度
 * @desc 背景图透明度 (0-255)
 * @default 255
 * 
 * @command takeTask
 * @text 接取任务
 * @desc 接取指定ID的任务
 *
 * @arg taskId
 * @type number
 * @text 任务ID
 * @desc 要接取的任务ID
 * @default 1
 *
 * @command completeTask
 * @text 完成任务
 * @desc 完成指定ID的任务
 *
 * @arg taskId
 * @type number
 * @text 任务ID
 * @desc 要完成的任务ID
 * @default 1
 *
 * @command openTaskScene
 * @text 打开任务界面
 * @desc 打开任务界面
 *
 */
/*~struct~Task:
 * @param id
 * @type number
 * @text 任务ID
 * @desc 任务ID（必须是唯一的）
 * @default 1
 * 
 * @param name
 * @type text
 * @text 任务名称
 * @desc 任务名称
 * @default 新任务
 * 
 * @param issuer
 * @type text
 * @text 发起人
 * @desc 任务发起人名称
 * @default NPC名称
 * 
 * @param location
 * @type text
 * @text 任务地点
 * @desc 任务执行地点
 * @default 地点名称
 * 
 * @param description
 * @type note
 * @text 任务描述
 * @desc 任务的详细描述
 * @default "这是一个新任务的描述。"
 * 
 */

// 首先定义所有全局变量，避免任何潜在的"not defined"错误
(function() {
    // 插件名称常量
    const PLUGIN_NAME = "UI_Focus_TaskSystem";
    
    // 全局设置存储对象
    window.TaskSystem = {};
    
    // 初始化参数
    const parameters = PluginManager.parameters(PLUGIN_NAME);
    
    // 解析并存储所有设置
    TaskSystem.settings = {
        backgroundImage: String(parameters['backgroundImage'] || ''),
        backgroundX: Number(parameters['backgroundX'] || 0),
        backgroundY: Number(parameters['backgroundY'] || 0),
        
        listX: Number(parameters['listX'] || 50),
        listY: Number(parameters['listY'] || 100),
        listWidth: Number(parameters['listWidth'] || 300),
        listHeight: Number(parameters['listHeight'] || 400),
        listFontSize: Number(parameters['listFontSize'] || 20),
        lineHeight: Number(parameters['lineHeight'] || 36),
        maxVisibleTasks: Number(parameters['maxVisibleTasks'] || 10),
        
        selectionHighlightColor: Number(parameters['selectionHighlightColor'] || 2),
        selectionHighlightOpacity: Number(parameters['selectionHighlightOpacity'] || 128),
        selectionHighlightPadding: Number(parameters['selectionHighlightPadding'] || 2),
        selectionHighlightWidth: Number(parameters['selectionHighlightWidth'] || -1),
        
        detailX: Number(parameters['detailX'] || 400),
        detailY: Number(parameters['detailY'] || 100),
        detailWidth: Number(parameters['detailWidth'] || 400),
        detailHeight: Number(parameters['detailHeight'] || 400),
        
        showTitleInDetail: parameters['showTitleInDetail'] === 'true',
        
        statusFontSize: Number(parameters['statusFontSize'] || 20),
        statusX: Number(parameters['statusX'] || 0),
        statusY: Number(parameters['statusY'] || 0),
        
        titleFontSize: Number(parameters['titleFontSize'] || 24),
        titleX: Number(parameters['titleX'] || 0),
        titleY: Number(parameters['titleY'] || 40),
        
        issuerFontSize: Number(parameters['issuerFontSize'] || 18),
        issuerX: Number(parameters['issuerX'] || 0),
        issuerY: Number(parameters['issuerY'] || 40),
        issuerLabelText: String(parameters['issuerLabelText'] || '发起人：'),
        
        locationFontSize: Number(parameters['locationFontSize'] || 18),
        locationX: Number(parameters['locationX'] || 0),
        locationY: Number(parameters['locationY'] || 70),
        locationLabelText: String(parameters['locationLabelText'] || '地点：'),
        
        descFontSize: Number(parameters['descFontSize'] || 18),
        descX: Number(parameters['descX'] || 0),
        descY: Number(parameters['descY'] || 100),
        descWidth: Number(parameters['descWidth'] || 0),
        descScrollSpeed: Math.min(10, Math.max(1, Number(parameters['descScrollSpeed'] || 3))),
        
        // 颜色设置
        taskNameColor: Number(parameters['taskNameColor'] || 0),
        ongoingStatusColor: Number(parameters['ongoingStatusColor'] || 0),
        completedStatusColor: Number(parameters['completedStatusColor'] || 4),
        taskTitleColor: Number(parameters['taskTitleColor'] || 0),
        issuerColor: Number(parameters['issuerColor'] || 14),
        locationColor: Number(parameters['locationColor'] || 14),
        taskDescColor: Number(parameters['taskDescColor'] || 0),
        
        // 动画背景设置
        useAnimatedBackground: parameters['useAnimatedBackground'] === 'true',
        frameBaseName: String(parameters['frameBaseName'] || 'bg_frame'),
        frameCount: Number(parameters['frameCount'] || 5),
        animationSpeed: Number(parameters['animationSpeed'] || 10),
        loopAnimation: parameters['loopAnimation'] !== 'false',
        bgScaleX: Number(parameters['bgScaleX'] || 1.0),
        bgScaleY: Number(parameters['bgScaleY'] || 1.0),
        bgOpacity: Number(parameters['bgOpacity'] || 255),
        
        // 调试模式
        debugMode: parameters['debugMode'] === 'true'
    };
    
    // 预加载动画帧
    TaskSystem.preloadAnimationFrames = function() {
        if (TaskSystem.settings.useAnimatedBackground) {
            for (let i = 1; i <= TaskSystem.settings.frameCount; i++) {
                const frameName = `${TaskSystem.settings.frameBaseName}${i}`;
                ImageManager.loadPicture(frameName);
            }
        }
    };
    
    // 任务数据解析和初始化
    TaskSystem.createTasks = function() {
        if (!window.$dataTasks) {
            window.$dataTasks = [null]; // ID 0 不使用
            
            try {
                const taskListParam = parameters['taskList'];
                if (taskListParam) {
                    const taskList = JSON.parse(taskListParam);
                    if (taskList && taskList.length) {
                        for (let i = 0; i < taskList.length; i++) {
                            const taskData = JSON.parse(taskList[i]);
                            const id = Number(taskData.id || 0);
                            
                            if (id > 0) {
                                while (window.$dataTasks.length <= id) {
                                    window.$dataTasks.push(null);
                                }
                                
                                window.$dataTasks[id] = {
                                    id: id,
                                    name: String(taskData.name || ''),
                                    issuer: String(taskData.issuer || ''),
                                    location: String(taskData.location || ''),
                                    description: JSON.parse(taskData.description || '""')
                                };
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("任务列表解析错误:", e);
                // 确保即使解析出错，仍然有一个有效的数组
                window.$dataTasks = [null];
            }
        }
    };
    
    //-----------------------------------------------------------------------------
    // Game_Party - 扩展任务相关方法
    //-----------------------------------------------------------------------------
    
    const Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        Game_Party_initialize.call(this);
        this._tasks = []; // 进行中的任务ID
        this._completedTasks = []; // 已完成的任务ID
    };
    
    Game_Party.prototype.hasTask = function(taskId) {
        if (!this._tasks) this._tasks = [];
        return this._tasks.includes(taskId);
    };
    
    Game_Party.prototype.isTaskCompleted = function(taskId) {
        if (!this._completedTasks) this._completedTasks = [];
        return this._completedTasks.includes(taskId);
    };
    
    Game_Party.prototype.takeTask = function(taskId) {
        if (!this._tasks) this._tasks = [];
        if (!this._completedTasks) this._completedTasks = [];
        
        if (!this.hasTask(taskId) && !this.isTaskCompleted(taskId)) {
            this._tasks.push(taskId);
        }
    };
    
    Game_Party.prototype.completeTask = function(taskId) {
        if (!this._tasks) this._tasks = [];
        if (!this._completedTasks) this._completedTasks = [];
        
        if (this.hasTask(taskId)) {
            this._tasks = this._tasks.filter(id => id !== taskId);
            this._completedTasks.push(taskId);
        }
    };
    
    //-----------------------------------------------------------------------------
    // TaskDetailWindow - 任务详情窗口
    //-----------------------------------------------------------------------------
    
    // 定义窗口类并立即添加到全局空间
    window.TaskDetailWindow = function() {
        this.initialize(...arguments);
    };
    
    TaskDetailWindow.prototype = Object.create(Window_Base.prototype);
    TaskDetailWindow.prototype.constructor = TaskDetailWindow;
    
    TaskDetailWindow.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._task = null;
        this.opacity = 0;
        this.frameVisible = false;
        this._descScrollX = 0;
        this._descFullWidth = 0;        // 描述文本完整宽度
        this._descTextCache = null;     // 描述文本缓存
        this.refresh();
    };
    
    TaskDetailWindow.prototype.setTask = function(task) {
        if (this._task !== task) {
            this._task = task;
            // 重置滚动状态
            this._descScrollX = 0;
            this._descTextCache = null;
            this.refresh();
        }
    };
    
    TaskDetailWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.updateDescriptionScroll();
    };
    
    TaskDetailWindow.prototype.updateDescriptionScroll = function() {
        // 只有在设置了有效的描述宽度并且有任务时才滚动
        if (!this._task || !TaskSystem.settings.descWidth || !this._descTextCache) return;
        
        // 如果描述文本不需要滚动（完整宽度小于限制宽度），直接返回
        if (this._descFullWidth <= TaskSystem.settings.descWidth) return;
        
        // 跑马灯式无缝循环滚动
        this._descScrollX += TaskSystem.settings.descScrollSpeed;
        
        // 如果滚动超过一定位置，重置滚动位置，从而实现无缝循环
        // 但不是重置为0，而是仅仅减去文本宽度，保持滚动的连续性
        if (this._descScrollX >= this._descFullWidth) {
            this._descScrollX = this._descScrollX - this._descFullWidth;
        }
        
        // 刷新描述区域
        this.refreshDescription();
    };
    
    TaskDetailWindow.prototype.refresh = function() {
        this.contents.clear();
        
        if (!this._task) return;
        
        const taskData = $dataTasks && $dataTasks[this._task.id];
        if (!taskData) return;
        
        // 绘制任务状态
        this.contents.fontSize = TaskSystem.settings.statusFontSize;
        const statusText = this._task.status === 'ongoing' ? '进行中' : '已完成';
        
        // 设置任务状态颜色
        if (this._task.status === 'completed') {
            this.changeTextColor(ColorManager.textColor(TaskSystem.settings.completedStatusColor));
        } else {
            this.changeTextColor(ColorManager.textColor(TaskSystem.settings.ongoingStatusColor));
        }
        
        this.drawText(statusText, TaskSystem.settings.statusX, TaskSystem.settings.statusY, 200);
        
        // 绘制任务标题（可选）
        if (TaskSystem.settings.showTitleInDetail) {
            this.changeTextColor(ColorManager.textColor(TaskSystem.settings.taskTitleColor));
            this.contents.fontSize = TaskSystem.settings.titleFontSize;
            this.drawText(taskData.name, TaskSystem.settings.titleX, TaskSystem.settings.titleY, this.innerWidth);
        }
        
        // 绘制发起人
        this.changeTextColor(ColorManager.textColor(TaskSystem.settings.issuerColor));
        this.contents.fontSize = TaskSystem.settings.issuerFontSize;
        this.drawText(TaskSystem.settings.issuerLabelText + taskData.issuer, 
                    TaskSystem.settings.issuerX, TaskSystem.settings.issuerY, this.innerWidth);
        
        // 绘制任务地点
        this.changeTextColor(ColorManager.textColor(TaskSystem.settings.locationColor));
        this.contents.fontSize = TaskSystem.settings.locationFontSize;
        this.drawText(TaskSystem.settings.locationLabelText + taskData.location, 
                    TaskSystem.settings.locationX, TaskSystem.settings.locationY, this.innerWidth);
        
        // 绘制任务描述
        this.drawDescription(taskData.description);
    };
    
    TaskDetailWindow.prototype.drawDescription = function(description) {
        // 确保description是字符串
        description = String(description || '');
        
        // 保存描述文本以供滚动使用
        this._descTextCache = description;
        
        // 设置描述字体大小和颜色
        this.resetTextColor(); // 先重置颜色，避免drawTextEx继承前面的颜色
        this.resetFontSettings();
        this.contents.fontSize = TaskSystem.settings.descFontSize;
        this.changeTextColor(ColorManager.textColor(TaskSystem.settings.taskDescColor));
        
        // 如果不需要滚动，直接绘制完整文本
        if (!TaskSystem.settings.descWidth) {
            this.drawFormattedText(description, TaskSystem.settings.descX, TaskSystem.settings.descY, this.innerWidth);
            return;
        }
        
        // 计算描述文本的完整宽度
        this._descFullWidth = this.textSizeEx(description);
        
        // 刷新描述区域
        this.refreshDescription();
    };
    
    TaskDetailWindow.prototype.refreshDescription = function() {
        if (!this._descTextCache) return;
        
        // 确保缓存的文本是字符串
        const descText = String(this._descTextCache || '');
        
        // 清除描述区域
        const descAreaHeight = 200; // 假设描述区域的高度为200像素，可以根据实际调整
        this.contents.clearRect(
            TaskSystem.settings.descX, 
            TaskSystem.settings.descY, 
            this.innerWidth, 
            descAreaHeight
        );
        
        // 创建一个裁剪矩形，限制绘制区域
        const descWidth = TaskSystem.settings.descWidth || this.innerWidth;
        const clipX = TaskSystem.settings.descX;
        const clipY = TaskSystem.settings.descY;
        const clipWidth = Math.min(descWidth, this.innerWidth - clipX);
        const clipHeight = descAreaHeight;
        
        // 保存当前上下文状态
        const context = this.contents.context;
        context.save();
        
        // 设置裁剪区域
        context.beginPath();
        context.rect(clipX, clipY, clipWidth, clipHeight);
        context.clip();
        
        // 重置字体设置并应用描述字体大小
        this.resetFontSettings();
        this.contents.fontSize = TaskSystem.settings.descFontSize;
        this.changeTextColor(ColorManager.textColor(TaskSystem.settings.taskDescColor));
        
        // 计算绘制文本的实际X坐标
        const drawX = TaskSystem.settings.descX - this._descScrollX;
        
        // 绘制第一次文本
        this.drawFormattedText(descText, drawX, TaskSystem.settings.descY, this._descFullWidth);
        
        // 绘制第二次文本（紧接在第一次文本后面，形成无缝循环）
        // 只有当滚动已经开始并且文本宽度大于显示区域时才需要
        if (this._descFullWidth > descWidth && this._descScrollX > 0) {
            const secondDrawX = drawX + this._descFullWidth;
            this.drawFormattedText(descText, secondDrawX, TaskSystem.settings.descY, this._descFullWidth);
        }
        
        // 恢复上下文状态
        context.restore();
    };
    
    // 测量文本尺寸
    TaskDetailWindow.prototype.textSizeEx = function(text) {
        // 确保text是字符串
        text = String(text || '');
        
        // 保存当前字体设置
        const originalFontSize = this.contents.fontSize;
        
        // 设置正确的字体大小进行测量
        this.resetFontSettings();
        this.contents.fontSize = TaskSystem.settings.descFontSize;
        
        // 使用Window_Base的textSizeEx方法（如果可用）
        let textWidth = 0;
        if (Window_Base.prototype.textSizeEx) {
            const size = Window_Base.prototype.textSizeEx.call(this, text);
            textWidth = size.width;
        } else {
            // 备用方法：估算文本宽度
            textWidth = this.textWidth(text) * 1.2; // 添加额外空间
        }
        
        // 恢复原始字体设置
        this.contents.fontSize = originalFontSize;
        
        // 返回估计的宽度
        return textWidth;
    };
    
    // 计算文本高度
    TaskDetailWindow.prototype.calcTextHeight = function(text) {
        // 确保text是字符串
        text = String(text || '');
        if (!text) return this.lineHeight();
        const lines = text.split('\n');
        return this.lineHeight() * lines.length;
    };
    
    // 添加一个自定义的文本绘制方法，能正确应用字体大小
    TaskDetailWindow.prototype.drawFormattedText = function(text, x, y, width) {
        if (!text) return 0;
        
        // 保存当前字体设置
        const originalFontSize = this.contents.fontSize;
        
        // 创建临时位图来预处理和计算文本
        const tempBitmap = new Bitmap(width || 1000, this.lineHeight() * 4);
        tempBitmap.fontFace = this.contents.fontFace;
        tempBitmap.fontSize = TaskSystem.settings.descFontSize;  // 使用我们想要的字体大小
        tempBitmap.textColor = this.contents.textColor;
        
        // 绘制文本到临时位图
        const textLines = text.split('\n');
        let totalHeight = 0;
        
        for (let i = 0; i < textLines.length; i++) {
            tempBitmap.drawText(textLines[i], 0, i * this.lineHeight(), width || 1000, this.lineHeight());
            totalHeight += this.lineHeight();
        }
        
        // 从临时位图绘制到目标位图
        this.contents.blt(tempBitmap, 0, 0, width || tempBitmap.width, totalHeight, x, y);
        
        // 恢复原始字体大小
        this.contents.fontSize = originalFontSize;
        
        return totalHeight;
    };
    
    //-----------------------------------------------------------------------------
    // TaskListWindow - 任务列表窗口
    //-----------------------------------------------------------------------------
    
    window.TaskListWindow = function() {
        this.initialize(...arguments);
    };
    
    TaskListWindow.prototype = Object.create(Window_Base.prototype);
    TaskListWindow.prototype.constructor = TaskListWindow;
    
    TaskListWindow.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._index = 0;
        this._scrollIndex = 0;  // 表示当前第一个可见项的索引
        this._data = [];
        this._detailWindow = null;
        this.opacity = 0;
        this.frameVisible = false;
        this._maxVisibleItems = Math.floor(this.innerHeight / this.itemHeight());
        this._handlers = {};
        this._touchSelectIndex = -1;
        
        // 完全隐藏原生光标
        this.setCursorRect(0, 0, 0, 0);
        
        // 创建自定义高亮背景精灵
        this._highlightSprite = new Sprite();
        this._highlightSprite.bitmap = new Bitmap(1, 1);
        // 使用自定义颜色和不透明度
        const highlightColor = ColorManager.textColor(TaskSystem.settings.selectionHighlightColor);
        this._highlightSprite.opacity = TaskSystem.settings.selectionHighlightOpacity;
        this._highlightSprite.bitmap.fillAll(highlightColor);
        this.addChildToBack(this._highlightSprite);
        
        this.refresh();
        this.select(0);
    };
    
    // 固定行高
    TaskListWindow.prototype.itemHeight = function() {
        return TaskSystem.settings.lineHeight || 36;
    };
    
    // 获取可见行数
    TaskListWindow.prototype.maxVisibleItems = function() {
        return Math.min(
            TaskSystem.settings.maxVisibleTasks || 10,
            this._maxVisibleItems || 10
        );
    };
    
    // 总项目数
    TaskListWindow.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };
    
    // 处理输入
    TaskListWindow.prototype.processHandling = function() {
        if (this.isOpenAndActive()) {
            if (this.isOkTriggered() && this.maxItems() > 0) {
                this.processOk();
            } else if (this.isCancelTriggered()) {
                this.processCancel();
            }
        }
    };
    
    TaskListWindow.prototype.processOk = function() {
        if (this._handlers.ok) {
            this.playOkSound();
            this._handlers.ok();
        }
    };
    
    TaskListWindow.prototype.processCancel = function() {
        if (this._handlers.cancel) {
            this.playCancelSound();
            this._handlers.cancel();
        }
    };
    
    TaskListWindow.prototype.isOkTriggered = function() {
        return Input.isTriggered("ok");
    };
    
    TaskListWindow.prototype.isCancelTriggered = function() {
        return Input.isTriggered("cancel");
    };
    
    TaskListWindow.prototype.setHandler = function(symbol, method) {
        this._handlers[symbol] = method;
    };
    
    TaskListWindow.prototype.callHandler = function(symbol) {
        if (this._handlers[symbol]) {
            this._handlers[symbol]();
        }
    };
    
    // 处理光标移动
    TaskListWindow.prototype.processCursorMove = function() {
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            if (Input.isRepeated("down")) {
                this.cursorDown();
            }
            if (Input.isRepeated("up")) {
                this.cursorUp();
            }
            if (this.index() !== lastIndex) {
                this.playCursorSound();
            }
        }
    };
    
    TaskListWindow.prototype.isCursorMovable = function() {
        return this.isOpenAndActive() && this.maxItems() > 0;
    };
    
    TaskListWindow.prototype.cursorDown = function() {
        if (this.index() < this.maxItems() - 1) {
            this.select(this.index() + 1);
        }
    };
    
    TaskListWindow.prototype.cursorUp = function() {
        if (this.index() > 0) {
            this.select(this.index() - 1);
        }
    };
    
    TaskListWindow.prototype.isOpenAndActive = function() {
        return this.active;
    };
    
    TaskListWindow.prototype.activate = function() {
        this.active = true;
    };
    
    TaskListWindow.prototype.deactivate = function() {
        this.active = false;
    };
    
    TaskListWindow.prototype.playOkSound = function() {
        SoundManager.playOk();
    };
    
    TaskListWindow.prototype.playCursorSound = function() {
        SoundManager.playCursor();
    };
    
    TaskListWindow.prototype.playCancelSound = function() {
        SoundManager.playCancel();
    };
    
    // 获取/设置当前选中索引
    TaskListWindow.prototype.index = function() {
        return this._index;
    };
    
    // 选择项目
    TaskListWindow.prototype.select = function(index) {
        const maxItems = this.maxItems();
        if (maxItems === 0) {
            this._index = -1;
            this._highlightSprite.visible = false;
            return;
        }
        
        // 确保索引在有效范围内
        this._index = index.clamp(0, maxItems - 1);
        
        // 更新滚动位置
        this.updateScrollPosition();
        
        // 更新光标位置
        this.updateCursor();
        
        // 更新详情窗口
        this.updateDetailWindow();
        
        // 触发选择事件
        if (this._handlers.select) {
            this.callHandler('select');
        }
    };
    
    // 更新滚动位置
    TaskListWindow.prototype.updateScrollPosition = function() {
        const index = this.index();
        const maxVisibleItems = this.maxVisibleItems();
        
        // 如果选中项在当前可见区域上方，向上滚动
        if (index < this._scrollIndex) {
            this._scrollIndex = index;
        }
        // 如果选中项在当前可见区域下方，向下滚动
        else if (index >= this._scrollIndex + maxVisibleItems) {
            this._scrollIndex = index - maxVisibleItems + 1;
        }
        
        // 确保滚动索引不会超出范围
        this._scrollIndex = this._scrollIndex.clamp(0, Math.max(0, this.maxItems() - maxVisibleItems));
        
        this.refresh();
    };
    
    // 更新光标
    TaskListWindow.prototype.updateCursor = function() {
        const index = this.index();
        const scrollIndex = this._scrollIndex;
        const maxVisibleItems = this.maxVisibleItems();
        
        // 确保原生光标保持隐藏
        this.setCursorRect(0, 0, 0, 0);
        
        // 只有当选中项在可见区域内时才显示高亮
        if (index >= scrollIndex && index < scrollIndex + maxVisibleItems) {
            const rect = this.itemRect(index - scrollIndex);
            
            // 更新高亮精灵位置和大小
            this._highlightSprite.visible = true;
            const padding = TaskSystem.settings.selectionHighlightPadding;
            this._highlightSprite.x = rect.x + this.padding + padding;
            this._highlightSprite.y = rect.y + this.padding + padding;
            
            // 计算高亮宽度
            let highlightWidth;
            const customWidth = TaskSystem.settings.selectionHighlightWidth;
            
            if (customWidth === -1) {
                // 自动适应窗口宽度
                highlightWidth = this.innerWidth - (padding * 2);
            } else if (customWidth === 0) {
                // 自动适应文本宽度
                const task = this._data[index];
                if (task) {
                    const textWidth = this.textWidth(task.name);
                    highlightWidth = textWidth + 8 - (padding * 2); // 8是额外的边距
                } else {
                    highlightWidth = rect.width - (padding * 2);
                }
            } else {
                // 使用自定义宽度
                highlightWidth = customWidth;
            }
            
            const highlightHeight = rect.height - (padding * 2);
            
            // 如果高亮精灵的bitmap尺寸与计算的高亮尺寸不匹配，重新创建bitmap
            if (this._highlightSprite.bitmap.width !== highlightWidth || 
                this._highlightSprite.bitmap.height !== highlightHeight) {
                this._highlightSprite.bitmap = new Bitmap(highlightWidth, highlightHeight);
                const highlightColor = ColorManager.textColor(TaskSystem.settings.selectionHighlightColor);
                this._highlightSprite.bitmap.fillAll(highlightColor);
            }
        } else {
            this._highlightSprite.visible = false;
        }
    };
    
    // 获取项目矩形
    TaskListWindow.prototype.itemRect = function(visibleIndex) {
        const itemHeight = this.itemHeight();
        return {
            x: 0,
            y: visibleIndex * itemHeight,
            width: this.innerWidth,
            height: itemHeight
        };
    };
    
    // 刷新窗口
    TaskListWindow.prototype.refresh = function() {
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
        this.updateCursor();
    };
    
    // 获取当前项
    TaskListWindow.prototype.item = function() {
        return this._data && this._index >= 0 && this._index < this._data.length ? 
            this._data[this._index] : null;
    };
    
    // 处理更新
    TaskListWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        this.processCursorMove();
        this.processHandling();
        this.updateCursor(); // 每帧更新光标，确保高亮不闪烁
    };
    
    // 构建项目列表
    TaskListWindow.prototype.makeItemList = function() {
        this._data = [];
        
        // 先添加进行中的任务
        if ($gameParty && $gameParty._tasks) {
            for (const taskId of $gameParty._tasks) {
                if ($dataTasks && $dataTasks[taskId]) {
                    const task = $dataTasks[taskId];
                    if (task) {
                        this._data.push({
                            id: taskId,
                            name: task.name,
                            status: 'ongoing'
                        });
                    }
                }
            }
        }
        
        // 再添加已完成的任务
        if ($gameParty && $gameParty._completedTasks) {
            for (const taskId of $gameParty._completedTasks) {
                if ($dataTasks && $dataTasks[taskId]) {
                    const task = $dataTasks[taskId];
                    if (task) {
                        this._data.push({
                            id: taskId,
                            name: task.name,
                            status: 'completed'
                        });
                    }
                }
            }
        }
    };
    
    // 绘制所有项目
    TaskListWindow.prototype.drawAllItems = function() {
        if (!this.contents || !this._data) return;
        
        this.contents.clear();
        
        const maxVisibleItems = this.maxVisibleItems();
        for (let i = 0; i < maxVisibleItems; i++) {
            const dataIndex = this._scrollIndex + i;
            if (dataIndex < this.maxItems()) {
                this.drawItem(dataIndex, i);
            }
        }
    };
    
    // 绘制单个项目
    TaskListWindow.prototype.drawItem = function(dataIndex, visibleIndex) {
        if (!this.contents || !this._data || dataIndex < 0 || dataIndex >= this._data.length) return;
        
        const task = this._data[dataIndex];
        if (!task) return;
        
        const rect = this.itemRect(visibleIndex);
        
        // 计算文本垂直居中的Y坐标
        const textY = rect.y + Math.floor((rect.height - this.lineHeight()) / 2);
        
        // 设置任务名称颜色
        if (task.status === 'completed') {
            this.changeTextColor(ColorManager.textColor(TaskSystem.settings.completedStatusColor));
        } else {
            this.changeTextColor(ColorManager.textColor(TaskSystem.settings.taskNameColor));
        }
        
        // 绘制任务名称 - 现在占用整个宽度，不再显示状态
        this.drawText(task.name, rect.x + 4, textY, rect.width - 8, 'left');
    };
    
    // 自定义字体设置
    TaskListWindow.prototype.resetFontSettings = function() {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = TaskSystem.settings.listFontSize;
        this.resetTextColor();
    };
    
    // 设置详情窗口
    TaskListWindow.prototype.setDetailWindow = function(detailWindow) {
        this._detailWindow = detailWindow;
        this.updateDetailWindow();
    };
    
    // 更新详情窗口内容
    TaskListWindow.prototype.updateDetailWindow = function() {
        if (this._detailWindow && this.maxItems() > 0) {
            const task = this.item();
            this._detailWindow.setTask(task);
        } else if (this._detailWindow) {
            this._detailWindow.setTask(null);
        }
    };
    
    //-----------------------------------------------------------------------------
    // Scene_Task - 任务场景
    //-----------------------------------------------------------------------------
    
    window.Scene_Task = function() {
        this.initialize(...arguments);
    };
    
    Scene_Task.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Task.prototype.constructor = Scene_Task;
    
    Scene_Task.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
    
    Scene_Task.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createTaskWindows();
        
        // 创建调试窗口
        if (TaskSystem.settings.debugMode) {
            this.createDebugWindow();
        }
    };
    
    Scene_Task.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        
        if (TaskSystem.settings.useAnimatedBackground) {
            // 使用动画背景
            this.createAnimatedBackground();
        } else if (TaskSystem.settings.backgroundImage) {
            // 使用静态背景
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture(TaskSystem.settings.backgroundImage);
            this._backgroundSprite.x = TaskSystem.settings.backgroundX;
            this._backgroundSprite.y = TaskSystem.settings.backgroundY;
            this.addChild(this._backgroundSprite);
        }
    };
    
    // 创建动画背景
    Scene_Task.prototype.createAnimatedBackground = function() {
        // 创建存储帧精灵的数组
        this._animFrames = [];
        this._animCounter = 0;
        this._currentFrame = 0;
        
        // 创建帧精灵
        for (let i = 1; i <= TaskSystem.settings.frameCount; i++) {
            const frameName = `${TaskSystem.settings.frameBaseName}${i}`;
            const sprite = new Sprite(ImageManager.loadPicture(frameName));
            
            // 设置精灵属性
            sprite.x = TaskSystem.settings.backgroundX;
            sprite.y = TaskSystem.settings.backgroundY;
            sprite.scale.x = TaskSystem.settings.bgScaleX;
            sprite.scale.y = TaskSystem.settings.bgScaleY;
            sprite.opacity = TaskSystem.settings.bgOpacity;
            sprite.visible = (i === 1); // 只显示第一帧
            
            // 将精灵添加到场景
            this.addChild(sprite);
            
            // 存储到帧数组
            this._animFrames.push(sprite);
        }
    };
    
    // 更新动画背景
    const _Scene_Task_update = Scene_Task.prototype.update;
    Scene_Task.prototype.update = function() {
        _Scene_Task_update.call(this);
        
        // 更新动画背景
        this.updateAnimatedBackground();
    };
    
    Scene_Task.prototype.updateAnimatedBackground = function() {
        if (!this._animFrames || this._animFrames.length === 0) return;
        
        // 增加计数器
        this._animCounter++;
        
        // 当达到设定的速度时，切换到下一帧
        if (this._animCounter >= TaskSystem.settings.animationSpeed) {
            this._animCounter = 0;
            
            // 隐藏当前帧
            this._animFrames[this._currentFrame].visible = false;
            
            // 计算下一帧
            if (TaskSystem.settings.loopAnimation) {
                // 循环模式
                this._currentFrame = (this._currentFrame + 1) % TaskSystem.settings.frameCount;
            } else {
                // 非循环模式
                this._currentFrame++;
                if (this._currentFrame >= TaskSystem.settings.frameCount) {
                    this._currentFrame = TaskSystem.settings.frameCount - 1;
                }
            }
            
            // 显示下一帧
            this._animFrames[this._currentFrame].visible = true;
        }
    };
    
    // 场景结束时清理资源
    const _Scene_Task_terminate = Scene_Task.prototype.terminate;
    Scene_Task.prototype.terminate = function() {
        if (_Scene_Task_terminate) {
            _Scene_Task_terminate.call(this);
        }
        
        // 清理动画帧资源
        this.cleanupAnimatedBackground();
    };
    
    Scene_Task.prototype.cleanupAnimatedBackground = function() {
        if (this._animFrames) {
            for (let sprite of this._animFrames) {
                if (sprite && sprite.parent) {
                    sprite.parent.removeChild(sprite);
                }
                sprite = null;
            }
            this._animFrames = null;
        }
    };
    
    Scene_Task.prototype.createTaskWindows = function() {
        // 创建两个窗口
        this.createDetailWindow();
        this.createListWindow();
        
        // 设置窗口关联
        this._listWindow.setDetailWindow(this._detailWindow);
        
        // 激活列表窗口
        this._listWindow.activate();
        this._listWindow.select(0);
    };
    
    Scene_Task.prototype.createDetailWindow = function() {
        const detailRect = new Rectangle(
            TaskSystem.settings.detailX, 
            TaskSystem.settings.detailY, 
            TaskSystem.settings.detailWidth, 
            TaskSystem.settings.detailHeight
        );
        
        this._detailWindow = new TaskDetailWindow(detailRect);
        this.addWindow(this._detailWindow);
    };
    
    Scene_Task.prototype.createListWindow = function() {
        const listRect = new Rectangle(
            TaskSystem.settings.listX, 
            TaskSystem.settings.listY, 
            TaskSystem.settings.listWidth, 
            TaskSystem.settings.listHeight
        );
        
        this._listWindow = new TaskListWindow(listRect);
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this._listWindow.setHandler('ok', this.onTaskListOk.bind(this));
        
        // 添加列表窗口到场景中
        this.addWindow(this._listWindow);
        
        // 重新调整层级 - 将详情窗口放到列表窗口下方
        if (this._detailWindow) {
            // 先从场景中移除详情窗口
            this.removeChild(this._detailWindow);
            // 确保详情窗口在windowLayer中
            this._windowLayer.removeChild(this._detailWindow);
            // 将详情窗口添加到windowLayer，但位于列表窗口之下
            this._windowLayer.addChildAt(this._detailWindow, 0);
        }
    };
    
    Scene_Task.prototype.onTaskListOk = function() {
        this._listWindow.activate();
    };
    
    //-----------------------------------------------------------------------------
    // 将任务选项添加到主菜单（总是显示）
    //-----------------------------------------------------------------------------
    
    const Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand('任务', 'task', true);
    };
    
    // 处理菜单中的任务命令
    const Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('task', this.commandTask.bind(this));
    };
    
    Scene_Menu.prototype.commandTask = function() {
        SceneManager.push(Scene_Task);
    };
    
    //-----------------------------------------------------------------------------
    // 插件命令
    //-----------------------------------------------------------------------------
    
    PluginManager.registerCommand(PLUGIN_NAME, 'takeTask', args => {
        const taskId = Number(args.taskId || 0);
        if (taskId > 0) {
            $gameParty.takeTask(taskId);
        }
    });
    
    PluginManager.registerCommand(PLUGIN_NAME, 'completeTask', args => {
        const taskId = Number(args.taskId || 0);
        if (taskId > 0) {
            $gameParty.completeTask(taskId);
        }
    });
    
    PluginManager.registerCommand(PLUGIN_NAME, 'openTaskScene', () => {
        SceneManager.push(Scene_Task);
    });
    
    //-----------------------------------------------------------------------------
    // 数据管理 - 确保任务数据在游戏启动时创建
    //-----------------------------------------------------------------------------
    
    // 初始化任务数据
    const DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        DataManager_onLoad.call(this, object);
        if (object === $dataSystem) {
            TaskSystem.createTasks();
            TaskSystem.preloadAnimationFrames();
        }
    };
    
    // 确保在加载存档后创建任务数据
    const Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        Scene_Load_onLoadSuccess.call(this);
        TaskSystem.createTasks();
    };
    
    // 确保任务数据在新游戏中正确初始化
    const DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        DataManager_setupNewGame.call(this);
        TaskSystem.createTasks();
    };
    
    // 确保在窗口加载时创建任务数据
    const originalWindowOnload = window.onload;
    window.onload = function() {
        if (originalWindowOnload) {
            originalWindowOnload();
        }
        TaskSystem.createTasks();
    };
    
    // 只更新原点而不刷新
    TaskListWindow.prototype.updateOrigin = function() {
        // 确保滚动位置在有效范围内
        const x = this.scrollX().clamp(0, this.maxScrollX());
        const y = this.scrollY().clamp(0, this.maxScrollY());
        
        // 更新滚动位置并重绘
        if (this.origin.x !== x || this.origin.y !== y) {
            this.origin.x = x;
            this.origin.y = y;
            this.redrawCurrentItem();
        }
    };
    
    // 只重绘当前项
    TaskListWindow.prototype.redrawCurrentItem = function() {
        this._refreshArrows();
        this.updateCursor();
    };
    
    //-----------------------------------------------------------------------------
    // Debug_Window - 调试窗口，显示UI元素信息
    //-----------------------------------------------------------------------------
    
    window.Debug_Window = function() {
        this.initialize(...arguments);
    };
    
    Debug_Window.prototype = Object.create(Window_Base.prototype);
    Debug_Window.prototype.constructor = Debug_Window;
    
    Debug_Window.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._scene = null;
        this._selectedItem = 0;
        this._items = [
            { name: "背景图", propX: "backgroundX", propY: "backgroundY", obj: "_backgroundSprite", affectsAnimFrames: true },
            { name: "任务列表", propX: "listX", propY: "listY", propW: "listWidth", propH: "listHeight", obj: "_listWindow" },
            { name: "任务详情", propX: "detailX", propY: "detailY", propW: "detailWidth", propH: "detailHeight", obj: "_detailWindow" }
        ];
        this._isVisible = true;
        this._isAdjustingSize = false;
        this._adjustAmount = 1; // 默认调整量
        this._mouseStartX = 0;
        this._mouseStartY = 0;
        this._isDragging = false;
        this._buttons = [];
        this.createControlButtons();
        this.refresh();
    };
    
    Debug_Window.prototype.createControlButtons = function() {
        // 清除已有按钮
        this._buttons = [];
        
        // 计算按钮布局
        const rowHeight = 30;
        const marginY = 60; // 前两行是文本信息
        
        // 获取屏幕宽度，并计算按钮尺寸
        const colWidth = Math.floor(this.innerWidth / 10); // 每列的宽度
        const btnWidth = colWidth - 4;
        const btnHeight = 26;
        
        // 创建各种控制按钮 - 全部放在一行
        // 组件选择
        this.createButton("◀组件", colWidth * 0 + 2, marginY, btnWidth, btnHeight, () => this.selectPrevItem());
        this.createButton("组件▶", colWidth * 1 + 2, marginY, btnWidth, btnHeight, () => this.selectNextItem());
        
        // 位置调整按钮
        this.createButton("←", colWidth * 2 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(-1, 0));
        this.createButton("→", colWidth * 3 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(1, 0));
        this.createButton("↑", colWidth * 4 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(0, -1));
        this.createButton("↓", colWidth * 5 + 2, marginY, btnWidth, btnHeight, () => this.adjustPosition(0, 1));
        
        // 大小调整
        this.createButton("W±", colWidth * 6 + 2, marginY, btnWidth, btnHeight, () => this.toggleSizeButtons());
        
        // 调整量
        this.createButton("×1", colWidth * 7 + 2, marginY, btnWidth, btnHeight, () => this.setAdjustAmount(1));
        this.createButton("×5", colWidth * 8 + 2, marginY, btnWidth, btnHeight, () => this.setAdjustAmount(5));
        
        // 保存按钮
        this.createButton("保存配置", colWidth * 9 + 2, marginY, btnWidth, btnHeight, () => this.saveSettings());
        
        // 第二行按钮 - 宽高调整按钮（隐藏）
        this._sizeButtonsVisible = false;
        this._sizeButtons = [];
        
        const sizeBtn1 = { text: "W-", x: colWidth * 6 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(-1, 0), isHovered: false, isPressed: false };
        const sizeBtn2 = { text: "W+", x: colWidth * 6 + btnWidth/2 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(1, 0), isHovered: false, isPressed: false };
        const sizeBtn3 = { text: "H-", x: colWidth * 7 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(0, -1), isHovered: false, isPressed: false };
        const sizeBtn4 = { text: "H+", x: colWidth * 7 + btnWidth/2 + 2, y: marginY + btnHeight + 5, width: btnWidth / 2 - 2, height: btnHeight, callback: () => this.adjustSize(0, 1), isHovered: false, isPressed: false };
        
        this._sizeButtons.push(sizeBtn1, sizeBtn2, sizeBtn3, sizeBtn4);
    };
    
    Debug_Window.prototype.setScene = function(scene) {
        this._scene = scene;
    };
    
    Debug_Window.prototype.toggleVisibility = function() {
        this._isVisible = !this._isVisible;
        this.visible = this._isVisible;
    };
    
    Debug_Window.prototype.createButton = function(text, x, y, width, height, callback) {
        const button = { 
            text: text, 
            x: x, 
            y: y, 
            width: width, 
            height: height, 
            callback: callback,
            isHovered: false,
            isPressed: false
        };
        this._buttons.push(button);
    };
    
    Debug_Window.prototype.drawButton = function(button) {
        const x = button.x;
        const y = button.y;
        const width = button.width;
        const height = button.height;
        
        // 绘制按钮背景
        let color = button.isPressed ? ColorManager.textColor(4) : 
                    button.isHovered ? ColorManager.textColor(2) : 
                    ColorManager.itemBackColor2();
        
        this.contents.fillRect(x, y, width, height, color);
        this.contents.strokeRect(x, y, width, height, ColorManager.normalColor());
        
        // 绘制按钮文字
        this.contents.fontSize = Math.min(16, width / 4);
        this.resetTextColor();
        this.drawText(button.text, x, y + 2, width, 'center');
    };
    
    Debug_Window.prototype.setAdjustAmount = function(amount) {
        this._adjustAmount = amount;
        this.refresh();
    };
    
    Debug_Window.prototype.selectPrevItem = function() {
        this._selectedItem = (this._selectedItem - 1 + this._items.length) % this._items.length;
        this.refresh();
    };
    
    Debug_Window.prototype.selectNextItem = function() {
        this._selectedItem = (this._selectedItem + 1) % this._items.length;
        this.refresh();
    };
    
    Debug_Window.prototype.adjustPosition = function(dx, dy) {
        const item = this._items[this._selectedItem];
        const obj = this._scene[item.obj];
        
        if (obj) {
            if (dx !== 0) {
                TaskSystem.settings[item.propX] += dx * this._adjustAmount;
                obj.x += dx * this._adjustAmount;
            }
            
            if (dy !== 0) {
                TaskSystem.settings[item.propY] += dy * this._adjustAmount;
                obj.y += dy * this._adjustAmount;
            }
            
            // 如果调整的是背景图，也要调整动画背景
            if (item.affectsAnimFrames) {
                const scene = this._scene;
                if (scene && scene._animFrames) {
                    for (const sprite of scene._animFrames) {
                        if (dx !== 0) sprite.x += dx * this._adjustAmount;
                        if (dy !== 0) sprite.y += dy * this._adjustAmount;
                    }
                }
            }
            
            this.refresh();
        }
    };
    
    Debug_Window.prototype.adjustSize = function(dw, dh) {
        const item = this._items[this._selectedItem];
        const obj = this._scene[item.obj];
        
        if (obj) {
            if (dw !== 0 && item.propW) {
                TaskSystem.settings[item.propW] += dw * this._adjustAmount;
                if (obj.width !== undefined) obj.width += dw * this._adjustAmount;
            }
            
            if (dh !== 0 && item.propH) {
                TaskSystem.settings[item.propH] += dh * this._adjustAmount;
                if (obj.height !== undefined) obj.height += dh * this._adjustAmount;
            }
            
            this.refresh();
            
            // 在改变大小后可能需要重新创建窗口
            this._scene.updateWindowLayouts();
        }
    };
    
    Debug_Window.prototype.toggleSizeButtons = function() {
        this._sizeButtonsVisible = !this._sizeButtonsVisible;
        this.refresh();
    };
    
    Debug_Window.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        
        // 检测F5键切换显示
        if (Input.isTriggered('f5') || Input.isTriggered('f8')) {  // macOS上可能F5不方便，增加F8作为替代
            this.toggleVisibility();
        }
        
        if (!this._isVisible || !this._scene) return;
        
        // 更新保存消息计时器
        if (this._saveMessageTimer > 0) {
            this._saveMessageTimer--;
            if (this._saveMessageTimer === 0) {
                this.refresh();
            } else if (this._saveMessageTimer % 20 === 0) { // 每20帧刷新一次，显示动画效果
                this.refreshSaveMessage();
            }
        }
        
        // 处理按键输入
        this.handleKeyInput();
        
        // 处理鼠标输入
        this.handleMouseInput();
    };
    
    Debug_Window.prototype.handleKeyInput = function() {
        // 基础按键控制
        const moveSpeed = this._adjustAmount;
        
        // 方向键移动
        if (Input.isPressed('left')) this.adjustPosition(-1, 0);
        if (Input.isPressed('right')) this.adjustPosition(1, 0);
        if (Input.isPressed('up')) this.adjustPosition(0, -1);
        if (Input.isPressed('down')) this.adjustPosition(0, 1);
        
        // 切换选择项 (Tab键)
        if (Input.isTriggered('tab')) {
            this._selectedItem = (this._selectedItem + 1) % this._items.length;
            this.refresh();
        }
        
        // 保存设置 (Command+S)
        if ((Input.isPressed('control') || Input.isPressed('command')) && Input.isTriggered('s')) {
            this.saveSettings();
        }
    };
    
    Debug_Window.prototype.handleMouseInput = function() {
        if (!TouchInput.isPressed()) {
            // 鼠标松开时重置拖拽状态
            this._isDragging = false;
        }
        
        // 获取相对于窗口的鼠标坐标
        const mouseX = TouchInput.x - this.x - this.padding;
        const mouseY = TouchInput.y - this.y - this.padding;
        
        // 检查按钮点击和悬停
        let buttonClicked = false;
        
        // 先检查普通按钮
        const allButtons = [...this._buttons];
        
        // 如果尺寸按钮可见，也加入检查
        if (this._sizeButtonsVisible && this._sizeButtons) {
            allButtons.push(...this._sizeButtons);
        }
        
        for (const button of allButtons) {
            const isInButton = mouseX >= button.x && mouseX <= button.x + button.width &&
                              mouseY >= button.y && mouseY <= button.y + button.height;
            
            // 检查悬停状态变化
            if (isInButton !== button.isHovered) {
                button.isHovered = isInButton;
                this.refresh();
            }
            
            // 检查点击
            if (isInButton && TouchInput.isTriggered()) {
                button.isPressed = true;
                this.refresh();
            } else if (button.isPressed && !TouchInput.isPressed()) {
                button.isPressed = false;
                if (isInButton) {
                    button.callback();
                    buttonClicked = true;
                }
                this.refresh();
            }
        }
        
        // 如果点击了按钮，不处理拖拽
        if (buttonClicked) return;
        
        // 处理组件拖拽
        if (TouchInput.isTriggered()) {
            this._mouseStartX = TouchInput.x;
            this._mouseStartY = TouchInput.y;
            this._isDragging = true;
        } else if (this._isDragging && TouchInput.isPressed()) {
            const deltaX = TouchInput.x - this._mouseStartX;
            const deltaY = TouchInput.y - this._mouseStartY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                const item = this._items[this._selectedItem];
                const obj = this._scene[item.obj];
                
                if (obj) {
                    // 移动组件
                    TaskSystem.settings[item.propX] += deltaX;
                    TaskSystem.settings[item.propY] += deltaY;
                    obj.x += deltaX;
                    obj.y += deltaY;
                    
                    this._mouseStartX = TouchInput.x;
                    this._mouseStartY = TouchInput.y;
                    this.refresh();
                }
            }
        }
    };
    
    Debug_Window.prototype.refresh = function() {
        this.contents.clear();
        if (!this._scene) return;
        
        // 绘制标题和当前选中项信息
        this.contents.fontSize = 16;
        
        // 绘制当前选中项信息
        const item = this._items[this._selectedItem];
        if (!item) return;
        
        // 第一行: 标题和当前组件信息
        this.drawText(`调试器: 当前选中[${item.name}] | 调整量×${this._adjustAmount}`, 5, 5, this.innerWidth - 10);
        
        // 第二行: 坐标和尺寸信息
        const obj = this._scene[item.obj];
        if (obj) {
            let info = `X:${obj.x}(${TaskSystem.settings[item.propX]}) Y:${obj.y}(${TaskSystem.settings[item.propY]})`;
            if (item.propW && item.propH) {
                info += ` W:${obj.width}(${TaskSystem.settings[item.propW]}) H:${obj.height}(${TaskSystem.settings[item.propH]})`;
            }
            this.drawText(info, 5, 30, this.innerWidth - 10);
        }
        
        // 绘制控制按钮
        for (const button of this._buttons) {
            this.drawButton(button);
        }
    };
    
    Debug_Window.prototype.saveSettings = function() {
        const output = {};
        
        // 收集所有设置
        for (const key in TaskSystem.settings) {
            if (key !== 'debugMode') {
                output[key] = TaskSystem.settings[key];
            }
        }
        
        // 输出到控制台
        console.log("当前任务系统配置:");
        console.log(JSON.stringify(output, null, 2));
        
        // 显示保存成功信息
        this._saveMessageTimer = 120; // 显示2秒
        this.refresh();
    };
    
    Debug_Window.prototype.refreshSaveMessage = function() {
        // 在原有内容上显示保存成功信息
        const width = 300;
        const height = 60;
        const x = (this.innerWidth - width) / 2;
        const y = (this.innerHeight - height) / 2;
        
        this.contents.fillRect(x, y, width, height, ColorManager.textColor(29));
        this.contents.strokeRect(x, y, width, height, ColorManager.normalColor());
        
        this.contents.fontSize = 16;
        this.resetTextColor();
        this.drawText("配置已保存到控制台!", x, y + 10, width, 'center');
        this.drawText("按F12打开控制台查看", x, y + 35, width, 'center');
    };
    
    //-----------------------------------------------------------------------------
    // Scene_Task - 修改任务场景，增加调试功能
    //-----------------------------------------------------------------------------
    
    const Scene_Task_create = Scene_Task.prototype.create;
    Scene_Task.prototype.create = function() {
        Scene_Task_create.call(this);
        
        // 创建调试窗口
        if (TaskSystem.settings.debugMode) {
            this.createDebugWindow();
        }
    };
    
    Scene_Task.prototype.createDebugWindow = function() {
        // 创建更加紧凑的调试窗口，高度更小
        const rect = new Rectangle(0, Graphics.height - 150, Graphics.width, 150);
        this._debugWindow = new Debug_Window(rect);
        this._debugWindow.setScene(this);
        this.addWindow(this._debugWindow);
    };
    
    const Scene_Task_update = Scene_Task.prototype.update;
    Scene_Task.prototype.update = function() {
        Scene_Task_update.call(this);
        
        // 如果窗口位置被调试系统修改，需要更新窗口布局
        if (TaskSystem.settings.debugMode && this._debugWindow && this._debugWindow._isVisible) {
            this.updateWindowLayouts();
        }
    };
    
    Scene_Task.prototype.updateWindowLayouts = function() {
        // 更新任务列表窗口位置和大小
        if (this._listWindow) {
            this._listWindow.x = TaskSystem.settings.listX;
            this._listWindow.y = TaskSystem.settings.listY;
            // 如果窗口大小改变，需要重新创建窗口
            if (this._listWindow.width != TaskSystem.settings.listWidth || 
                this._listWindow.height != TaskSystem.settings.listHeight) {
                    
                const index = this._listWindow.index();
                const rect = new Rectangle(
                    TaskSystem.settings.listX,
                    TaskSystem.settings.listY,
                    TaskSystem.settings.listWidth,
                    TaskSystem.settings.listHeight
                );
                
                this.removeWindow(this._listWindow);
                this._listWindow = new TaskListWindow(rect);
                this._listWindow.setHandler('cancel', this.popScene.bind(this));
                this._listWindow.setHandler('ok', this.onTaskListOk.bind(this));
                this._listWindow.setDetailWindow(this._detailWindow);
                this.addWindow(this._listWindow);
                
                this._listWindow.activate();
                this._listWindow.select(index);
            }
        }
        
        // 更新任务详情窗口位置和大小
        if (this._detailWindow) {
            this._detailWindow.x = TaskSystem.settings.detailX;
            this._detailWindow.y = TaskSystem.settings.detailY;
            
            // 如果窗口大小改变，需要重新创建窗口
            if (this._detailWindow.width != TaskSystem.settings.detailWidth || 
                this._detailWindow.height != TaskSystem.settings.detailHeight) {
                    
                const task = this._detailWindow._task;
                const rect = new Rectangle(
                    TaskSystem.settings.detailX,
                    TaskSystem.settings.detailY,
                    TaskSystem.settings.detailWidth,
                    TaskSystem.settings.detailHeight
                );
                
                this.removeWindow(this._detailWindow);
                this._detailWindow = new TaskDetailWindow(rect);
                if (this._listWindow) {
                    this._listWindow.setDetailWindow(this._detailWindow);
                }
                this.addWindow(this._detailWindow);
                
                if (task) {
                    this._detailWindow.setTask(task);
                }
            }
        }
        
        // 更新背景图位置
        if (this._backgroundSprite) {
            this._backgroundSprite.x = TaskSystem.settings.backgroundX;
            this._backgroundSprite.y = TaskSystem.settings.backgroundY;
        }
        
        // 更新动画背景位置
        if (this._animFrames && this._animFrames.length > 0) {
            for (const sprite of this._animFrames) {
                sprite.x = TaskSystem.settings.backgroundX;
                sprite.y = TaskSystem.settings.backgroundY;
                sprite.scale.x = TaskSystem.settings.bgScaleX;
                sprite.scale.y = TaskSystem.settings.bgScaleY;
                sprite.opacity = TaskSystem.settings.bgOpacity;
            }
        }
    };
    
})(); 
