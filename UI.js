"ui";
let deviceWidth = device.width;
let deviceHeight = device.height;

const margin = 60;
const buttonWidth = parseInt(deviceWidth * 0.30);

ui.layout(
    <vertical margin={margin + "px"} bg="#FFFF00">
        <button id={"showFloating"} text={"加载悬浮窗"} width={buttonWidth + "px"}/>

        <horizontal w="auto" h="auto">
            <Switch w="auto" h="auto" ></Switch>
            <text>叮咚买菜签到</text>
        </horizontal>
    </vertical>
);
// ui.layout("./xml/activity_main.xml");

ui.showFloating.click(() => {floating
    engines.execScriptFile("floating.js");
});