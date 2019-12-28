let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('./EUtil.js');

function startTaoLife(isFromGold) {
    let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    let witeTime = 15;
    while (taoLifeDiv == null & witeTime > 0) {
        sleep(1000);
        witeTime--;
        taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    }
    sleep(5000);
    if (taoLifeDiv == null) {
        toastLog("等待超时");
        exit();
    } else {
        if (isFromGold) {
            toastLog("金币庄园过来,多呆10秒");
            sleep(11000);
        }
        if (isFromGold) {
            //判断当前界面 是否有送卡
            getCurentHasCartToGet();
            //判断当前是否有可关闭广告
            juadgeCurrentHasAD();
            //返回上级
            _backTo();
        } else {
            //判断当前界面 是否有送卡
            getCurentHasCartToGet();
            //判断当前是否有可关闭广告
            juadgeCurrentHasAD();
            //送卡
            sendCard();
            //去领取签到的
            singnGetCj();
        }

    }
}

function sendCard() {
    let searchResult = EUtil.ImageSearchEngin('./res/taolife_vist.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
    toastLog("判断是否首页");
    if (searchResult != -1) {
        console.log("找到看朋友入口", searchResult);
        click(searchResult[0].point.x + 50, searchResult[0].point.y + 50);
        sleep(1000);
        let sendCard = 0;
        console.log("进入好友互动列表");
        for (let k = 0; k < 8; k++) {
            console.log("进入好友互动列表 开始送卡和点赞=" + k);
            let sendCardPosition = EUtil.ImageSearchEngin('./res/taolife_send_card.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 5);
            if (sendCardPosition != -1) {
                console.log("开始送卡");
                for (let i = 0; i < sendCardPosition.length; i++) {
                    let cardItem = sendCardPosition[i];
                    //需要进行二次对比 判断颜色是否一致  否则是送过得
                    let temple1 = images.read('./res/taolife_send_card.png');
                    let color1 = images.pixel(temple1, 65, 38);
                    let color2 = images.pixel(getScreenImg(), cardItem.point.x + 65, cardItem.point.y + 38)
                    let isSimiler = colors.isSimilar(color1, color2);
                    console.log("颜色对比", color1 + "===" + color2);
                    if (!isSimiler) {
                        continue;
                    }
                    click(cardItem.point.x + 50, cardItem.point.y + 50);
                    sleep(300);
                    if (sendCard < 5) {
                        toastLog("送卡片");
                        click(cardItem.point.x + 50, cardItem.point.y + 50);

                        let atFriendHome = EUtil.ImageSearchEngin('./res/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 1);
                        //等待进家里时间
                        let maxWiteFriendTime = 10;
                        while (atFriendHome == -1 && maxWiteFriendTime > 0) {
                            sleep(1000);
                            atFriendHome = EUtil.ImageSearchEngin('./res/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            maxWiteFriendTime--;
                        }
                        if (atFriendHome != -1) {//在别人家里面
                            console.log("进入好友家里");
                            let thumbUp = EUtil.ImageSearchEngin('./res/taolife_tumb_up.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            if (thumbUp != -1) {
                                //点赞
                                click(thumbUp[0].point.x, thumbUp[0].point.y);
                                sleep(100);
                                toastLog("给好友点赞");
                                sendCard++;
                                if (sendCard == 5) {//5次送卡  有额外一个弹窗
                                    toastLog("5次送卡  有额外一个弹窗 关闭");
                                    let confirmB = EUtil.ImageSearchEngin('./res/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                                    if (confirmB != -1) {
                                        sleep(1500);
                                        click(confirmB[0].point.x, confirmB[0].point.y);
                                        sleep(500);
                                    }
                                }
                            }

                            let findeBackPoint = EUtil.ColorSearchEngin("#333333", [45, 225, 30, 75]);
                            if (findeBackPoint != -1) {
                                click(findeBackPoint.x, findeBackPoint.y);
                                toastLog("返回下一个");
                                sleep(1500);
                            }
                        } else {
                            back();
                            toastLog("进好友家超时，退出");
                        }
                    }
                }
            }
            //滑动屏幕
            // let scrollHeight = 202 * 5 * k;
            swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
            sleep(4000);
            toastLog("下一屏");
        }
        backGameBtn();
    }
}

function backGameBtn() {
    let findeBackPoint = EUtil.ColorSearchEngin("#333333", [45, 225, 30, 75]);
    if (findeBackPoint != -1) {
        click(findeBackPoint.x, findeBackPoint.y);
        sleep(1000);
    }
}

function singnGetCj() {
    // let qiandao = className("android.view.View").text("成就签到").findOnce().parent().children()[5].children()[0];
    // qiandao.click();
    // let qiandao = className("android.view.View").text("心愿卡 x2").findOnce().parent();
    // let childs = qiandao.children()[3];
    // childs.click();

    // let qiandao = className("android.view.View").text("拿服装消耗 5 次体力").findOnce().parent().children()[5].children()[0];
    // qiandao.click();

    // let qiandao = className("android.view.View").text("抽套装玩法参与 1 次").findOnce().parent().children()[5].children()[0];
    // let qiandao = className("android.view.View").text("下单购买宝贝1次").findOnce().parent().children()[5].children()[0];
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

requestScreenCapture();
// startTaoLife();
sendCard();
// module.exports = startTaoLife;

