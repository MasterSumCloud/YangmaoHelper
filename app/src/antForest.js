let deviceWidth = device.width;
let deviceHeight = device.height;

function startAntForest(playFarm, getAliScore, forestCruiseMode, isOpenAntFarmStartBall) {
    //进入支付宝
    launch("com.eg.android.AlipayGphone");
    sleep(1000);
    let witeInHome = 5;
    while (witeInHome > 0) {
        let inHome = id("tab_description").text("首页").findOnce();
        if (inHome == null) {
            sleep(1000);
            witeInHome--;
        } else {
            witeInHome = -10;
        }
    }
    //是否需要领取积分
    getNeedGetAliScore(getAliScore);
    //判断是否已经在游戏界面
    let gamePartHome = id("J_af_home").findOnce();

    if (witeInHome != -10 && gamePartHome == null) {
        toastLog("不在支付宝首页,也不在游戏界面！退出");
        exit();
    }
    //在首页寻找 蚂蚁深林和蚂蚁庄园的入口
    let antForest = id("app_text").textContains("蚂蚁森林").findOnce();
    if (antForest != null || gamePartHome != null) {
        //在蚂蚁森林
        if (gamePartHome == null) {
            //进入蚂蚁深林
            toastLog("进入蚂蚁深林");
            click(antForest.bounds().centerX(), antForest.bounds().centerY());
            sleep(5000);
        }
        console.log("巡航模式状态" + forestCruiseMode);
        //启用了巡航模式
        if (forestCruiseMode) {
            toastLog("开启巡航模式")
            let minite = 29;
            let timeShow = setInterval(function () {
                toast("剩余时间" + minite + "分");
            }, 60 * 1000);
            //30分钟后取消
            setTimeout(function () {
                doHalfHour = false;
                clearInterval(timeShow);
            }, 30 * 60 * 1000);

            let doHalfHour = true;
            let circleTimes = 0;

            while (doHalfHour) {
                circleTimes++;
                circleCode(true, circleTimes);
            }
        } else {
            circleCode(false, 1);
        }

        if (playFarm) {
            //返回一级
            back();
            sleep(1000);
            //滑动到顶部
            swipe(deviceWidth / 2, deviceHeight * 0.1, deviceWidth / 2, deviceHeight * 0.8, 1000);
            swipe(deviceWidth / 2, deviceHeight * 0.1, deviceWidth / 2, deviceHeight * 0.8, 1000);
            let antFf = id("J_antfarm_container").text("蚂蚁庄园").findOnce();
            if (antFf) {
                antFf.click();
                let antFramGame = require("./antFarm.js")
                antFramGame(isOpenAntFarmStartBall);
            }
        }
        back();
        sleep(500);
        back();
        sleep(500);
        back();
        sleep(500);
        toastLog("完成了");
    } else {
        toastLog("没有在首页检测到蚂蚁森林，请去更多里添加");
        exit();
    }

}

function circleCode(circle, times) {
    //滑动半个屏幕
    if (times == 1) {
        toastLog("查询是否有能量可以收集");
        collectEnergy();
        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1000);
        //寻找定位点
        let weekTop = className("android.view.View").textContains("周排行榜").findOnce();
        if (weekTop != null) {
            weekTop.click();
            swipe(deviceWidth / 2, weekTop.bounds().top, deviceWidth / 2, 0, 1000);
        }
        toastLog("开始寻找偷能量");
    } else {
        toastLog("开始第" + times + "次循环");
    }
    // seekToSteal(true);
    //去全部页面
    let seekMore = className("android.view.View").textContains("查看更多好友").findOnce();
    if (seekMore != null) {
        seekMore.click();
        sleep(3000);
        //判断是否还有更多
        let screen = getScreenImg();
        let noMore = images.read("./res/no_more.png");
        let hasMore = images.matchTemplate(screen, noMore, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight - 150], max: 1 }).matches.length == 0;
        console.log("是否有更多", hasMore);
        let maxSearchTime = 32;//最大限制次数
        let handImg = images.read("./res/ghand.png");
        while (hasMore && maxSearchTime > 0) {
            let finded = getCanStealfriend(handImg);
            if (finded != null && finded.length > 0) {
                finded.forEach(item => {
                    console.log("找到的点", item);
                    stealAndBack(item);
                });
            }

            sleep(1000);
            swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.1, 1000);
            if (maxSearchTime < 27) {//前5次不判断是否到底部
                let screen2 = getScreenImg();
                hasMore = images.matchTemplate(screen2, noMore, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight - 150], max: 1 }).matches.length == 0;
                if (!hasMore) {
                    toastLog("已经没有更多了")
                    break;
                }
            }
            maxSearchTime--;
        }
        //回收资源
        handImg.recycle();
        noMore.recycle();

        if (circle) {
            back();
            sleep(1000);
        }
    }
}

function seekToSteal(simple) {
    if (simple) {
        let canSteal = className("android.widget.Button").textContains("可收取").findOnce() != null;
        while (canSteal) {
            stealAndBack(canSteal);
            //继续寻找
            let canStealItem = className("android.widget.Button").textContains("可收取").findOnce();
            if (canStealItem != null) {
                canStealItem.click();
            } else {
                canSteal = false;
                break;
            }
        }
    } else {
        let finded = getCanStealfriend();
        if (finded != null && finded.length > 0) {
            finded.forEach(item => {
                stealAndBack(item);
            });
        }
    }
}



function stealAndBack(item) {
    click(deviceWidth / 2, item.point.y + 10);
    sleep(3000);
    //判断进入了游戏布局 否则不返回
    let gameV = id("J_app_outter").findOnce();
    if (gameV != null) {
        //开始偷
        collectEnergy();
        back();
        sleep(1000);
    }
}

function collectEnergy() {
    let hasSelfPower = className("android.widget.Button").textContains("收集能量").findOnce() != null;
    let maxTimes = 9;
    while (hasSelfPower && maxTimes > 0) {
        toastLog("开始收集");
        let collectSelf = className("android.widget.Button").textContains("收集能量").findOnce();
        if (collectSelf != null) {
            click(collectSelf.bounds().centerX(), collectSelf.bounds().centerY());
            sleep(300);
        } else {
            toastLog("采集完毕");
            hasSelfPower = false;
            break;
        }
        maxTimes--;
    }
}

/**
 * 从排行榜 找到可以收取能量的
 */
function getCanStealfriend(handImg) {
    let img = getScreenImg();
    let pList = images.matchTemplate(img, handImg, { threshold: 0.8, region: [deviceWidth * 0.9, deviceHeight * 0.16], max: 9 });
    if (pList != null) {
        console.log("找到的做标记", pList.matches);
        return pList.matches;
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

function getNeedGetAliScore(need) {
    //如果需要领取积分
    if (need) {
        let inMine = id("tab_description").text("我的").findOnce();
        click(inMine.bounds().centerX(), inMine.bounds().centerY());
        sleep(1500);
        //判断当前有没有积分可以领取
        let hasScore = textContains("个积分待领取").findOnce();
        if (hasScore != null) {
            let backCount = 0;
            let memeberAli = id("item_left_text").text("支付宝会员").findOnce();
            if (memeberAli != null) {
                click(memeberAli.bounds().centerX(), memeberAli.bounds().centerY());
                backCount++;
                sleep(3000);
                let getScoreV = className("android.view.View").text("领积分").findOnce();
                if (getScoreV != null) {
                    click(getScoreV.bounds().centerX(), getScoreV.bounds().centerY());
                    sleep(3000);
                    backCount++;
                    let clickGetScore = className("android.view.View").text("点击领取").findOnce();
                    while (clickGetScore != null) {
                        click(clickGetScore.bounds().centerX(), clickGetScore.bounds().centerY());
                        sleep(300);
                        clickGetScore = className("android.view.View").text("点击领取").findOnce();
                    }
                }
            }

            for (let i = 0; i < backCount; i++) {
                back();
                sleep(500);
            }
        } else {
            toastLog("没有积分可领取")
        }
        let inHome = id("tab_description").text("首页").findOnce();
        click(inHome.bounds().centerX(), inHome.bounds().centerY());
        sleep(500);
    }
}


// collectEnergy();
module.exports = startAntForest;
