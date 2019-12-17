let deviceWidth = device.width;
let deviceHeight = device.height;

function startAntForest() {
    //进入支付宝
    // launch("com.eg.android.AlipayGphone");
    // sleep(7000);
    //在首页寻找 蚂蚁深林和蚂蚁庄园的入口
    let antForest = id("app_text").textContains("蚂蚁森林").findOnce();
    if (antForest != null) {
        //进入蚂蚁深林
        toastLog("进入蚂蚁深林");
        click(antForest.bounds().centerX(), antForest.bounds().centerY());
        sleep(5000);
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
        seekToSteal(true);
        //去全部页面
        let seekMore = className("android.view.View").textContains("查看更多好友").findOnce();
        if (seekMore != null) {
            seekMore.click();
            sleep(3000);
            let hasMmore = className("android.view.View").textContains("没有更多了").findOnce() == null;
            while (hasMmore) {
                if (hasMmore) {
                    swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.1, 1000);
                    sleep(2000);
                    hasMmore = className("android.view.View").textContains("没有更多了").findOnce() == null;
                }
            }
            seekToSteal(false);
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
        //前4个是没有的 5开始
        let indexItem = className("android.view.View").text(5).findOne();
        if (indexItem != null) {
            //找到最上级的老爹
            let itemList = indexItem.parent().parent().parent().children();
            for (let i = 0; i < itemList.length; i++) {
                let singleItem = itemList[i];
                stealAndBack(singleItem);
            }
        } else {
            toastLog("好友不足5个 无法进行")
        }
    }

}


function stealAndBack(ui) {
    if (ui != null) {
        ui.click();
        sleep(3000);
        //开始偷
        collectEnergy();
        back();
        sleep(1000);
    }
}

function collectEnergy() {
    let hasSelfPower = className("android.widget.Button").textContains("收集能量").findOnce() != null;
    sleep(1000);
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

// seekToSteal();
startAntForest();
