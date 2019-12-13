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
    //第一个签到
    let sign = textContains("打卡").findOnce();
    if (sign != null) {
        sign.click();
    }
    sleep(100);
    //浏览任务
    let pageDelay = 13 * 1000;
    for (let i = 0; i < 3; i++) {
        sleep(1000);
        let qoGg = textContains("去逛逛").findOnce();
        if (qoGg != null) {
            qoGg.click();
            sleep(pageDelay);
            back();
            sleep(1000)
        } else {
            break;
        }

    }

    //陶人生
    let qoTaoLife = textContains("去逛逛").findOnce();
    if (qoTaoLife != null) {
        qoTaoLife.click();
        sleep(10000);
        click(deviceWidth / 2, 1460);
        sleep(1000);
        click(deviceWidth / 2, 1460);
        sleep(1000);
        back();
        click(deviceWidth / 2, 1460);
        sleep(1000);
    }
    //浇水
    sleep(1000);
    textContains("去浇水").findOnce().click();
    sleep(2000);

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
            textContains("好友可偷金币").findOnce().click();
            openBtmTimes++;
            swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.3, 2000);
        }
    }


    //关闭水滴领取框
    click(device.width / 2, 235);
    sleep(1000);
}


function goNuggetsAndBack() {
    click(600, 1170);
    sleep(3000);
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
    sleep(8000);
    //点击打卡
    click(700, 700);
    sleep(3000);
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
    }
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

// startTaobao();
openGoldGarden();