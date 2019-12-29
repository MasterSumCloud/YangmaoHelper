// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

let setBtn = className("android.widget.LinearLayout").descContains("收藏夹").findOnce();
let top = setBtn.bounds().top;
console.log("找到了头像", top);

//找到头像
// if (setBtn != null) {
//     let header = setBtn.parent().children()[0];
//     console.log("找到了头像", header);
//     click(header.boudns.centerX(), header.boudns.centerY());
// }

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