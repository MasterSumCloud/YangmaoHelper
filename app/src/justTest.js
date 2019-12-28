// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
// swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 205, 1000);
// gestures([0, 1000, [deviceWidth / 2, deviceHeight - 200], [deviceWidth / 2, deviceHeight - 195]],
    // [1000, 1000, [deviceWidth / 2, 1500], [deviceWidth / 2, 1000]]);
// press(deviceWidth / 2, deviceHeight * 0.7, 3);

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