"ui";

let goldGame = require("./src/godenGard.js");
let antForestGame = require("./src/antForest.js");
let dingdongGame = require("./src/dingdong.js");

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
let isOpenAntFarmElse = true;//是否连带执行蚂蚁庄园
//支付宝积分
let isNeedGoAlipayScore = true;
//当前执行的脚本线程
let currentExeTask = null;
//当前屏幕截图权限
let currentCaptureScreenPermission = false;
//悬浮窗权限
let popPermission = false;
//蚂蚁森林 巡航模式
let isOpenCruiseMode = false;


ui.layout(
    <vertical>
        <text marginLeft="15dp" marginTop="10sp">下面的无障碍、截图、悬浮窗权限必须给，否则无法正常运行</text>
        <text marginLeft="15dp" marginTop="10sp">本项目代码开元，请放心使用！！！</text>
        <horizontal w="auto" h="auto" marginLeft="15dp">
            <text marginLeft="30sp">无障碍</text>
            <Switch w="auto" h="auto" id="autoService" checked="{{installService}}"></Switch>
            <text marginLeft="30sp">截图</text>
            <Switch w="auto" h="auto" id="captureScreenService" checked="{{currentCaptureScreenPermission}}"></Switch>
            <text marginLeft="30sp">悬浮窗</text>
            <Switch w="auto" h="auto" id="popService" checked="{{popPermission}}"></Switch>
        </horizontal>
        <ScrollView>
            <vertical margin={"15dp"}>
                <vertical>
                    <text textSize="18sp" textStyle="bold">功能1：叮咚买菜签到</text>
                    <horizontal w="auto" h="auto" marginLeft="15dp">
                        <Switch id="swDingdongTask" w="auto" h="auto" checked={isOpenDingdong}></Switch>
                        <text marginLeft="15dp" marginRight="15dp">咚买菜签到(是否批量执行)</text>
                    </horizontal>
                    <button id={"exeDingDondSign"} marginLeft="15dp" marginRight="15dp">单独执行 叮咚</button>
                </vertical>
                <vertical>
                    <text textSize="18sp" textStyle="bold">功能2：淘宝-金币庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15dp">
                        <Switch id="swTaoGoldTask" w="auto" h="auto" checked={isOpenTaobaoGold}></Switch>
                        <text marginLeft="15dp" marginRight="15dp">金币庄园(是否批量执行)</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbTaolife" checked={isOpenTaolife} />
                        <text>淘金币庄园是否 执行淘人生</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbTmFarm" checked={isOpenTmFarm} />
                        <text>淘金币庄园是否 执行天猫农场</text>
                    </horizontal>
                    <button id={"exeGoldManor"} marginLeft="15dp" marginRight="15dp">单独执行 金币庄园</button>
                </vertical>

                <vertical>
                    <text textSize="18sp" textStyle="bold">功能3：支付宝-蚂蚁森林-蚂蚁庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15dp">
                        <Switch id="swAntForestTask" w="auto" h="auto" checked={isOpenAntForest}></Switch>
                        <text marginLeft="15dp" marginRight="15dp">蚂蚁森林(是否批量执行)</text>
                    </horizontal>
                    <horizontal w="auto" h="auto" marginLeft="30dp">
                        <CheckBox id="sAliScore" w="auto" h="auto" checked={isNeedGoAlipayScore}></CheckBox>
                        <text marginLeft="15dp" marginRight="15dp">是否领取支付宝积分</text>
                    </horizontal>
                    <horizontal marginLeft="30dp">
                        <CheckBox id="cbAntFarm" checked={isOpenAntFarmElse} />
                        <text marginLeft="15dp">在蚂蚁森林完毕后 是否执行蚂蚁庄园</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbAntCruise" checked={isOpenCruiseMode} />
                        <text marginLeft="15dp" marginRight="15dp" h="60dp">蚂蚁森林巡航模式 解释：半个小时内无脑循环在蚂蚁森林。关闭方法：音量键上键，或者悬浮窗的X</text>
                    </horizontal>
                    <button id={"exeAntForest"} marginLeft="15dp" marginRight="15dp">单独执行 蚂蚁森林</button>
                </vertical>

                {/* <vertical>
                    <text textSize="18sp" textStyle="bold">功能4：支付宝-蚂蚁庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15dp">
                        <Switch w="auto" h="auto" checked={isOpenAntFarm}></Switch>
                        <text marginLeft="15dp" marginRight="15dp">蚂蚁庄园(是否批量执行)</text>
                    </horizontal>
                    <button id={"exeAntFarm"} marginLeft="15dp" marginRight="15dp">单独执行 蚂蚁庄园</button>
                </vertical> */}
            </vertical>
        </ScrollView>
        <button id={"doMutilTask"} text={"全部执行"} textColor="#FFFFFF" bg="#01a9f3" marginLeft="30dp" marginRight="30dp" />
    </vertical>


);

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

function oncrete() {
    console.log("生命周期onCreate");
    installService = auto.service != null;
    try {
        screenPermission = requestScreenCapture();
    } catch (error) {
        screenPermission = true;
    }
    let engins = engines.all();
    if (engins != null) {
        engins.forEach(engin => {
            let soureces = engin.getSource();
            if (soureces.toString().endsWith("pop_animi.js")) {
                popPermission = true;
            }
        });
    }
    //重新设置UI
    ui.popService.checked = true;

}
// engines.execScript("oncrete", "oncrete();\n"+oncrete.toString());

ui.exeDingDondSign.click(() => {
    currentExeTask = threads.start(function () {
        dingdongGame();
    });
    // engines.execScriptFile("./src/dingdong.js");
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
            antForestGame(isOpenAntFarmElse, isNeedGoAlipayScore, isOpenCruiseMode);
        }
    });
});

ui.exeGoldManor.click(() => {
    // engines.execScriptFile("./src/godenGard.js");
    currentExeTask = threads.start(function () {
        goldGame(isOpenTaolife, isOpenTmFarm);
    });
});

ui.cbTaolife.on("check", function (checked) {
    isOpenTaolife = checked;
    console.log("isOpenTaolife=" + isOpenTaolife);
});

ui.cbTmFarm.on("check", function (checked) {
    isOpenTmFarm = checked;
    console.log("isOpenTmFarm=" + isOpenTmFarm);
});

ui.sAliScore.on("check", function (checked) {
    isNeedGoAlipayScore = checked;
    console.log("isNeedGoAlipayScore=" + isNeedGoAlipayScore);
});

ui.cbAntFarm.on("check", function (checked) {
    isOpenAntFarmElse = checked;
    console.log("isOpenAntFarmElse=" + isOpenAntFarmElse);
});
ui.swDingdongTask.on("check", function (checked) {
    isOpenDingdong = checked;
    console.log("isOpenDingdong=" + isOpenDingdong);
});
ui.swTaoGoldTask.on("check", function (checked) {
    isOpenTaobaoGold = checked;
    console.log("isOpenTaobaoGold=" + isOpenTaobaoGold);
});
ui.swAntForestTask.on("check", function (checked) {
    isOpenAntForest = checked;
    console.log("isOpenAntForest=" + isOpenAntForest);
});

ui.cbAntCruise.on("check", function (checked) {
    isOpenCruiseMode = checked;
    isOpenAntFarmElse = false;
    ui.cbAntFarm.checked = false;
    console.log("isOpenCruiseMode=" + isOpenCruiseMode);
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

ui.doMutilTask.click(() => {
    if (installService && currentCaptureScreenPermission && popPermission) {
        if (currentExeTask != null) {
            currentExeTask.interrupt();
        }
        console.log("全部执行");
        currentExeTask = threads.start(function () {
            if (isOpenDingdong) {
                toastLog("开始执行叮咚签到");
                dingdongGame();
            }
            if (isOpenTaobaoGold) {
                toastLog("开始执行淘庄园");
                goldGame(isOpenTaolife, isOpenTmFarm);
            }
            if (isOpenAntForest) {
                toastLog("开始执行蚂蚁森林");
                antForestGame(isOpenAntFarmElse, isNeedGoAlipayScore);
            }
        });
    } else {
        toastLog("请给全部权限");
        console.log("installService=" + installService, "currentCaptureScreenPermission=" + currentCaptureScreenPermission, "popPermission=" + popPermission)
    }

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
