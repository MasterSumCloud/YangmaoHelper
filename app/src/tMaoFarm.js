let deviceWidth = device.width;
let deviceHeight = device.height;

function startTmaoFarm(isFromGold) {
    let tMaoFarmDiv = className("android.webkit.WebView").textContains("天猫农场").findOnce();
    let witeTime = 15;
    while (tMaoFarmDiv == null & witeTime > 0) {
        sleep(1000);
        witeTime--;
        tMaoFarmDiv = className("android.webkit.WebView").textContains("天猫农场").findOnce();
    }
    if (tMaoFarmDiv == null) {
        toastLog("等待超时");
        exit();
    } else {
        if (isFromGold) {
            toastLog("金币庄园过来,多呆10秒");
            sleep(11000);
        }
        let imidShou = textContains("立即去收").findOnce();
        //每日第一次进去提示
        if (imidShou != null) {
            imidShou.click();
            sleep(500);
        }
        //先收集所有的太阳
        collectSuns();
        //点击农田
        whileClickFarm();
        //去做任务
        finisTask();
        //去做进店任务
        seePriciousBox();
        //关闭弹窗
        let popTop = textContains("TB13zrOKSzqK1RjSZFHXXb3CpXa").findOnce();
        if (popTop != null) {
            let closeIc = popTop.parent().children()[1];
            click(closeIc.bounds().centerX(), closeIc.bounds().centerY());
            sleep(1000);
        }
        //再次收集太阳
        collectSuns();
        back();
    }
}

function seePriciousBox() {
    for (let i = 0; i < 5; i++) {
        let goShop = textContains("去进店").findOnce();
        if (goShop != null) {
            goShop.click();
            let goOrn = textContains("店铺微淘").findOnce();
            let witeMaxSec = 8;
            while (goOrn == null && witeMaxSec > 0) {
                sleep(1000);
                goOrn = textContains("店铺微淘").findOnce();
                witeMaxSec--;
            }
            //先直接找一遍
            let maxSearch = 3;
            while (maxSearch > 0) {
                let tmGame = descContains("天猫农场").findOnce();
                if (tmGame != null) {
                    let openV = descContains("立即打开").findOnce();
                    click(openV.bounds().centerX(), openV.bounds().centerY());
                    maxSearch = 0;
                    break;
                } else {
                    rootautomator.swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, deviceHeight * 0.1, 1000);
                    maxSearch--;
                    sleep(100);
                }
            }
            back();
        } else {
            break;
        }
    }

}


function finisTask() {
    let gameDiv = id("GameDiv").findOnce();
    if (gameDiv != null) {
        let stateBarHeigh = gameDiv.bounds().top;
        let farmHeight = gameDiv.bounds().bottom - gameDiv.bounds().top;
        //领阳光
        click(Math.round(deviceWidth * 0.909), Math.round(farmHeight * 0.876 + stateBarHeigh))
        sleep(2000);
        let liulTask = textContains("去浏览").findOnce();
        openAndBack(liulTask, 18000, true);
    }
}

function openAndBack(uiObject, delay, needBack) {
    if (uiObject != null) {
        uiObject.click();
        sleep(delay);
        if (needBack) {
            back();
        }
    }
}

function collectSuns() {
    //获取到游戏的上部分布局
    let gameDiv = id("GameDiv").findOnce();
    if (gameDiv != null) {
        let farmScreen = getScreenImg();
        let hasSums = images.read("./res/sun_farm.png");

        let hasSunsMatches = images.matchTemplate(farmScreen, hasSums, { threshold: 0.8, region: [0, gameDiv.bounds().top, deviceWidth, gameDiv.bounds().bottom - gameDiv.bounds().top], max: 9 }).matches;
        let maxTime = 2;
        while (hasSunsMatches != null && hasSunsMatches.length > 0 && maxTime > 0) {
            for (let i = 0; i < hasSunsMatches.length; i++) {
                let item = hasSunsMatches[i];
                click(item.point.x, item.point.y);
                sleep(100);
            }
            hasSunsMatches = images.matchTemplate(farmScreen, hasSums, { threshold: 0.8, region: [0, gameDiv.bounds().top, deviceWidth, gameDiv.bounds().bottom - gameDiv.bounds().top], max: 9 }).matches;
            maxTime--;
        }
    } else {
        toastLog("未获取到游戏的上部分布局，退出");
    }

}

function whileClickFarm() {
    let x1 = deviceWidth * 0.285;
    let x2 = deviceWidth / 2;
    let x3 = deviceWidth * 0.722;
    let gameDiv = id("GameDiv").findOnce();
    if (gameDiv != null) {
        let gameHigh = gameDiv.bounds().bottom - gameDiv.bounds().top;
        let stateBarHeigh = gameDiv.bounds().top;
        for (let i = 0; i < 9; i++) {
            switch (i) {
                case 0:
                    clickFarm(x2, gameHigh * 0.848 + stateBarHeigh);
                    break;
                case 1:
                    clickFarm(x1, gameHigh * 0.761 + stateBarHeigh);
                    break;
                case 2:
                    clickFarm(x2, gameHigh * 0.685 + stateBarHeigh);
                    break;
                case 3:
                    clickFarm(x1, gameHigh * 0.607 + stateBarHeigh);
                    break;
                case 4:
                    clickFarm(x3, gameHigh * 0.612 + stateBarHeigh);
                    break;
                case 5:
                    clickFarm(x2, gameHigh * 0.532 + stateBarHeigh);
                    break;
                case 6:
                    clickFarm(x1, gameHigh * 0.465 + stateBarHeigh);
                    break;
                case 7:
                    clickFarm(x2, gameHigh * 0.373 + stateBarHeigh);
                    break;
                case 8:
                    clickFarm(x3, gameHigh * 0.453 + stateBarHeigh);
                    break;
            }
            sleep(100);
            //如果有升级点一下
            // click(deviceWidth / 2, Math.round(gameHigh * 0.876 + stateBarHeigh));
        }
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

function clickFarm(x, y) {
    let confirm = className("android.widget.Button").textContains("确定").findOnce();
    if (confirm != null) {
        confirm.click();
    }
    click(x, y);
    sleep(100);
}

module.exports = startTmaoFarm;