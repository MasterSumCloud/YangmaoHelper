let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

function achieveMentIdentity() {
    let achieveMentPop = EUtil.ImageSearchEngin('./res/taolife/taolife_achievement.png', [150, deviceHeight / 4, deviceWidth - 300, deviceHeight * 0.5], 1);
    if (achieveMentPop != -1) {
        click(deviceWidth / 2, achieveMentPop[0].point.y + deviceHeight * 0.537);
    }
}
sleep(2000);
achieveMentIdentity();

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