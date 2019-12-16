"ui";

let goldGame = require("./src/godenGard.js");

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

let isOpenTaolife = false;
let isOpenTmFarm = false;

ui.layout(
    <vertical margin={30 + "sp"}>

        <horizontal w="auto" h="auto">
            <button id={"showFloating"} text={"加载悬浮窗"} width={buttonWidth + "px"} />
            <text marginLeft="30sp">无障碍权限状态==》</text>
            <Switch w="auto" h="auto" id="autoService" checked="{{auto.service != null}}"></Switch>
        </horizontal>

        <text>现在只支持单独运行，悬浮窗口没啥用，功能努力中</text>

        <horizontal w="auto" h="auto">
            <Switch w="auto" h="auto" checked={isOpenDingdong}></Switch>
            <text marginLeft="15sp" marginRight="15sp">咚买菜签到</text>
            <button id={"exeDingDondSign"}>单独执行</button>
        </horizontal>

        <vertical>
            <horizontal w="auto" h="auto">
                <Switch w="auto" h="auto" checked={isOpenTaobaoGold}></Switch>
                <text marginLeft="15sp" marginRight="15sp">淘宝金币庄园</text>
            </horizontal>
            <horizontal>
                <CheckBox id="cbTaolife" checked={isOpenTaolife} />
                <text>淘金币庄园是否 执行淘人生</text>
                <button id="btnTaoTips">提示</button>
            </horizontal>
            <horizontal>
                <CheckBox id="cbTmFarm" checked={isOpenTmFarm} />
                <text>淘金币庄园是否 执行天猫农场</text>
                <button id="btnFarmTips">提示</button>
            </horizontal>
            <button id={"exeGoldManor"}>单独执行</button>
        </vertical>


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

ui.showFloating.click(() => {
    engines.execScriptFile("floating.js");
});

ui.exeDingDondSign.click(() => {
    engines.execScriptFile("./src/dingdong.js");
});

ui.exeGoldManor.click(() => {
    // engines.execScriptFile("./src/godenGard.js");
    var thread = threads.start(function () {
        goldGame(isOpenTaolife, isOpenTmFarm);
    });
});

ui.cbTaolife.on("check", function (checked) {
    isOpenTaolife = checked;
});

ui.cbTmFarm.on("check", function (checked) {
    isOpenTmFarm = checked;
});

ui.btnTaoTips.click(() => {
    toast("因为淘人生适配不好(是一个网页小游戏)，无法捕捉细节UI，经常玩的玩家可以开，否则建议关闭")
});

ui.btnFarmTips.click(() => {
    toast("因为天猫农场适配不好(是一个网页小游戏)，无法捕捉细节UI，经常玩的玩家可以开，否则建议关闭")
});
