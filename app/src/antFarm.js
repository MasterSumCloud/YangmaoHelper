let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('../EUtil.js');

function startFarm(isOpenAntFarmStartBall) {
    //进入支付宝
    //判断当前是否进入了蚂蚁庄园
    let antFarm = className("android.webkit.WebView").textContains("蚂蚁庄园").findOnce();
    let witeTimeSec = 10;
    while (antFarm == null && witeTimeSec > 0) {
        sleep(1000);
        witeTimeSec--;
        antFarm = className("android.webkit.WebView").textContains("蚂蚁庄园").findOnce();
    }
    if (antFarm != null) {
        sleep(5000);
        //额外判断弹窗
        let wheatBtn = EUtil.ImageSearchEngin('./res/antFarm_wheat.png', [deviceWidth / 3, deviceHeight * 0.675, deviceWidth / 3, deviceHeight * .3], 1);
        if (wheatBtn != -1) {
            click(wheatBtn[0].point.x, wheatBtn[0].point.y);
        }
        //判断自己家的鸡在不在
        juadgeSlefAtHome();
        //判断是否有贼鸡
        juadgeHasZeiji();
        //玩星星球
        if (isOpenAntFarmStartBall) {
            let antsports = EUtil.ImageSearchEngin('./res/antFarm_sports.png', [deviceWidth * 0.815, deviceHeight * 0.315], 1);
            if (antsports != -1) {
                click(antsports[0].point.x, antsports[0].point.y);
                sleep(1000);
                let ballItem = EUtil.ImageSearchEngin('./res/antFarm_stars_ball.png', [0, deviceHeight / 2], 1);
                if (ballItem != -1) {
                    click(ballItem[0].point.x, ballItem[0].point.y);
                    sleep(5000);
                    toastLog("开始星星球");
                    engines.execScriptFile("./lib/startBall.js");
                    sleep(70 * 1000);
                    back();
                    sleep(2000);
                    click(deviceWidth / 2, 300);
                    sleep(2000);
                }
            }

        }
        //判断是否有饲料可以领取
        // getFoodsCanTake();
        // sleep(1000);
        //喂饲料 930 2000
        click(Math.round(deviceWidth * 0.861), Math.round(deviceHeight * 0.9));
        sleep(500);
        //领个蛋 183 1682
        click(Math.round(deviceWidth * 0.17), Math.round(deviceHeight * 0.757));
        sleep(500);
    } else {
        toastLog("不在庄园页面结束");
        exit();
    }
    toastLog("完事收工");
    back();
}

function getFoodsCanTake() {
    let food = EUtil.ImageSearchEngin('./res/antFarm_food.png', [deviceWidth / 2, deviceHeight * 0.36], 5);
    if (food != -1) {
        food.forEach(element => {
            click(element.point.x + 90, element.point.y + 130);
        });
    }
}

function juadgeSlefAtHome() {
    //喂饲料 判断自己家的鸡是否还在
    click(Math.round(deviceWidth * 0.861), Math.round(deviceHeight * 0.9));
    sleep(1000);
    let screenChickenO = getScreenImg();
    let chickenOut = images.read("./res/find_my_chicken.png");
    let chickenOPoint = images.matchTemplate(screenChickenO, chickenOut, { threshold: 0.8, region: [deviceWidth / 2, deviceHeight * 0.4, deviceWidth / 2 - 100, deviceHeight * 0.27], max: 1 }).matches;
    console.log("自己是否在家", chickenOPoint);
    if (chickenOPoint != null && chickenOPoint.length > 0) {
        let findPoint = chickenOPoint[0];
        click(findPoint.point.x, findPoint.point.y);
        sleep(5000);
        // 找自己的鸡
        click(deviceWidth * 0.37, deviceHeight * 0.74);
        sleep(1000);
        // 判断是否点错了
        let imgScrrenPop = getScreenImg();
        let popNote = images.findMultiColors(imgScrrenPop, "#CCCCCC", [[20, 20, "#CCCCCC"], [deviceWidth * 0.39, 20, "#ff3c45"]], {
            region: [deviceWidth * 0.12, deviceHeight * 0.39, deviceWidth * 0.76, deviceHeight / 4]
        });
        if (popNote != null) {//点错了
            click(popNote.point.x + 100, popNote.point.y + 50);
            sleep(1000);
            click(deviceWidth * 0.79, deviceHeight * 0.74);
            sleep(5000);
        } else {
            sleep(5000);
        }//没有 直接回家了
        toastLog("回家了");
    }
}


function juadgeHasZeiji() {
    toastLog("查看是否有贼鸡！");
    sleep(3000);
    let screenZj = getScreenImg();
    let zeiren = images.read("./res/zei_chicken.png");
    let pList = images.matchTemplate(screenZj, zeiren, { threshold: 0.8, region: [Math.round(deviceWidth * 0.185), deviceHeight * 0.63], max: 2 });
    if (pList != null) {
        console.log("找到的贼鸡", pList.matches);
        if (pList.matches != null && pList.matches.length > 0) {
            pList.matches.forEach(item => {
                console.log("怼贼鸡", item);
                click(item.point.x, item.point.y + 10);
                sleep(1000);
                let screenFuck = getScreenImg();
                let fuckOff = images.read("./res/piss_off.png");
                let ppPoint = images.matchTemplate(screenFuck, fuckOff, { threshold: 0.8, region: [0, deviceHeight * 0.58], max: 1 }).matches;
                if (ppPoint != null && ppPoint.length > 0) {
                    toastLog("贼鸡拿命来");
                    let pointItem = ppPoint[0];
                    click(pointItem.point.x, pointItem.point.y);
                    sleep(1000);
                }
            });
        }
        sleep(3000);
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
// requestScreenCapture();
// startFarm(true);
module.exports = startFarm;