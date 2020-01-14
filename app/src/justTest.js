let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")
let goldEnergy = EUtil.ImageSearchEngin('./res/antTree_gold_energy.png', [0, deviceHeight * 0.135, deviceWidth, deviceHeight * 0.135], 1);
click(goldEnergy[0].point.x + 50, goldEnergy[0].point.y + 50);
console.log("获取到的坐标", goldEnergy)

console.log("结束")

function getScreenImg() {
    let screenPic = captureScreen();
    console.log(screenPic);
    sleep(100);
    if (screenPic == null || typeof (screenPic) == "undifined") {
        toastLog("截图失败,退出脚本");
        exit();
    } else {
        return screenPic;
    }
}