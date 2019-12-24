let deviceWidth = device.width;
let deviceHeight = device.height;

function startTaoLife(isFromGold) {
    let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    let witeTime = 15;
    while (taoLifeDiv == null & witeTime > 0) {
        sleep(1000);
        witeTime--;
        taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    }
    if (taoLifeDiv == null) {
        toastLog("等待超时");
        exit();
    } else {
        if (isFromGold) {
            toastLog("金币庄园过来,多呆10秒");
            sleep(11000);
        }
        //判断当前界面 是否有送卡
        getCurentHasCartToGet();
        //判断当前是否有可关闭广告
        juadgeCurrentHasAD();
        //返回上级
        _backTo();
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

function getCurentHasCartToGet() {
    let cardScreen = getScreenImg();
    let taoCardToGet = images.read("./res/send_wish_card.png");
    let hasCardMatches = images.matchTemplate(cardScreen, taoCardToGet, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight * 0.338], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        let pointGet = hasCardMatches[0];
        console.log("找到的领卡位置", pointGet);
        toastLog("有可以领取的卡片");
        //点击领取
        for (let i = 0; i < 6; i++) {
            //领取
            click(pointGet.point.x + 110, pointGet.point.y + 50);
            sleep(300);
            //回赠
            click(pointGet.point.x - 135, pointGet.point.y + 50);
            sleep(300);
            //换
            click(pointGet.point.x + 310, pointGet.point.y - 142);
            sleep(400);
        }
        //点击关闭
        click(deviceWidth / 2, pointGet.point.y + 300);
        sleep(500)
    }
}

function _backTo() {
    back();
    sleep(1000);
    let backScreen = getScreenImg();
    let backTxt = images.read("./res/back_taobao.png");
    let hasCardMatches = images.matchTemplate(backScreen, backTxt, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.27], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        click(deviceWidth / 2, hasCardMatches.point.y);
        sleep(2000);
    }
}

/**
 * 获取屏幕图片
 */
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


module.exports = startTaoLife;

