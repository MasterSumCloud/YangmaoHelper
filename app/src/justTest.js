
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")


/**
 * 从排行榜获取可收集好友的点击位置
 */
function getHasEnergyfriend(type) {
    let screen = getScreenImg();
    // let handImg = images.read("./res/ghand.png");
    // let pList = images.matchTemplate(img, handImg, { threshold: 0.8, region: [deviceWidth * 0.9, deviceHeight * 0.16], max: 9 })

    let point = images.findColor(screen, "#2fbf6c", {
        region: [Math.round(deviceWidth * 0.773), Math.round(deviceHeight * 0.158), 200, Math.round(deviceHeight * 0.76)],
        threshold: 0
    })
    // images.save(img, "/sdcard/脚本/1.png", "png", 100);
    console.log("原图", point);

}

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

getHasEnergyfriend(1);


console.log("结束")