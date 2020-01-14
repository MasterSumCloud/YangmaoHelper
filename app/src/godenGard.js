let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('../EUtil.js');

let gameDiv = null;
let stateBarHeigh = -1;
let gameHigh = 0;

let doTaolife = false;
let doFarm = false;
function startTaobao(isDoTaoLife, isDoFarm) {
    console.log("去淘宝");
    doTaolife = isDoTaoLife;
    doFarm = isDoFarm;
    launch("com.taobao.taobao");
    // //launch app
    let mineTab = juadgeIsTaobaoHome();
    let witeTaoBaoOpemTime = 8;

    while (mineTab == null && witeTaoBaoOpemTime > 0) {
        mineTab = juadgeIsTaobaoHome();
        sleep(1000);
        witeTaoBaoOpemTime--;
    }
    if (witeTaoBaoOpemTime == 0) {
        toastLog("等待进入界面超时");
        exit();
    }

    let goldHomeDiv = juadgeIsGoldHome();

    if (goldHomeDiv != null) {
        console.log("在金币庄园");
        goldHomeDiv.click();
        sleep(1000);
        openGoldGarden();
    } else if (mineTab != null) {
        console.log("在淘宝首页");
        let taojinEntance = className("android.widget.FrameLayout").descContains("领淘金币").findOnce();
        if (taojinEntance != null) {
            click(taojinEntance.bounds().centerX(), taojinEntance.bounds().centerY());
            sleep(5000);
            openGoldGarden();
        } else {
            mineTab.click();
            sleep(1000);
            //滑动半屏
            swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, deviceHeight * 0.2, 1000);
            let goldChannel = className("android.widget.TextView").textContains("金币庄园").findOnce();
            if (goldChannel != null) {
                click(goldChannel.bounds().centerX(), goldChannel.bounds().centerY());
                sleep(5000);
                openGoldGarden();
            }
        }

    } else {
        toast("不在淘宝首页 也不再 金币庄园首页");
    }

}

/**
 * 淘宝金币庄园 游戏
 */
function openGoldGarden() {
    gameDiv = className("android.webkit.WebView").textContains("金币庄园").findOnce();
    stateBarHeigh = gameDiv.bounds().top;
    gameHigh = gameDiv.bounds().bottom - gameDiv.bounds().top;

    //判断是否有金主弹窗
    let jinzuClose = text("TB1wtozXwvGK1Jjy0FgXXX9hFXa-168-168").findOnce();
    if (jinzuClose) {
        jinzuClose.parent().click();
    }

    let jinbiVist = textContains("立即签到").findOnce();
    //判断有没有金币签到 
    if (jinbiVist != null) {
        jinbiVist.click();
        sleep(1000);
        className("android.widget.Image").textStartsWith("TB1mJFIgET1gK0jSZFrXXcNCXXa-72-72").findOne().click()
    }

    //有售后进入后滑动到了底部
    //返回到顶部
    swipe(deviceWidth / 2, deviceHeight * 0.2, deviceWidth / 2, deviceHeight * 0.9, 1000);

    sleep(3000);
    //点下果子  收一下
    click(deviceWidth / 2, deviceHeight * 0.356);
    sleep(1000);

    toast("开始做领水滴任务");
    goWaterDrop();
    //金币庄园
    sleep(2000);
    //掘金团队
    swipe(deviceWidth / 2, deviceHeight * 0.2, deviceWidth / 2, deviceHeight * 0.9, 1000);
    toast("开始做掘金团队");
    goNuggetsAndBack();
    sleep(2000);
    //领金币
    swipe(deviceWidth / 2, deviceHeight * 0.2, deviceWidth / 2, deviceHeight * 0.9, 1000);
    toast("开始今日任务");
    toDaygoldTask();
}

function goWaterDrop() {
    //做领取水滴任务
    //先拿到游戏的布局
    let lingSd = className("android.widget.Button").textContains("领水滴").findOnce();
    if (lingSd != null) {
        click(lingSd.bounds().centerX(), lingSd.bounds().centerY())
        sleep(2000);
        getWaterDrop();
        //关闭水滴领取框
        click(device.width / 2, stateBarHeigh + 100);
        sleep(1000);
        toastLog("关闭水滴弹窗");
    }
    sleep(2000);
    //获取水滴
    clickWater();
}

function clickWater() {
    let shuidi = EUtil.ImageSearchEngin('./res/home_shuidi.png', [0, deviceHeight * 0.193, deviceWidth, 350], 5);
    if (shuidi != -1) {
        toastLog("领取任务所得水滴");
        shuidi.forEach(element => {
            click(element.point.x + 20, element.point.y);
            sleep(100);
        });
    }
}

function quJiaoShui() {
    let jiaoshui = textContains("去浇水").findOnce();
    if (jiaoshui != null) {
        jiaoshui.click();
        sleep(2000);
    }

    let dropWaterTimes = 0;
    let openBtmTimes = 0;
    while (dropWaterTimes < 5) {
        let keDrop = textContains("可浇水").findOnce();
        if (keDrop != null) {
            keDrop.click();
            sleep(2000);
            click(1000, 900);
            sleep(1000);
            back();
            dropWaterTimes++;
            sleep(1000);
        } else {
            if (openBtmTimes >= 5) {
                dropWaterTimes = 5;
                break;
            }
            let haoyGold = textContains("好友可偷金币").findOnce();
            if (haoyGold != null) {
                textContains("好友可偷金币").findOnce().click();
                openBtmTimes++;
                swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.3, 2000);
            } else {
                dropWaterTimes = 5;
                break;
            }

        }
    }
}



function goNuggetsAndBack() {
    // click(Math.round(deviceWidth * 0.556), Math.round(gameHigh * 0.513 + stateBarHeigh));
    let gameList = className("android.widget.Image").id("__SVG_SPRITE_NODE__").findOnce();
    gameList.parent().child(3).child(0).child(3).child(0).click();
    sleep(5000);
    //先领取  金币
    let allGold = EUtil.ImageSearchEngin('./res/gold_hom.png', [0, 200, deviceWidth, 800], 5);
    if (allGold != -1) {
        allGold.forEach(element => {
            click(element.point.x + 20, element.point.y - 20);
            sleep(1000);
        });
    }

    swipe(device.width / 2, device.height * 0.9, device.width / 2, 0, 1000);
    sleep(100);

    clickInvestMulti();
    clickInvestMulti();

    back();
}

/**
 * 金币庄园  邀请
 */
function clickInvestMulti() {
    let myTeam = className("android.view.View").text("我的团队").findOnce();
    if (myTeam != null) {
        let currentNum = className("android.view.View").text("（50/50人）").findOnce();
        if (currentNum != null) {
            toastLog("当前人数满了不再邀请");
        } else {
            let investList = textMatches(/^邀请$/).find();
            for (let i = 0; i < investList.length; i++) {
                let yaoqingBtn = textMatches(/^邀请$/).findOnce();
                if (yaoqingBtn != null) {
                    yaoqingBtn.click();
                    sleep(500);
                } else {
                    break;
                }
            }
            //换一批
            textContains("换一批推荐好友").findOnce().click();
            sleep(2000);
        }
    }

}

/**
 * 每日金币领取
 */
function toDaygoldTask() {
    // click(Math.round(deviceWidth * 0.102), Math.round(gameHigh * 0.513 + stateBarHeigh));
    let gameList = className("android.widget.Image").id("__SVG_SPRITE_NODE__").findOnce();
    gameList.parent().child(3).child(0).child(0).child(0).click();
    sleep(3000);
    //先判断是否成就领取
    let jiangli = className("android.view.View").desc("领奖励").findOnce();
    if (jiangli != null) {
        click(jiangli.bounds().centerX(), jiangli.bounds().centerY());
        sleep(3000);
        let backBtnCj = className("android.widget.ImageButton").desc("转到上一层级").findOne(2000);
        if (backBtnCj != null) {
            let cjjl = className("android.view.View").desc("领取奖励").findOnce();
            while (cjjl != null) {
                cjjl.parent().click();
                let cjjjd = className("android.view.View").desc("领取奖励").findOne(3000);
                if (cjjjd != null) {
                    cjjjd.parent().click();
                    sleep(13000);
                    back();
                    sleep(1000);
                    back();
                    sleep(1000);
                }
                cjjl = className("android.view.View").desc("领取奖励").findOnce();
                // sleep(1000);
            }
            backBtnCj.click();
            sleep(2000);
        }
    }
    //先滑动半个屏幕
    swipe(deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, 0, 1000);
    sleep(100);
    //找到店铺头
    let shopTtile = className("android.view.View").descContains("好店签到").findOnce();
    if (shopTtile != null) {
        console.log("进来了");
        //继续滑动
        let alsoScrTop = shopTtile.bounds().top;

        swipe(deviceWidth / 2, alsoScrTop - 100, deviceWidth / 2, 0, 1000);
        //正是去找对应的rv
        let shopRvList = className("android.support.v7.widget.RecyclerView").findOnce();

        if (shopRvList != null) {
            //最多是6个
            let childNum = shopRvList.childCount();
            console.log("看看孩子数量", childNum);
            if (childNum > 0) {
                let singleC = null;
                shopRvList.children().forEach(function (child) {
                    let childh = child.bounds().bottom - child.bounds().top;
                    if (singleC == null && childh > 600) {
                        singleC = child;
                    }
                });
                console.log("找到了第一个孩子");
                //找到第一个
                if (singleC != null) {
                    let childY = singleC.bounds().top;
                    let heightC = singleC.bounds().bottom - singleC.bounds().top;
                    console.log("开始循环点击", heightC);
                    for (let i = 0; i < 6; i++) {
                        goGet5GoldAndBack(Math.round(deviceWidth * 0.815), childY + 100, heightC);
                    }
                }

            }

        }
    }

    // className("android.support.v7.widget.RecyclerView").findOnce().children()
    //     .forEach(function (child) {
    //         log("孩子们", child.bounds());
    //     });

    let goTop = className("android.view.View").descContains("顶部").findOnce();
    let needBackPage = 1;
    if (goTop != null) {
        click(goTop.bounds().centerX(), goTop.bounds().centerY());
        sleep(1000);
        //进群打卡领金币
        let goGroupdaka = className("android.view.View").descContains("进群打卡领金币").findOnce();
        if (goGroupdaka != null) {
            click(Math.round(deviceWidth * 0.833), goGroupdaka.bounds().bottom);
            sleep(3000);
            needBackPage++;
            //随便点个群
            let goGroup = className("android.view.View").descMatches(/^进群打卡$/).findOnce();
            if (goGroup != null) {
                click(goGroup.bounds().centerX(), goGroup.bounds().centerY());
                sleep(10000);
                needBackPage++;
                needBackPage++;
                //点击打卡
                let vDaka = className("android.view.View").descContains("立即打卡").findOnce();
                if (vDaka != null) {
                    click(vDaka.bounds().centerX(), vDaka.bounds().centerY());
                    sleep(8000);
                    needBackPage++;
                    //判断时候有任务
                    let lingqu = id("action_button").findOnce();
                    if (lingqu != null) {
                        lingqu.click();
                        needBackPage++;
                        sleep(3000);
                        let jiangli = className("android.view.View").descContains("领取奖励").findOnce();
                        click(jiangli.bounds().centerX(), jiangli.bounds().centerY());
                        sleep(1000);
                    }
                }
            }
        }
    }
    for (let i = 0; i < needBackPage; i++) {
        back();
        sleep(1000);
    }
    toast("完事了")
}

/**
    店铺来回签到
 */
function goGet5GoldAndBack(x, y, height) {
    click(x, y);
    sleep(3000);
    back();
    sleep(1000);
    swipe(device.width / 2, height + 60, device.width / 2, 0, 1000);
    sleep(1000);
}

function getWaterDrop() {
    //需要执行的任务集合
    let arrTask = ["每日免费领水滴", "浏览指定商品", "逛福果领免费水果", "逛淘金币年货节会场", "精选好货", "逛高抵扣商品赚果实", "逛淘宝人生领服装", "逛农场领免费水果", "淘宝吃货"];

    for (let i = 0; i < arrTask.length; i++) {
        if (i == 3) {
            swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, deviceHeight * 0.6, 1000);
        }
        sleep(2000)
        let singleTask = arrTask[i];
        toast("开始" + singleTask);
        if (singleTask === "每日免费领水滴") {
            const daka = textContains("打卡").findOnce();
            openAndBack(daka, 0, false);
        } else if (singleTask === "浏览指定商品") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛福果领免费水果") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛淘金币年货节会场") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "精选好货") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛高抵扣商品赚果实") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛淘宝人生领服装") {
            if (doTaolife) {
                let qgg = getEquQggUi("逛淘宝人生领服装");
                if (qgg != null) {
                    qgg.click();
                    let startTaoLife = require("./taoLife.js");
                    startTaoLife(true);
                }
            } else {
                toast("不执行淘人生");
            }
        } else if (singleTask === "逛农场领免费水果") {
            if (doFarm) {
                let qgg = getEquQggUi(singleTask);
                if (qgg != null) {
                    qgg.click();
                    let tMaoFarm = require("./tMaoFarm.js");
                    tMaoFarm(true);
                }
            } else {
                toast("不执行天猫农场");
            }
        } else if (singleTask === "淘宝吃货") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 16000, true);
        }
    }


    function tudiClick() {
        //判断是否有土地升级
        let tudi = className("android.widget.Button").textContains("种下").findOnce();
        let hasTudi = tudi != null;
        while (hasTudi) {
            let tud2 = className("android.widget.Button").textContains("种下").findOnce();
            if (tud2 != null) {
                tud2.click();
                sleep(1000);
            } else {
                hasTudi = false;
                break;
            }
        }
    }


    function getEquQggUi(strQ) {
        //拿到拿到的去逛逛
        let qgg = textContains("去逛逛").find();
        let qkk = textContains(strQ).findOnce();
        if (qgg != null && qgg.length > 0 && qkk != null) {
            for (let i = 0; i < qgg.length; i++) {
                console.log("第几组", i + 1);
                let element = qgg[i];
                if (element != null) {//核对 找到对应的
                    let top = qkk.bounds().top;
                    let bottom = qkk.bounds().bottom;
                    console.log("定位坐标坐标", top + "====" + bottom)
                    let qTop = element.bounds().top;
                    let qBottom = element.bounds().bottom;
                    console.log("去逛逛坐标", qTop + "====" + qBottom)
                    if (top < qTop && bottom > qBottom) {
                        console.log("找到了", "坐标" + i);
                        return element;
                    }
                }
            }
        }
        return null;
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

}

function juadgeIsTaobaoHome() {
    let homeMine = className("android.widget.FrameLayout").descContains("我的淘宝").findOnce();
    return homeMine;
}

function juadgeIsGoldHome() {
    let homeGold = className("android.webkit.WebView").textContains("金币庄园").findOnce();
    return homeGold;
}


module.exports = startTaobao;