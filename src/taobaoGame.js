let deviceWidth = device.width;
let deviceHeight = device.height;


function startTaobao() {
    console.log("去淘宝");

    // launch("com.taobao.taobao");
    sleep(3000)
    //launch app
    cdescContains("我的淘宝").findOnce().click();
    sleep(1000)
    swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, 0, 1000);

    click(deviceWidth * 0.75, deviceHeight * 0.7);
    openGoldGarden()
}

/**
 * 淘宝金币庄园 游戏
 */
function openGoldGarden() {
    let jinbiVist = textContains("立即签到").findOnce();
    //判断有没有金币签到 
    if (jinbiVist != null) {
        jinbiVist.click();
        sleep(1000);
        className("android.widget.Image").text("TB1mJFIgET1gK0jSZFrXXcNCXXa-72-72").findOne().click()
    }

    sleep(3000);
    goWaterDrop();
    //金币庄园
    sleep(2000);
    //掘金团队
    goNuggetsAndBack();
    sleep(2000);
    //领金币
    toDaygoldTask();
}

function goWaterDrop() {
    //做领取水滴任务
    click(973, 1113);
    sleep(2000);
    getWaterDrop();
    //关闭水滴领取框
    click(device.width / 2, 235);
    sleep(1000);
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
    click(600, 1170);
    sleep(5000);
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

/**
 * 每日金币领取
 */
function toDaygoldTask() {
    click(110, 1146);
    sleep(3000);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, 0, 1000);
    sleep(100);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, device.height * 0.9 - 540, 500);

    let itemButtonX = 912;
    let firstButtonY = 283;

    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    //回去
    back();
    sleep(2000);
    //重新进来
    click(110, 1146);
    sleep(3000);
    //进群打卡领金币
    click(900, 950);
    sleep(3000);
    //随便点个群
    click(500, 485);
    sleep(10000);
    //点击打卡
    click(700, 700);
    sleep(8000);
    //判断时候有任务
    let lingqu = id("action_button").findOnce();
    if (lingqu != null) {
        lingqu.click();
        sleep(3000);
        descContains("领取奖励").findOnce().click();
        back();
        sleep(1000);
        back();
        sleep(1000);
        back();
        sleep(1000);
        back();
        sleep(1000);
        back();
        sleep(1000);
        back();
        sleep(1000);
    }
    toast("完事了")
}

/**
    店铺来回签到
 */
function goGet5GoldAndBack(x, y, i) {
    click(x, y);
    sleep(3000);
    back();
    sleep(1000);
    swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.8 - 688, 1000);
    sleep(1000);
}

function getWaterDrop() {
    //需要执行的任务集合
    let arrTask = ["每日免费领水滴", "浏览指定商品", "逛逛精选好货", "逛高抵扣商品赚果实", "逛逛你的淘宝人生", "逛逛天猫农场", "淘宝吃货"];

    for (let i = 0; i < arrTask.length; i++) {
        sleep(2000)
        let singleTask = arrTask[i];
        if (singleTask === "每日免费领水滴") {
            const daka = textContains("打卡").findOnce();
            openAndBack(daka, 0, false);
        } else if (singleTask === "浏览指定商品") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛逛精选好货") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛高抵扣商品赚果实") {
            let qgg = getEquQggUi(singleTask);
            openAndBack(qgg, 13000, true);
        } else if (singleTask === "逛逛你的淘宝人生") {
            // let qgg = getEquQggUi("逛逛你的淘宝人生");
            console.log("淘人生先不做")
        } else if (singleTask === "逛逛天猫农场") {
            let qgg = getEquQggUi(singleTask);
            if (qgg != null) {
                qgg.click();
                sleep(10000);
                let imidShou = textContains("立即去收").findOnce();
                //每日第一次进去提示
                if (imidShou != null) {
                    imidShou.click();
                }
                //9个田地 都点点

                //计算1-9的对应横坐标
                //获取游戏显示区域
                let gameDiv = id("GameDiv").findOnce();
                if (gameDiv != null) {
                    //计算左 中 右 的坐标
                    let x1 = deviceWidth * 0.285;
                    let x2 = deviceWidth / 2;
                    let x3 = deviceWidth * 0.722;
                    let gameHigh = gameDiv.bounds().bottom - gameDiv.bounds().top;
                    console.log("游戏布局高" + gameHigh);
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
                    }

                    //领阳光
                    click(Math.round(deviceWidth * 0.909), Math.round(gameHigh * 0.876 + stateBarHeigh))
                    sleep(2000);
                    let liulTask = textContains("去浏览").findOnce();
                    openAndBack(liulTask, 18000, true);

                    back();
                }

            } else if (singleTask === "淘宝吃货") {
                let qgg = getEquQggUi(singleTask);
                openAndBack(qgg, 16000, true);
            }
        }
    }

    function clickFarm(x, y) {
        click(x, y);
        sleep(100);
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
// startTaobao();
openGoldGarden();