// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
sleep(2000);
//click(deviceWidth / 2, 1670);
console.log("开始")

let date = new Date();
console.log("获取到的时间", date.getHours())

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

function backGameBtn(color) {
    if (color == undefined || color == null) {
        color = "#333333";
    }
    let findeBackPoint = EUtil.ColorSearchEngin(color, [45, 225, 30, 75]);
    if (findeBackPoint != -1) {
        click(findeBackPoint.x, findeBackPoint.y);
        sleep(1000);
    }
}