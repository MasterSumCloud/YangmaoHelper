let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('./EUtil.js');
requestScreenCapture();
sleep(2000);
function startHandToolMarket() {
    launch("com.tencent.djcity");
    console.log("打开掌上道具商城");
    let libaoCenter = desc("礼包中心").findOne(5000);
    if (libaoCenter != null) {
        console.log("点击礼包中心");
        libaoCenter.parent().click();
        sleep(3000);
        let phoneGame = desc("手游").findOne(5000);
        if (phoneGame != null) {
            console.log("点击手游");
            phoneGame.parent().click();
            let wanngzheText = desc("王者荣耀").findOne(5000);
            if (wanngzheText != null) {
                console.log("点击王者荣耀");
                wanngzheText.parent().parent().click();
                sleep(1000);
                let oneKeyGet = desc("一键领取").findOne(5000);
                if (oneKeyGet != null) {
                    console.log("点击一键领取");
                    oneKeyGet.parent().click();
                    sleep(2000);
                    let confirmGetAll = desc("确认").findOne(3000);
                    if (confirmGetAll != null) {
                        console.log("点击确认");
                        sleep(2000);
                        confirmGetAll.parent().click();
                        //领取成功后取消弹窗
                        // let cancelSucess = text("取消").findOne(3000);
                        // if (cancelSucess != null) {
                        //     console.log("点击取消");
                        //     cancelSucess.click();
                        // }
                    }
                }
            }
        }
    }
}


function startxyClub() {
    launch("com.tencent.tgclub");
    console.log("打开心悦俱乐部");
    let ad = id("image_dialog_close").findOne(8000);
    if (ad != null) {
        ad.click();
    }
    let myGameCenterList = id("my_game_order_list").findOne(2000);
    if (myGameCenterList != null) {
        let maxSize = myGameCenterList.childCount();
        console.log("我的游戏长度", maxSize)
        if (maxSize > 0) {
            let lastMore = myGameCenterList.child(0);
            if (lastMore != null) {
                lastMore.click();
                console.log("点击第一个");
                sleep(2000);
                // let leftScrll = className("android.widget.ScrollView").findOne(3000);
                // let leftScrll = className("android.widget.ScrollView").find()[0];
                // if (leftScrll != null) {
                //     console.log("找到第一个ScrollView")
                //     leftScrll.child(0).child(5).click();
                //     sleep(1000);
                //     let rightScrl = className("android.widget.ScrollView").find()[1];
                //     console.log("找到第二个ScrollView")
                //     if (rightScrl != null) {
                //         rightScrl.child(0).child(8).child(0).click();
                //         console.log("固定位置9")
                //         ...
                //     }
                // }
                //先去 悦享卡
                let xiangyue = text("悦享卡").findOne(3000);
                if (xiangyue != null) {
                    xiangyue.parent().click();
                    sleep(5000);
                    //固定点击
                    click(deviceWidth / 3, deviceHeight - 160);
                    let webReturn = id("webview_return").findOnce();
                    if (webReturn != null) {
                        webReturn.click();
                        sleep(1000);
                    }
                }
                let libao = text("礼包").findOne(3000);
                if (libao != null) {
                    console.log("打开礼包弹窗")
                    libao.parent().click();
                    sleep(2000);
                    for (let i = 0; i < 3; i++) {
                        //因为控件不包含任何信息  无法抓取  需要用到识图 
                        let lingBtn = EUtil.ImageSearchEngin('./res/wangzhe/wz_ling_yellow_btn.png', [deviceWidth / 3, 400, deviceWidth / 3, deviceHeight - 400], 3);
                        if (lingBtn != -1) {
                            lingBtn.forEach(element => {
                                click(element.point.x + 20, element.point.y + 20);
                                sleep(1000);
                                let confirmGet = id("choice_role_action_confirm").findOne(2000);
                                if (confirmGet != null) {
                                    confirmGet.click();
                                }
                            });
                        } 
                        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1000);

                    }
                }
            }
        }
    }
}


function startqqDownLoader() {
    launch("com.tencent.android.qqdownloader");
    console.log("打开应用宝");
    let btmAee = id("aae").findOne(7000);
    if (btmAee != null) {
        btmAee.child(2).click();
        sleep(1000);
        let sinin = text("立即签到").findOne(2000);
        if (sinin != null) {
            sinin.click();
            sleep(1000);
            let confirmQ = text("确定").findOne(2000);
            if (confirmQ != null) {
                confirmQ.click();
                sleep(1000);
                let know = text("知道了").findOne(2000);
                if (know != null) {
                    know.click();
                    sleep(1000);
                    let yjian = text("一键领取").findOnce();
                    if (yjian != null) {
                        yjian.click();
                        //这里会自动进入游戏
                        home();
                    }
                }

            }

        }
    }
}

function startQQNews() {
    launch("com.tencent.news");
    let btmBar = text("活动").findOne(10000);
    if (btmBar != null) {
        click(deviceWidth * 0.9, deviceHeight - 100);
        sleep(2000);
        let bonbon = text("BonBon游戏").findOne(2000);
        if (bonbon != null) {
            bonbon.parent().parent().click();
            sleep(2000);
            let wangzheT = text("王者荣耀").findOne(2000);
            if (wangzheT != null) {
                // wangzheT.parent().child(4).click();
                let libao = text("获取礼包").findOne(1000);
                if (libao != null) {
                    libao.click();
                }
                sleep(1000);
                let sinin = text("领取签到礼包").findOne(2000);
                if (sinin != null) {
                    sinin.click();
                    sleep(2000);
                    let confirmGet = text("确定领取").findOne(2000);
                    if (confirmGet != null) {
                        confirmGet.click();
                    }
                    sleep(1000);
                    //领取每日每周礼包
                    swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, deviceHeight * 0.2, 1000);
                    sleep(1000);
                    let dayllyPack = text("每日礼包").findOne(2000);
                    if (dayllyPack != null) {
                        dayllyPack.parent().child(dayllyPack.indexInParent() + 2).click();
                        sleep(1000);
                        let confirmGet2 = text("确定领取").findOne(2000);
                        if (confirmGet2 != null) {
                            confirmGet2.click();
                        }
                    }

                    let weeklyPack = text("每周礼包").findOne(2000);
                    if (weeklyPack != null) {
                        weeklyPack.parent().child(weeklyPack.indexInParent() + 2).click();
                        sleep(1000);
                        let confirmGet3 = text("确定领取").findOne(2000);
                        if (confirmGet3 != null) {
                            confirmGet3.click();
                        }
                    }
                }
            }
        }
    }
}

function startYingdi() {
    launch("com.tencent.gamehelper.smoba");
    let suijiItlel = id("info_title").findOne(6000);
    if (suijiItlel != null) {
        suijiItlel.parent().parent().click();
        sleep(2000);
        let moreMenu = id("more_menu").findOne(2000);
        if (moreMenu != null) {
            moreMenu.click();
            sleep(1500);
            click(deviceWidth * 0.8, deviceHeight * 0.2);
            sleep(1000);
            let weChatFriend = text("微信好友").findOne(2000);
            if (weChatFriend != null) {
                weChatFriend.parent().click();
                sleep(2000);
                back();
            }
        }
        back();
        let activity = id("activity").findOne(2000);
        if (activity != null) {
            activity.click();
            sleep(2000);
            let jinSinin = text("今日签到必得").findOne(2000);
            if (jinSinin != null) {
                click(jinSinin.bounds().centerX(), jinSinin.bounds().centerY());
                sleep(2000);
                let yijian = text("一键签到").findOne(2000);
                if (yijian != null) {
                    yijian.click();
                    sleep(1000);
                    let queDinng = text("确定").findOne(2000);
                    if (queDinng != null) {
                        queDinng.click();
                        back();
                        sleep(2000);
                    }
                }
            }

            let confirmGet = text("立即领取").findOnce();
            let firstX = confirmGet.bounds().centerX();
            let firstY = confirmGet.bounds().centerY();
            let clickCount = text("立即领取").find();
            if (clickCount != null && clickCount.length > 0) {
                for (let i = 0; i < clickCount.length; i++) {
                    click(firstX, firstY);
                    sleep(1500);
                    let queD = text("确定").findOne(2000);
                    if (queD != null) {
                        queD.click();
                        sleep(1000);
                    }
                    confirmGet = text("立即领取").findOnce();
                    sleep(1000);
                }
            }
        }
    }
}

function startCenterKeeper() {
    launch("com.tencent.gamestick");
    let btmIndicate = id("bottom_indicator").findOne(6000);
    if (btmIndicate != null) {
        btmIndicate.child(0).child(0).click();
        sleep(1000);
        let wangZheTitle = text("王者荣耀").findOne(2000);
        if (wangZheTitle != null) {
            wangZheTitle.parent().parent().child(2).child(0).click();
            sleep(2000);
            let sinin = id("sign_in_gift_receive_button").findOne(2000);
            if (sinin != null) {
                sinin.click();
                sleep(2000);
                let getGiftBtn = id("game_get_game_gift_btn").findOne(2000);
                if (getGiftBtn != null) {
                    getGiftBtn.click();
                }
            }
        }

    }
}

function tencentLovePlay() {
    launch("iwan.tencent.com");
    let btmLiao = text("礼包").findOne(6000);
    if (btmLiao != null) {
        sleep(2000);
        click(btmLiao.bounds().centerX(), btmLiao.bounds().centerY())
        let wangZTT = text("王者荣耀").findOne(2000);
        if (wangZTT != null) {
            click(wangZTT.bounds().centerX(), wangZTT.bounds().centerY() - 200);
            sleep(2000);
            let openMore = text("展开更多").findOne(2000);
            if (openMore != null) {
                click(openMore.bounds().centerX(), openMore.bounds().centerY());
                sleep(1000);
                // let seeBtm = text("收起更多").findOnce();
                for (let i = 0; i < 3; i++) {
                    iLoveGet();
                    swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1500);
                    sleep(1000);
                }
            }
        }
    }
}


function iLoveGet() {
    let lingquList = text("领取").find();
    if (lingquList != null && lingquList.length > 0) {
        for (let i = 0; i < lingquList.length; i++) {
            let item = lingquList[i];
            click(item.bounds().centerX(), item.bounds().centerY());
            sleep(1000);
            let conFrm = text("确定").findOne(2000);
            if (conFrm != null) {
                click(conFrm.bounds().centerX(), conFrm.bounds().centerY());
                sleep(1500);
                // let getFail = text("兑换失败").findOne(2000);
                // if (getFail != null) {}
                let failFirm = text("确定").findOne(2000);
                if (failFirm != null) {
                    click(failFirm.bounds().centerX(), failFirm.bounds().centerY());
                }
            }

        }
    }
}

function tencentVideo() {
    launch("com.tencent.qqlive");
    let btmV = id("ajg").findOne(8000);
    if (btmV != null) {
        click(deviceWidth * 0.9, deviceHeight - 50);
        sleep(1000);
        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 2000);
        let aiwanV = text("爱玩游戏").findOne(2000);
        if (aiwanV != null) {
            aiwanV.parent().parent().click();
            sleep(2000);
            //查看是否有王者

            //点击礼包进入
            click(deviceWidth * 0.2, deviceHeight * 0.43);
            //点击一键领取完事
            sleep(5000);
            click(deviceWidth * 0.865, deviceHeight * 0.28);
            sleep(3000);
            click(deviceWidth * 0.645, deviceHeight * 0.62);
        }
    }
}

function weiXinWangzhe() {
    launch("com.tencent.mm");
    sleep(5000);
    swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 300);
    click(188, 615);
    sleep(3000);
    click(176, 1273);
    sleep(3000);
    click(940, 340);
}


function getAllWangZheGift() {
    // startHandToolMarket();//OK
    startxyClub();
    // startQQNews();//OK
    // startYingdi();
    // startCenterKeeper();//OK
    // tencentLovePlay();
    // startqqDownLoader();//最后续关闭游戏 ok
    // weiXinWangzhe();
    // tencentVideo();
}

getAllWangZheGift();