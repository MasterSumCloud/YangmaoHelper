let deviceWidth = device.width;
let deviceHeight = device.height;

function startAntForest() {
    //进入支付宝
    launch("com.eg.android.AlipayGphone");
    sleep(1000);
    requestScreenCapture();
    //判断是否已经在游戏界面
    let gamePartHome = id("J_af_home").findOnce();
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
        toastLog("查询是否有能量可以收集");
        collectEnergy();
        //滑动半个屏幕
        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1000);
        //寻找定位点
        let weekTop = className("android.view.View").textContains("周排行榜").findOnce();
        if (weekTop != null) {
            weekTop.click();
            swipe(deviceWidth / 2, weekTop.bounds().top, deviceWidth / 2, 0, 1000);
        }
        toastLog("开始寻找偷能量");
        // seekToSteal(true);
        //去全部页面
        let seekMore = className("android.view.View").textContains("查看更多好友").findOnce();
        if (seekMore != null) {
            seekMore.click();
            sleep(3000);
            // let hasMorePoint = images.findMultiColors(img, "#f5f5f5", [[0, 10, "#f5f5f5"], [10, 20, "#f5f5f5"]], {
            //     region: [deviceWidth / 2, deviceHeight * 0.8, 1, 30]
            // });
            let maxSearchTime = 20;
            while (maxSearchTime > 0) {
                let finded = getCanStealfriend();
                if (finded != null && finded.length > 0) {
                    finded.forEach(item => {
                        console.log("找到的点", item);
                        stealAndBack(item);
                    });
                }
                swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.1, 1000);
                maxSearchTime--;
            }
            toastLog("开始逐个寻找");
            // seekToSteal(false);
        }

    } else {
        toastLog("不在游戏界面，也不再主界面，结束");
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
    click(deviceWidth / 2, item.point.y);
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
    while (hasSelfPower) {
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
    }
}

/**
 * 从排行榜 找到可以收取能量的
 */
function getCanStealfriend() {
    let img = getScreenImg();
    let handImg = images.read("./res/ghand.png");
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


// collectEnergy();
startAntForest();
