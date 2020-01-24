let deviceWidth = device.width;
let deviceHeight = device.height;
const CONFIG_STORAGE_NAME = 'starsBallTargetScore'
let configStorage = storages.create(CONFIG_STORAGE_NAME);

function weakScreen() {
    configStorage.put("antForestCanDo", true);

    if (device.isScreenOn()) {
        //开始输入密码
    } else {
        device.wakeUp();
    }
    sleep(1000);
    //上滑动屏幕
    swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 500)
    sleep(500);
    //开始输入密码
    let passUnlock = descContains("密码解锁").findOnce();
    if (passUnlock != null) {
        let passWorld = configStorage.get("savePhonePassword");
        for (i = 0; i < passWorld.length; i++) {
            let ids = "key" + passWorld.charAt(i);
            let key = id(ids).findOnce();
            if (key != null) {
                key.click();
                sleep(100);
            }
        }
    }
    let confirm = id("key_enter_text").findOnce();
    if (confirm != null) {
        confirm.click();
    }
    //判断密码解锁成功与否
    let passUnlockConfirm = descContains("密码解锁").findOnce();
    // let workspace = id("workspace").findOnce();
    if (passUnlockConfirm == null) {
        toastLog("解锁成功");
    }

    let start = openAndDoit();
    if (start) {
        startTask();
    }
}

function openAndDoit() {
    //打开自己的APP
    launch("com.haoyangmao.egale")
    sleep(3000);
    let prmsScreen = className("android.widget.TextView").text("截图").findOnce();
    if (prmsScreen != null) {
        // console.log("截图的位置", prmsScreen)
        let prmsSwitch = prmsScreen.parent().child(3);

        if (prmsSwitch != null) {
            click(prmsSwitch.bounds().centerX(), prmsSwitch.bounds().centerY());
            sleep(1000);
            let huaweiSc = id("button1").findOnce();
            if (huaweiSc != null) {
                huaweiSc.click();
            }
            sleep(1000);
            let xunhangText = textContains("蚂蚁森林巡航模式").findOnce();
            if (xunhangText != null) {
                let chx = xunhangText.parent().child(0);
                click(chx.bounds().centerX(), chx.bounds().centerY());
            }
            return true;
        }
    }
}

function startTask() {
    // let startTask = text("单独执行 蚂蚁森林").findOnce();
    let startTask = text("单独执行 蚂蚁森林").findOnce();
    if (startTask != null) {
        startTask.click();
    }
};

weakScreen();
// module.exports = weakScreen