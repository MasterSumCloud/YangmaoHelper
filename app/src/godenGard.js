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
    sleep(3000);
    //加入头金币和浇水
    quJiaoShui();
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

function findTaskAndDoIt2(doName) {
    let itemTaskUi = textStartsWith(doName).findOnce();
    if (itemTaskUi != null) {
        // console.log("测试=="+itemTaskUi.indexInParent())
        try {
            let finishTypeUi = itemTaskUi.parent().child(itemTaskUi.indexInParent() + 4);
            let stateTaskType = finishTypeUi.text();
            if (stateTaskType != null && stateTaskType != undefined && stateTaskType != '') {
                if (stateTaskType.includes("冷却中")) {
                    console.log("冷却中的任务", doName);
                } else if (stateTaskType.includes("已完成")) {
                    console.log("已完成的任务", doName);
                } else {
                    if (stateTaskType == '去逛逛' || stateTaskType == '去完成') {
                        console.log("执行的任务UI", itemTaskUi);
                        liuLanAndBack(finishTypeUi, 15000, true);
                        // waitUiReload(doName, 1);
                    } else if (stateTaskType == '打卡') {
                        console.log("执行的任务UI", itemTaskUi);
                        liuLanAndBack(finishTypeUi, 0, false);
                        // waitUiReload(doName, 1);
                    }
                }
            }
        } catch (error) {

        }

    }
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
    let toujibi = className("android.widget.Button").text("偷金币").findOnce();
    click(toujibi.bounds().centerX(), toujibi.bounds().centerY());
    if (toujibi != null) {
        sleep(2000);
        let haoyGold = textContains("个好友可偷金币").findOnce();
        while (haoyGold != null) {
            let kejiaoshui = className("android.widget.Button").text("可浇水").findOnce();
            while (kejiaoshui != null) {
                kejiaoshui.click();
                sleep(2000);
                let jiaoshui = className("android.widget.Button").text("浇水").findOnce();
                if (jiaoshui != null) {
                    click(jiaoshui.bounds().centerX(), jiaoshui.bounds().centerY());
                    sleep(1000);
                    let back = className("android.widget.Button").text("返回").findOnce();
                    if (back != null) {
                        back.click();
                        sleep(1500);
                    }
                }
                kejiaoshui = className("android.widget.Button").text("可浇水").findOnce();
            }
            let tuoJinbi = className("android.widget.Button").textContains("，偷金币").findOnce();
            while (tuoJinbi != null) {
                tuoJinbi.click();
                sleep(2000);
                //写死坐标 点一下
                click(deviceWidth / 2, deviceHeight * 0.356);
                sleep(1000);
                let back = className("android.widget.Button").text("返回").findOnce();
                if (back != null) {
                    back.click();
                    sleep(1500);
                }
                tuoJinbi = className("android.widget.Button").textContains("，偷金币").findOnce();
            }

            haoyGold.click();
            swipe(deviceWidth / 2, deviceHeight * 0.7, deviceWidth / 2, deviceHeight * 0.3, 2000);
            sleep(1000);
            haoyGold = textContains("个好友可偷金币").findOnce();
        }
        //关闭水滴领取框
        click(device.width / 2, stateBarHeigh + 100);
        sleep(1000);
        toastLog("关闭偷金币弹窗");
    }

}


function oldQujiaoshui() {
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
        toastLog("有成就待领取")
        click(jiangli.bounds().centerX(), jiangli.bounds().centerY());
        sleep(3000);
        let backBtnCj = className("android.widget.ImageButton").desc("转到上一层级").findOne(2000);
        if (backBtnCj != null) {
            let cjjl = className("android.view.View").desc("领取奖励").findOnce();
            toastLog("开始领取成就")
            while (cjjl != null) {
                console.log("成就循环中");
                cjjl.parent().click();
                let cjjjd = className("android.view.View").desc("领取奖励").findOne(3000);
                if (cjjjd != null) {
                    console.log("点击领取");
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
    let partent = textStartsWith("领水滴 做任务领水滴，可大幅提升植物成熟后的收获哦").findOnce();
    if (partent != null) {
        let listTask = partent.child(0).child(1).child(0);
        //先拿到所有可执行的任务 
        let canDoTask = [];
        for (let k = 0; k < listTask.childCount(); k++) {
            let taskItem = listTask.child(k);
            if (taskItem != null) {
                let textOfItem = taskItem.text();
                if (textOfItem != null && textOfItem != undefined && textOfItem != '') {
                    if (textOfItem.includes('每日限领')) {
                        let putTask = textOfItem.slice(0, textOfItem.indexOf(" ") + 1);
                        if (putTask.includes("首页")) {
                            continue;
                        } else if (putTask.includes("淘宝人生")) {
                            continue;
                        } else if (putTask.includes("消消消")) {
                            continue;
                        } else if (putTask.includes("下单")) {
                            continue;
                        } else if (putTask.includes("进群打卡")) {
                            continue;
                        } else if (putTask.includes("去搜索")) {
                            continue;
                        }
                        console.log("保存的任务", putTask)
                        canDoTask.push(putTask);
                    }
                }
            }
        }

        // for (let o = 0; o < canDoTask.length; o++) {
        //有BUG 只领取前4 系统UI刷新后 拿到的控件还是之前的
        for (let o = 0; o < 4; o++) {
            let doName = canDoTask[o];
            findTaskAndDoIt2(doName);
        }
    }
}

function findShuidiView(fundStr) {
    return className("android.view.View").textStartsWith(fundStr).findOnce();
}

function liuLanAndBack(uiSelf, delay, needBack) {
    if (uiSelf != null) {
        click(deviceWidth * 0.85, uiSelf.bounds().centerY());
        // uiSelf.click()
        sleep(delay);
        if (needBack) {
            back();
            sleep(3000);
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

function getEquQwcUi(strQ) {
    //拿到拿到的去逛逛
    let qwc = textContains("去完成").find();
    let qkk = textContains(strQ).findOnce();
    if (qwc != null && qwc.length > 0 && qkk != null) {
        for (let i = 0; i < qwc.length; i++) {
            console.log("第几组", i + 1);
            let element = qwc[i];
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
            sleep(2000);
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