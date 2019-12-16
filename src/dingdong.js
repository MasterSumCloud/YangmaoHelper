
function openDingdongApp() {
    console.log("买菜咯");
    // setScreenMetrics(1080, 1920);
    toast("开始叮咚买菜签到");
    //Open app
    launch("com.yaya.zone");

    sleep(5000)

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

    //to my fragment
    // click(device.width - 100, device.height - 100);

    let tabMe = id("tab_rb_me").findOnce();
    click(tabMe.bounds().centerX(), tabMe.bounds().centerY());

    sleep(250);
    //click jifen
    id("myList").findOne().children().forEach(child => {
        var target = child.findOne(id("rl_point"));
        target.click();
    });

    sleep(3000)
    className("android.view.View").text("立即签到领积分").findOne().click()
    sleep(1000);
    //close sign the pop
    let myScore = className("android.view.View").text("我的积分").findOnce();
    if (myScore != null) {
        click(myScore.bounds().centerX(), myScore.bounds().centerY());
        sleep(500);
    } else {
        back();
        sleep(500);
        id("myList").findOne().children().forEach(child => {
            var target = child.findOne(id("rl_point"));
            target.click();
        });
        sleep(500);
    }
    swipe(device.width / 2, device.height * 0.87, device.width / 2, device.height / 5, 1000)

    className("android.view.View").text("去逛逛").findOne().click()
    sleep(33000)

    back();

    sleep(1000);
    back();
    back();
    back();
    toast("完成退出");
}

openDingdongApp();


// module.exports = openDingdongApp;

