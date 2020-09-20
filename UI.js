"ui";

let goldGame = require("./src/godenGard.js");
let antForestGame = require("./src/antForest.js");
let dingdongGame = require("./src/dingdong.js");
let taoLifeGame = require("./src/taoLife.js");
// let weakScreen = require("./src/AutoUnLockScreen.js");
// const CONFIG_STORAGE_NAME = 'starsBallTargetScore'
let configStorage = storages.create('starsBallTargetScore');

let deviceWidth = device.width;
let deviceHeight = device.height;

//判断无障碍服务有没有开启
let installService = false;
//是否连续执行 买菜签到
let isOpenDingdong = false;
//是否连续执行 淘金币
let isOpenTaobaoGold = false;
let isOpenTaolife = true;//是否执行陶人生
let isOpenTmFarm = true;//是否执行天猫农场
//蚂蚁森林
let isOpenAntForest = false;
let isOpenAntFarmElse = false;//是否连带执行蚂蚁庄园
//支付宝积分
let isNeedGoAlipayScore = false;
//当前执行的脚本线程
let currentExeTask = null;
//当前屏幕截图权限
let currentCaptureScreenPermission = false;
//悬浮窗权限
let popPermission = false;
//蚂蚁森林 巡航模式
let isOpenCruiseMode = false;
//淘人生 是否执行
// let isOPenTaoLifeOnly = false;
//是否执行星星球
let isOpenAntFarmStartBall = false;
//默认的数量
let defaultBarScore = configStorage.get("starsBallTargetScore", 210);
// 是否开启早7点定时自动偷能量
let isOpenTimerForestTask = configStorage.get("isOpenTimerForestTask", false);;
//是否每5小时循环一次
let isOpen5HourTask = configStorage.get("isOpen5HourTask", false);;;
//上次设置的密码
let savePassowrd = configStorage.get("savePhonePassword");
//当前是否有定时任务
let currentHasTaskForet = false;

let showHour = new Date().getHours()
let showMinte = new Date().getMinutes()
let lastTimeId = configStorage.get("lastTimeTaskId", -1);

queryForestTask();

ui.layout(
    <vertical>
        <text marginLeft="15dp" marginTop="10sp" textColor="#D65253">下面的无障碍、截图、悬浮窗权限必须给，否则无法正常运行</text>
        <text marginLeft="15dp" marginTop="10sp" textColor="#D65253">本项目代码开源，请放心使用！！！需要源码加群联系作者</text>
        <text marginLeft="15dp" marginTop="10sp" textColor="#2b8754">联系作者：QQ群 567679111</text>
        <horizontal w="auto" h="auto" marginLeft="15dp" id="hor_switch">
            <text marginLeft="30sp">无障碍</text>
            <Switch w="auto" h="auto" id="autoService" checked="{{auto.service != null}}"></Switch>
            <text marginLeft="30sp">截图</text>
            <Switch w="auto" h="auto" id="captureScreenService" checked="{{currentCaptureScreenPermission}}"></Switch>
            <text marginLeft="30sp">悬浮窗</text>
            <Switch w="auto" h="auto" id="popService" checked="{{popPermission}}"></Switch>
        </horizontal>
        <frame>
            <View id="mask" bg="#77000000" w="*" h="*" clickable="true" visibility="gone" />
            <ScrollView>
                <vertical margin={"15dp"}>
                    <vertical>
                        <text textSize="18sp" textStyle="bold">功能1：支付宝-蚂蚁森林-蚂蚁庄园</text>
                        <horizontal w="auto" h="auto" marginLeft="30dp">
                            <CheckBox id="sAliScore" w="auto" h="auto" checked={isNeedGoAlipayScore}></CheckBox>
                            <text marginLeft="15dp" marginRight="15dp">是否领取支付宝积分</text>
                        </horizontal>
                        <horizontal marginLeft="30dp">
                            <CheckBox id="cbAntFarm" checked={isOpenAntFarmElse} />
                            <text marginLeft="15dp">在蚂蚁森林完毕后 是否执行蚂蚁庄园</text>
                        </horizontal>
                        <horizontal marginLeft="30dp">
                            <CheckBox id="cbAntFarmStartsBall" checked={isOpenAntFarmStartBall} />
                            <text marginLeft="15dp">蚂蚁庄园 玩星星球 目标分数</text>
                            <input id="ballScore" text={defaultBarScore} />
                            <button id="ballSetOk" text="确定" />
                        </horizontal>
                        <text marginLeft="30dp" marginRight="15dp">备注：蚂蚁庄园的星星球，如果需要单独刷分，设置好分数，确定，打开悬浮穿。去到星星球游戏界面，然后打开悬浮点击第二个！</text>
                        <horizontal marginLeft="30sp">
                            <CheckBox id="cbAntCruise" checked={isOpenCruiseMode} />
                            <text marginLeft="15dp" marginRight="15dp" h="60dp">蚂蚁森林巡航模式 解释：半个小时内无脑循环在蚂蚁森林。关闭方法：音量键上键，或者悬浮窗的X</text>
                        </horizontal>
                        <button id={"exeAntForest"} marginLeft="15dp" marginRight="15dp">单独执行 蚂蚁森林</button>
                    </vertical>
                    <vertical>
                        <text textSize="18sp" textStyle="bold">功能2：王者荣耀自动刷金币</text>
                        <text marginLeft="15dp" marginRight="15dp">使用方法：只给无障碍和悬浮窗，打开悬浮窗放一边，进入游戏，关闭所有广告，打开悬浮窗，点击第三个提示开启成功！注意：某些手机例如华为有一个截图弹窗，点击确定。特别解释：在开始前，自己手动先去冒险关卡选择合适的阵容和地图，要求能全自动通关的，自己过一次</text>
                        <button id={"goWangzhe"} marginLeft="15dp" marginRight="15dp">打开王者荣耀</button>
                    </vertical>

                    <vertical>
                        <text textSize="18sp" textStyle="bold">功能3：蚂蚁森林偷能量</text>
                        <text marginLeft="15dp" marginRight="15dp">说明：</text>
                        <text marginLeft="15dp" marginRight="15dp">特别强调：按音量上键会关闭所有脚本，如果不想误关，建议关闭此功能，方法打开本APP，按下返回键，右上角3个点点击设置，对应关闭即可 </text>
                        <horizontal marginLeft="30dp">
                            <text marginLeft="15dp">当前手机密码</text>
                            <input id="phonePassword" text={savePassowrd} inputType="numberPassword" />
                            <button id="phonePasswordConfirm" text="保存" />
                        </horizontal>
                        <text marginLeft="15dp">当前待执行的每日定时任务</text>
                        <horizontal marginLeft="30dp">
                            <text textSize="20sp" marginLeft="15dp" id="currentTaskShow">{currentHasTaskForet ? ('定时偷能量任务：' + showHour + '：' + showMinte) : '定时偷能量任务：无'}</text>
                            <button id="modifiedTask" marginLeft="10dp" marginRight="5dp" >{currentHasTaskForet ? '修改' : '新增'}</button>
                        </horizontal>
                        <horizontal marginLeft="30dp">
                            <CheckBox id="openTimerForestTask" checked={isOpenTimerForestTask} />
                            <text marginLeft="15dp" h="45dp">设置定时偷能量后，屏幕不会息屏，另外注意需要APP保活，对应开启方法自行百度，貌似不好用就给你看看</text>
                        </horizontal>
                        <button id={"testTask"} marginLeft="15dp" marginRight="15dp" marginBottom="30dp">测试定时任务</button>
                    </vertical>
                </vertical>
            </ScrollView>
        </frame>

    </vertical>


);

initPop();

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
    installService = checked;
});

ui.captureScreenService.on("check", function () {
    if (!currentCaptureScreenPermission) {
        let screenPermissionTask = threads.start(function () {
            // engines.execScriptFile("./src/antForest.js");
            let screenPermission = false;
            try {
                screenPermission = requestScreenCapture();
            } catch (error) {
                screenPermission = true;
            }
            currentCaptureScreenPermission = screenPermission;
            if (!screenPermission) {
                toast("请给截图权限");
                stopTask();
            }
        });
    }
});

ui.exeAntForest.click(() => {
    currentExeTask = threads.start(function () {
        // engines.execScriptFile("./src/antForest.js");
        let screenPermission = false;
        try {
            screenPermission = requestScreenCapture();
        } catch (error) {
            screenPermission = true;
        }
        if (!screenPermission) {
            toast("请给截图权限");
            stopTask();
        } else {
            antForestGame(isOpenAntFarmElse, isNeedGoAlipayScore, isOpenCruiseMode, isOpenAntFarmStartBall);
        }
    });
});

// ui.goTaobao.click(() => {
//     launch("com.taobao.taobao");
// });

ui.goWangzhe.click(() => {
    launch("com.tencent.tmgp.sgame");
});


// ui.cbTaolife.on("check", function (checked) {
//     isOpenTaolife = checked;
//     console.log("isOpenTaolife=" + isOpenTaolife);
// });

// ui.cbTmFarm.on("check", function (checked) {
//     isOpenTmFarm = checked;
//     console.log("isOpenTmFarm=" + isOpenTmFarm);
// });

ui.sAliScore.on("check", function (checked) {
    isNeedGoAlipayScore = checked;
    console.log("isNeedGoAlipayScore=" + isNeedGoAlipayScore);
});

ui.cbAntFarm.on("check", function (checked) {
    isOpenAntFarmElse = checked;
    console.log("isOpenAntFarmElse=" + isOpenAntFarmElse);
});


ui.cbAntFarmStartsBall.on("check", function (checked) {
    isOpenAntFarmStartBall = checked;
    console.log("isOpenAntFarmStartBall=" + isOpenAntFarmStartBall);
});
ui.openTimerForestTask.on("check", function (checked) {
    isOpenTimerForestTask = checked;
    configStorage.put("isOpenTimerForestTask", checked);
    console.log("isOpenTimerForestTask=" + isOpenTimerForestTask);
});
// ui.open5HourTask.on("check", function (checked) {
//     isOpen5HourTask = checked;
//     configStorage.put("isOpen5HourTask", checked);
//     console.log("isOpen5HourTask=" + isOpen5HourTask);
// });

ui.cbAntCruise.on("check", function (checked) {
    isOpenCruiseMode = checked;
    isOpenAntFarmElse = false;
    ui.cbAntFarm.checked = false;
    console.log("isOpenCruiseMode=" + isOpenCruiseMode);
});


ui.ballSetOk.click(function () {
    //通过getText()获取输入的内容
    let score = ui.ballScore.getText();
    console.log("设置分数", score);
    configStorage.put("starsBallTargetScore", parseInt(score));
    toast("设置成功");
});

ui.phonePasswordConfirm.click(function () {
    //通过getText()获取输入的内容
    let passowrd = ui.phonePassword.getText();
    if (passowrd != undefined) {
        console.log("保存的密码", passowrd);
        configStorage.put("savePhonePassword", String(passowrd));
        toastLog("设置成功");
    } else {
        toastLog("密码不能为空");
    }
});

ui.popService.on("check", function (checked) {
    if (!checked) {
        let engins = engines.all();
        if (engins != null) {
            engins.forEach(engin => {
                let soureces = engin.getSource();
                if (soureces.toString().endsWith("pop_animi.js")) {
                    engin.forceStop();
                }
            });
        }
    } else {
        engines.execScriptFile("./pop_animi.js");
    }
    popPermission = checked;
    console.log("popPermission=" + popPermission);
});

ui.testTask.click(() => {
    //关闭屏幕
    toast("请在10秒内手动关闭屏幕，然后等待测");
    setTimeout(() => {
        //关闭屏幕
        engines.execScriptFile("./src/AutoUnLockScreen.js");
    }, 10000);
});


function stopTask() {
    if (currentExeTask == null) {
        toastLog("没有进行中的脚本");
    } else {
        if (currentExeTask.isAlive()) {
            threads.shutDownAll();
            toastLog("停止脚本！");
        } else {
            toastLog("没有进行中的脚本");
        }
    }
}




function initPop() {
    global.blankImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICRAEAOw=="
    let popView = ui.inflate(
        <frame>
            <img src="{{blankImg}}" tint="#ffffff" scaleType="centerCrop" radiusBottomLeft="20dp" radiusBottomRight="20dp" />
            <vertical>
                <linear gravity="center">
                    <NumberPicker w="60" marginRight="30" id="npHour" />
                    <NumberPicker w="60" id="npMinte" />
                </linear>
                <linear>
                    <button id="backtoday" text="回到今天" textColor="#468bee" layout_gravity="start" style="Widget.AppCompat.Button.Borderless.Colored" />
                    <View h="0" layout_weight="1" />
                    <button id="sure" text="确定" textColor="#468bee" layout_gravity="start" style="Widget.AppCompat.Button.Borderless.Colored" />
                </linear>
            </vertical>
        </frame>, ui.inflate(<linear />))
    //设置不可循环
    //popView.npHour.setWrapSelectorWheel(false);
    //popView.npMinte.setWrapSelectorWheel(false);
    //设置不可编辑
    popView.npHour.setDescendantFocusability(android.widget.NumberPicker.FOCUS_BLOCK_DESCENDANTS);
    popView.npMinte.setDescendantFocusability(android.widget.NumberPicker.FOCUS_BLOCK_DESCENDANTS);
    popView.npHour.setMinValue(0);
    popView.npHour.setMaxValue(23);
    popView.npMinte.setMinValue(0)
    popView.npMinte.setMaxValue(60)
    setShowValue()
    let popWin = new android.widget.PopupWindow(popView, -1, -2)
    let is = new android.transition.Slide(android.view.Gravity.TOP)
    is.setDuration(250)
    popWin.setEnterTransition(is)

    let os = new android.transition.Slide(android.view.Gravity.TOP)
    os.setDuration(250)
    os.setMode(android.transition.Visibility.MODE_OUT)
    popWin.setExitTransition(os)

    ui.modifiedTask.click(() => {
        setShowValue()
        if (!popWin.isShowing()) {
            popWin.showAsDropDown(ui.hor_switch)
            setMaskShow(true)
        } else {
            setMaskShow(false)
            popWin.dismiss()
        }
    })
    ui.mask.click(() => {
        if (popWin.isShowing()) {
            setMaskShow(false)
            popWin.dismiss()
        }
    })
    popView.backtoday.click(() => {
        backToToday()
    })
    popView.sure.click(() => {
        showHour = popView.npHour.getValue()
        showMinte = popView.npMinte.getValue()
        setMaskShow(false)
        popWin.dismiss()
        addDalyStealTask();
    })
    popView.npHour.setOnValueChangedListener(function (np, oldI, newI) {
        // popView.npMinte.setMaxValue()
    })
    function backToToday() {
        showHour = new Date().getHours()
        showMinte = new Date().getMinutes()
        setShowValue()
    }
    function setMaskShow(isShow) {
        ui.mask.attr("visibility", isShow ? "visible" : "gone")
    }
    function setShowValue() {
        popView.npHour.setValue(showHour)
        popView.npMinte.setValue(showMinte)
    }
    function getCountDays(month) {
        var curDate = new Date();
        curDate.setMonth(month);
        if (month == 1) curDate.setMonth(0)
        curDate.setDate(0)
        return curDate.getDate();
    }
}


function addDalyStealTask() {
    let taskId = ''
    //先查询任务 
    let allTimeTasks = timers.queryTimedTasks({})
    console.log(allTimeTasks)
    if (allTimeTasks != null && allTimeTasks.length > 0) {
        allTimeTasks.forEach(task => {
            //删除之前的任务
            if (task.scriptPath.indexOf('antForestTimeTask') != -1) {
                timers.removeTimedTask(task.id)
            }
        });
    }

    //重新建立任务
    timers.addDailyTask({ path: './src/antForestTimeTask.js', time: showHour + ":" + showMinte }, task => {
        toastLog("设置定时任务成功：", task)
        lastTimeId = task.id;
        configStorage.put("lastTimeTaskId", lastTimeId);

    });
    ui.currentTaskShow.setText('定时偷能量任务：' + showHour + ":" + showMinte);
    configStorage.put("nextTaskHour", showHour);
    configStorage.put("nextTaskMinite", showMinte);
}


function queryForestTask() {
    let allTimeTasks = timers.queryTimedTasks(lastTimeId)
    console.log(allTimeTasks);

    if (allTimeTasks != null) {
        currentHasTaskForet = true
        // let timelong = new Date().getTime() + task.millis;
        showHour = configStorage.get("nextTaskHour", -1);
        showMinte = configStorage.get("nextTaskMinite", -1);
    }
}