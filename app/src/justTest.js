
let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
// sleep(2000);

console.log("开始")

function collectEnergy() {
    // let hasSelfPower = className("android.widget.Button").textStartsWith("收集能量").findOnce() != null;
    let coEnergy = EUtil.ImageSearchEngin('./res/white_hand.png', [0, deviceHeight * 0.22, deviceWidth, deviceHeight * 0.18], 9);
    if (coEnergy!=-1) {
        toastLog("开始收集");
        for (let i = 0; i < coEnergy.length; i++) {
            click(coEnergy[i].point.x - 40, coEnergy[i].point.y - 80);
            sleep(300);
        }
    }
}

collectEnergy();

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