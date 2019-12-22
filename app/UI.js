"ui";

let goldGame = require("./src/godenGard.js");
let antForestGame = require("./src/antForest.js");

let deviceWidth = device.width;
let deviceHeight = device.height;

const margin = 60;
const buttonWidth = parseInt(deviceWidth * 0.30);

//判断无障碍服务有没有开启
let installService = false;
//是否连续执行 买菜签到
let isOpenDingdong = false;
//是否连续执行 淘金币
let isOpenTaobaoGold = false;
let isOpenTaolife = true;//是否执行陶人生
let isOpenTmFarm = false;//是否执行天猫农场
//蚂蚁森林
let isOpenAntForest = false;
let isOpenAntFarmElse = true;//是否连带执行蚂蚁庄园
//支付宝积分
let isNeedGoAlipayScore = true;
//当前执行的脚本线程
let currentExeTask = null;
//当前屏幕截图权限
let currentCaptureScreenPermission;



ui.layout(
    <vertical>
        <text marginLeft="15sp" marginTop="10sp">现在只支持单独运行，悬浮窗口没啥用，功能努力中!</text>
        <horizontal w="auto" h="auto" marginLeft="15sp">
            <button id={"showFloating"} text={"加载悬浮窗"} width={buttonWidth + "px"} />
            <text marginLeft="30sp">无障碍</text>
            <Switch w="auto" h="auto" id="autoService" checked="{{auto.service != null}}"></Switch>
            <text marginLeft="30sp">截图</text>
            <Switch w="auto" h="auto" id="captureScreenService" checked="{{currentCaptureScreenPermission}}"></Switch>
        </horizontal>
        <ScrollView>
            <vertical margin={"15sp"}>
                <vertical>
                    <text textSize="18sp" textStyle="bold">功能1：叮咚买菜签到</text>
                    <horizontal w="auto" h="auto" marginLeft="15sp">
                        <Switch w="auto" h="auto" checked={isOpenDingdong}></Switch>
                        <text marginLeft="15sp" marginRight="15sp">咚买菜签到(是否批量执行)</text>
                    </horizontal>
                    <button id={"exeDingDondSign"} marginLeft="15sp" marginRight="15sp">单独执行 叮咚</button>
                </vertical>
                <vertical>
                    <text textSize="18sp" textStyle="bold">功能2：淘宝-金币庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15sp">
                        <Switch w="auto" h="auto" checked={isOpenTaobaoGold}></Switch>
                        <text marginLeft="15sp" marginRight="15sp">金币庄园(是否批量执行)</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbTaolife" checked={isOpenTaolife} />
                        <text>淘金币庄园是否 执行淘人生</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbTmFarm" checked={isOpenTmFarm} />
                        <text>淘金币庄园是否 执行天猫农场</text>
                        <button id="btnFarmTips">提示</button>
                    </horizontal>
                    <button id={"exeGoldManor"} marginLeft="15sp" marginRight="15sp">单独执行 金币庄园</button>
                </vertical>

                <vertical>
                    <text textSize="18sp" textStyle="bold">功能3：支付宝-蚂蚁森林-蚂蚁庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15sp">
                        <Switch w="auto" h="auto" checked={isOpenAntForest}></Switch>
                        <text marginLeft="15sp" marginRight="15sp">蚂蚁森林(是否批量执行)</text>
                    </horizontal>
                    <horizontal w="auto" h="auto" marginLeft="30sp">
                        <CheckBox id="sAliScore" w="auto" h="auto" checked={isNeedGoAlipayScore}></CheckBox>
                        <text marginLeft="15sp" marginRight="15sp">是否领取支付宝积分</text>
                    </horizontal>
                    <horizontal marginLeft="30sp">
                        <CheckBox id="cbAntFarm" checked={isOpenAntFarmElse} />
                        <text marginLeft="15sp">在蚂蚁森林完毕后 是否执行蚂蚁庄园</text>
                    </horizontal>
                    <button id={"exeAntForest"} marginLeft="15sp" marginRight="15sp">单独执行 蚂蚁森林</button>
                </vertical>

                {/* <vertical>
                    <text textSize="18sp" textStyle="bold">功能4：支付宝-蚂蚁庄园</text>
                    <horizontal w="auto" h="auto" marginLeft="15sp">
                        <Switch w="auto" h="auto" checked={isOpenAntFarm}></Switch>
                        <text marginLeft="15sp" marginRight="15sp">蚂蚁庄园(是否批量执行)</text>
                    </horizontal>
                    <button id={"exeAntFarm"} marginLeft="15sp" marginRight="15sp">单独执行 蚂蚁庄园</button>
                </vertical> */}
            </vertical>
        </ScrollView>
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
    installService = auto.service != null;
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

ui.showFloating.click(() => {
    engines.execScriptFile("floating.js");
});

ui.exeDingDondSign.click(() => {
    engines.execScriptFile("./src/dingdong.js");
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
            antForestGame(isOpenAntFarmElse, isNeedGoAlipayScore);
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

ui.btnFarmTips.click(() => {
    toast("因为天猫农场适配不好(是一个网页小游戏)，无法捕捉细节UI，经常玩的玩家可以开，否则建议关闭")
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
