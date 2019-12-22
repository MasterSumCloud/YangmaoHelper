
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")



/**
 * 获取屏幕图片
 */

function getScreenImg() {
    requestScreenCapture();
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
// let antFarm = className("android.webkit.WebView").textContains("蚂蚁庄园").findOnce();
startFarm();
console.log("结束", antFarm)