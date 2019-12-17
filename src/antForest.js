let deviceWidth = device.width;
let deviceHeight = device.height;

function startAntForest() {
    //进入支付宝
    launch("com.eg.android.AlipayGphone");
    sleep(5000);
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
            let hasMmore = className("android.view.View").textContains("没有更多了").findOnce() == null;
            while (hasMmore) {
                toastLog("下拉填满数据");
                if (hasMmore) {
                    swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.1, 1000);
                    sleep(500);
                    hasMmore = className("android.view.View").textContains("没有更多了").findOnce() == null;
                }
            }
            toastLog("开始逐个寻找");
            seekToSteal(false);
        }

    }else{
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
        oneByOneClick();
    }
}

function oneByOneClick() {
    //前4个是没有的 5开始
    // let indexItem = className("android.view.View").text(5).findOne();
    let topTitle = className("android.view.View").text("周排行榜").findOnce();
    if (topTitle != null) {
        //找到最上级的老爹
        //还需要周到自己 编辑ID 一遍跳过 否则会出错
        let item0Position = topTitle.parent().parent().parent().child(0).child(0).child(0).child(0).text();
        toastLog("当前自己所在排名" + item0Position);
        sleep(1000);
        let itemList = topTitle.parent().parent().parent().child(1);
        toastLog("集合整体数量" + itemList.childCount());
        for (let i = 0; i < itemList.childCount(); i++) {
            if (i == item0Position) {
                toastLog("自己跳过");
                sleep(1000);
                continue;
            }
            toastLog("去" + i + "瞅瞅");
            let singleItem = itemList.child(i);
            stealAndBack(singleItem);
        }
    }
}


function stealAndBack(ui) {
    if (ui != null) {
        ui.click();
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

// oneByOneClick();
startAntForest();
