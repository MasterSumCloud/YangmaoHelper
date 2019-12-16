"ui";
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

        
        <horizontal w="auto" h="auto">
            <Switch w="auto" h="auto" checked={isOpenTaobaoGold}></Switch>
            <text marginLeft="15sp" marginRight="15sp">淘宝金币庄园</text>
            <button id={"exeGoldManor"}>单独执行</button>
        </horizontal>
        
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
    engines.execScriptFile("./src/godenGard.js");
});