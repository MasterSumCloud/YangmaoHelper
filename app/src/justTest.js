// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

swipe(deviceWidth / 2, deviceHeight * 0.688 , deviceWidth / 5,deviceHeight * 0.688 ,500);

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