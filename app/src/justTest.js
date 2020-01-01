let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
importPackage(org.joda.time);
requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

sleep(1000);
let hasCardAfter12 = EUtil.ImageSearchEngin('./res/taolife/taolife_get_card6.png', [deviceWidth * 0.7, deviceHeight / 2], 1);
console.log("da===", hasCardAfter12);



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