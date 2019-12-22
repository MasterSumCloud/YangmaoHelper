
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")



/**
 * 获取屏幕图片
 */
requestScreenCapture();
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

function juadgeCurrentHasAD() {
    let adScreen = getScreenImg();
    let hasTip = images.read("./res/tao_life_no_tip.png");
    let hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    while (hasAdMatches != null && hasAdMatches.length > 0) {
        let pointClose = hasAdMatches[0];
        //关闭
        click(pointClose.point.x + deviceWidth * 0.34, pointClose.point.y + deviceHeight * 0.089);
        sleep(1000);
        let adScreen = getScreenImg();
        hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    }
}
juadgeCurrentHasAD();

console.log("结束", hasAdMatches)