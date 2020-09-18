
function openDingdongApp() {
    console.log("买菜咯");
    // setScreenMetrics(1080, 1920);
    toast("开始叮咚买菜签到");
    //Open app
    launch("com.yaya.zone");
    let homeRefV = id("refresh_view").findOnce();
    let maxTime = 5;
    while (homeRefV == null && maxTime > 0) {
        sleep(1000);
        maxTime--;
        homeRefV = id("refresh_view").findOnce();
    }
    sleep(1000);
    console.log("关闭所有弹窗");
    let ivNeedClose = id("iv_close").findOnce();
    let hasIvClose = ivNeedClose != null;
    while (hasIvClose) {
        if (ivNeedClose != null) {
            ivNeedClose.click();
            sleep(1000);
            ivNeedClose = id("iv_close").findOnce();
        } else {
            hasIvClose = false;
            break;
        }
    }

    console.log("到我的页面");
    let tabMe = id("tab_rb_me").findOnce();
    click(tabMe.bounds().centerX(), tabMe.bounds().centerY());
    sleep(500);
    //click jifen
    id("myList").findOne().children().forEach(child => {
        var target = child.findOne(id("rl_point"));
        target.click();
    });

    sleep(3000);
    let signMark = className("android.view.View").text("立即签到领积分").findOne();
    if (signMark != null) {
        toastLog("签到领积分");
        signMark.click();
        sleep(1000);
    }

    //close sign the pop
    let myScore = className("android.view.View").text("我的积分").findOnce();
    if (myScore != null) {
        click(myScore.bounds().centerX(), myScore.bounds().centerY());
        sleep(500);
    } else {
        back();
        sleep(500);
        id("myList").findOnce().children().forEach(child => {
            var target = child.findOnce(id("rl_point"));
            target.click();
        });
        sleep(500);
    }
    swipe(device.width / 2, device.height * 0.87, device.width / 2, device.height / 5, 1000)
    let qgg30 = className("android.view.View").text("去逛逛").findOnce();
    if (qgg30 != null) {
        qgg30.click();
        sleep(33000)
    }
    back();
    sleep(1000);
    back();
    back();
    back();
    toast("退出叮咚买菜");
}

// openDingdongApp();
module.exports = openDingdongApp;

