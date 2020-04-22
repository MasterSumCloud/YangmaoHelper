
// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
// sleep(2000);

console.log("开始")

let btn2judou = id("tv_skucard_price").findOne(3000);
console.log("====", btn2judou.text())


console.log("结束")


function qqzan() {
    let outcCount = 6;
    let innercCount = 20;
    for (let i = 0; i < outcCount; i++) {
        for (let k = 0; k < innercCount; k++) {
            click(1000, 400 + i * 210);
            sleep(10)
        }
    }
}
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