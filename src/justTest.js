
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")


/**
 * 从排行榜获取可收集好友的点击位置
 */
function getHasEnergyfriend(type) {
    let img = getCaptureImg();
    let handImg = images.read("./res/ghand.png");
    let pList = images.matchTemplate(img, handImg, { threshold: 0.8, region: [deviceWidth * 0.9, deviceHeight * 0.16], max: 9 })

    // var point = images.findMultiColors(img, "#ffffff", [[10, 10, "#1da06d"], [50, 40, "#ffffff"]])
    // images.save(img, "/sdcard/脚本/1.png", "png", 100);
    console.log("原图", pList);

}

function getCaptureImg() {
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