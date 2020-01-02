// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

let dd = textContains("去换衣服").findOnce();



console.log("结束",dd)

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