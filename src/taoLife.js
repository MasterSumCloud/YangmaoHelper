let deviceWidth = device.width;
let deviceHeight = device.height;
let EUtil = require('../EUtil.js');

function startTaoLife(isFromGold, isJustPlayGame) {
    //打开淘宝 金币庄园过来不判断

    if (!isFromGold) {
        launch("com.taobao.taobao");
        sleep(3000);
        //先判断是否游戏界面了
        let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
        if (taoLifeDiv == null) {
            //判断是否在淘宝首页
            let homeMine = className("android.widget.FrameLayout").descContains("我的淘宝").findOnce();
            let witeTaoBaoOpemTime = 8;

            while (homeMine == null && witeTaoBaoOpemTime > 0) {
                homeMine = className("android.widget.FrameLayout").descContains("我的淘宝").findOnce();
                sleep(1000);
                witeTaoBaoOpemTime--;
            }

            if (witeTaoBaoOpemTime == 0) {
                toastLog("等待进入界面超时");
                exit();
            }
            if (homeMine != null) {
                sleep(1000);
                //在首页
                homeMine.click();
                sleep(1000);
                //去到游戏界面
                let collectUI = className("android.widget.LinearLayout").descContains("收藏夹").findOnce();
                console.log("找到了收藏夹", collectUI);
                //找到头像
                if (collectUI != null) {
                    let clickY = collectUI.bounds().top - 100;
                    let clickX = collectUI.bounds().centerX();
                    click(clickX, clickY);
                } else {
                    toastLog("没找到头像");
                    exit();
                }
            }
        }
    }

    let taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    let witeTime = 15;
    while (taoLifeDiv == null & witeTime > 0) {
        sleep(1000);
        witeTime--;
        taoLifeDiv = className("android.webkit.WebView").text("第二人生").findOnce();
    }
    if (taoLifeDiv == null) {
        toastLog("等待超时");
        exit();
    } else {
        console.log("进来了，休息20秒");
        sleep(20000);
        //给加载时间
        if (isFromGold) {
            while (juadgeHomeStateType() != -1) {
                toastLog("首页关闭中");
                sleep(1000);
            }
            //返回上级
            _backTo();
        } else {
            while (juadgeHomeStateType() != -1) {
                toastLog("首页关闭行中");
                sleep(1000);
            }
            if (isJustPlayGame) {
                //去玩游戏
                startTiliGame();
                return;
            }
            //送卡
            sendCard();
            //抽套装
            getSuits();
            achieveMentIdentity();
            //去玩游戏
            startTiliGame();
            achieveMentIdentity();
            //去领取签到的
            singnGetCj();
        }

    }
}

function juadgeHomeStateType() {
    //可能是签到
    let signedBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_singed.png', [0, deviceHeight / 2, deviceWidth, deviceHeight / 2], 1);
    if (signedBtn != -1) {
        click(signedBtn[0].point.x, signedBtn[0].point.y);
        sleep(1000);
        return 1;
    }
    //可能是广告弹窗
    let gdBig = EUtil.ImageSearchEngin('./res/taolife/taolife_noTip.png', [0, deviceHeight / 2, deviceWidth, deviceHeight / 2], 1);
    if (gdBig != -1) {
        click(deviceWidth / 2, gdBig[0].point.y + 200);
        sleep(1000);
        return 2;
    }
    //可能好友的送卡片
    let friend = getCurentHasCartToGet();
    if (friend != -1) {
        sleep(1000);
        return friend;
    }
    //还可能是签到后送的东西
    let illTake = EUtil.ImageSearchEngin('./res/taolife/taolife_illtake.png', [0, deviceHeight / 2, deviceWidth, deviceHeight / 2], 1);
    if (illTake != -1) {
        click(illTake[0].point.x, illTake[0].point.y);
        sleep(1000);
        return 4;
    }

    //还可能是偶遇好友
    let meedFriends = EUtil.ImageSearchEngin('./res/taolife/taolife_meet_friends.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    if (meedFriends != -1) {
        toastLog("偶遇好友")
        click(deviceWidth * 0.69, meedFriends[0].point.y + 500);
        sleep(1000);
        return 5;
    }

    return -1;

}

function achieveMentIdentity() {
    let achieveMentPop = EUtil.ImageSearchEngin('./res/taolife/taolife_achievement.png', [150, deviceHeight / 4, deviceWidth - 300, deviceHeight * 0.5], 1);
    while (achieveMentPop != -1) {
        click(deviceWidth / 2, achieveMentPop[0].point.y + deviceHeight * 0.537);
        sleep(1000);
        achieveMentPop = EUtil.ImageSearchEngin('./res/taolife/taolife_achievement.png', [150, deviceHeight / 4, deviceWidth - 300, deviceHeight * 0.5], 1);
    }
}

function getSuits() {
    let taozhuangBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_chou.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
    console.log("判断是否首页");
    if (taozhuangBtn != -1) {
        click(taozhuangBtn[0].point.x + 50, taozhuangBtn[0].point.y + 50);
        //等待 是否进入界面
        let witeTime = 5;
        let getMoreCardBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_get_more_card.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
        while (getMoreCardBtn == -1 && witeTime > 0) {
            sleep(1000);
            getMoreCardBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_get_more_card.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
            witeTime--;
        }
        console.log("做获取卡片任务", getMoreCardBtn);
        if (getMoreCardBtn != -1) {
            // 去获取的卡片任务都做了
            // let moreCard = EUtil.ImageSearchEngin('./res/taolife/taolife_get_more_card.png', [0, deviceHeight - 250, deviceWidth, 250], 1);
            // console.log("做获取卡片任务", getMoreCardBtn);
            if (getMoreCardBtn != -1) {
                click(getMoreCardBtn[0].point.x + 60, getMoreCardBtn[0].point.y + 60);
                sleep(1000);
            }

            let invest = EUtil.ImageSearchEngin('./res/taolife/taolife_invest_icon.png', [0, deviceHeight * 0.45, deviceWidth / 2, deviceHeight / 2], 1);
            if (invest != -1) {
                click(deviceWidth * 0.87, invest[0].point.y + 60);
                //等待弹窗
                sleep(3000);
                //固定点第一个
                click(100, deviceHeight * 0.6);
                sleep(2000);
                //返回
                id("left_item").findOnce().click();
                sleep(2000);
                let goldChangeCard = EUtil.ImageSearchEngin('./res/taolife/taolife_gold_change_card.png', [0, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
                if (goldChangeCard != -1) {
                    click(deviceWidth * 0.87, goldChangeCard[0].point.y + 60);
                    sleep(2000);
                    let confirmGold = EUtil.ImageSearchEngin('./res/taolife/taolife_gold_confirm.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight * 0.21], 1);
                    if (confirmGold != -1) {
                        click(confirmGold[0].point.x, confirmGold[0].point.y);
                        sleep(1000);
                        let confirmCard3 = EUtil.ImageSearchEngin('./res/taolife/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                        if (confirmCard3 != -1) {
                            click(confirmCard3[0].point.x, confirmCard3[0].point.y);
                        }
                        //再次判断下 是否是余额不足了
                        let cancelGold = EUtil.ImageSearchEngin('./res/taolife/taolife_gold_confirm.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight * 0.21], 1);
                        if (cancelGold != -1) {
                            click(cancelGold[0].point.x - 350, cancelGold[0].point.y);
                        }
                    }
                }

                //判断是否有卡片领取
                console.log("查看是否有12点后的卡片领取");
                sleep(2000);
                let hasCardAfter12 = EUtil.ImageSearchEngin('./res/taolife/taolife_get_card6_btn.png', [0, deviceHeight / 2], 1);
                if (hasCardAfter12 != -1) {
                    console.log("领取12点后的卡片");
                    //点击领取
                    click(hasCardAfter12[0].point.x + 110, hasCardAfter12[0].point.y + 40);
                    sleep(1000);
                    //关闭弹窗
                    let confirmB = EUtil.ImageSearchEngin('./res/taolife/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                    if (confirmB != -1) {
                        click(confirmB[0].point.x, confirmB[0].point.y);
                        sleep(1000);
                    }
                } else {
                    console.log("已领取12点后的卡片");
                }

                //关闭pop
                click(deviceWidth / 2, 300);
                sleep(1000);
            }

            //做抽取任务
            //判断当前套装 是否已经集齐
            let hasNumSuit = EUtil.ImageSearchEngin('./res/taolife/taolife_has_suit.png', [0, deviceHeight - 430, deviceWidth * 0.669, 200], 6);
            console.log("当前套装状态", hasNumSuit);
            if (hasNumSuit != -1) {
                let maxSearch = 9;
                let hasGetSuit = false;
                console.log("当前套装所得数量", hasNumSuit.length);
                while (!hasGetSuit && maxSearch > 0) {
                    //判断当前套装数量
                    if (hasNumSuit.length < 4) {//没有抽完
                        hasGetSuit = getCmitSuit();
                        if (hasGetSuit) {
                            break;
                        }
                    } else {//当前套装已经齐全 换下一套
                        console.log("当前套装已完成，换下一套");
                        swipe(deviceWidth / 2, deviceHeight * 0.688, deviceWidth / 5, deviceHeight * 0.688, 500);
                        sleep(500);
                        hasNumSuit = EUtil.ImageSearchEngin('./res/taolife/taolife_has_suit.png', [0, deviceHeight - 430, deviceWidth * 0.669, 200], 6);
                        maxSearch--;
                    }
                }
            } else {
                getCmitSuit();
            }
        }
        //搞定了 回去
        backGameBtn();
    } else {
        toastLog("不在游戏首页，退出")
        exit();
    }
}

function getCmitSuit() {
    console.log("当前套装没有抽完");
    let choutaozhuang = EUtil.ImageSearchEngin('./res/taolife/taolife_get_suit.png', [deviceWidth / 2, deviceHeight - 300, deviceWidth / 2, 300], 1);
    if (choutaozhuang != -1) {
        console.log("抽套装");
        click(choutaozhuang[0].point.x, choutaozhuang[0].point.y);
        sleep(5000);
        //抽套装
        let confrimSuit = EUtil.ImageSearchEngin('./res/taolife/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
        if (confrimSuit != -1) {
            click(confrimSuit[0].point.x, confrimSuit[0].point.y);
            sleep(2000);
            //继续查看是否有是因为面部二次弹窗
            let faceUnlock = EUtil.ImageSearchEngin('./res/taolife/taolife_face_unlock.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
            if (faceUnlock != -1) {
                click(faceUnlock[0].point.x - 10, faceUnlock[0].point.y + deviceHeight * 0.334);
            }
            return true;
        }
    }
}

function sendCard() {
    let searchResult = EUtil.ImageSearchEngin('./res/taolife/taolife_vist.png', [0, deviceHeight - 350, deviceWidth, 350], 1);
    toastLog("判断是否首页");
    if (searchResult != -1) {
        console.log("找到看朋友入口", searchResult);
        click(searchResult[0].point.x + 50, searchResult[0].point.y + 50);
        sleep(1000);
        let sendCard = 0;
        console.log("进入好友互动列表");
        for (let k = 0; k < 8; k++) {
            console.log("进入好友互动列表 开始送卡和点赞=" + k);
            let sendCardPosition = EUtil.ImageSearchEngin('./res/taolife/taolife_send_card.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 5);
            if (sendCardPosition != -1) {
                console.log("开始送卡");
                for (let i = 0; i < sendCardPosition.length; i++) {
                    let cardItem = sendCardPosition[i];
                    //需要进行二次对比 判断颜色是否一致  否则是送过得
                    let temple1 = images.read('./res/taolife/taolife_send_card.png');
                    let color1 = images.pixel(temple1, 65, 38);
                    let color2 = images.pixel(getScreenImg(), cardItem.point.x + 65, cardItem.point.y + 38)
                    let isSimiler = colors.isSimilar(color1, color2);
                    console.log("颜色对比", color1 + "===" + color2);
                    //第五个才开始判断颜色 不一样则直接跳过 否则不跳
                    if (sendCard > 4) {
                        if (!isSimiler) {
                            continue;
                        }
                    }
                    click(cardItem.point.x + 50, cardItem.point.y + 50);
                    sleep(300);
                    if (sendCard < 5) {
                        toastLog("送卡片");
                        click(cardItem.point.x + 50, cardItem.point.y + 50);

                        let atFriendHome = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 1);
                        //等待进家里时间
                        let maxWiteFriendTime = 10;
                        while (atFriendHome == -1 && maxWiteFriendTime > 0) {
                            sleep(1000);
                            atFriendHome = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            maxWiteFriendTime--;
                        }
                        if (atFriendHome != -1) {//在别人家里面
                            console.log("进入好友家里");
                            let thumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_tumb_up.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
                            if (thumbUp != -1) {
                                //点赞
                                click(thumbUp[0].point.x, thumbUp[0].point.y);
                                sleep(100);
                                toastLog("给好友点赞");
                                sendCard++;
                                if (sendCard == 5) {//5次送卡  有额外一个弹窗
                                    toastLog("5次送卡  有额外一个弹窗 关闭");
                                    sleep(1500);
                                    let confirmB = EUtil.ImageSearchEngin('./res/taolife/taolife_send_5_confirm.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.21], 1);
                                    if (confirmB != -1) {
                                        sleep(1500);
                                        click(confirmB[0].point.x, confirmB[0].point.y);
                                        sleep(500);
                                    }
                                }
                            }

                            let findeBackPoint = EUtil.ColorSearchEngin("#333333", [45, 225, 30, 75]);
                            if (findeBackPoint != -1) {
                                click(findeBackPoint.x, findeBackPoint.y);
                                toastLog("返回下一个");
                                sleep(1500);
                            }
                        } else {
                            back();
                            toastLog("进好友家超时，退出");
                        }
                    }
                }
            }
            //滑动屏幕
            // let scrollHeight = 202 * 5 * k;
            swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
            sleep(4000);
            toastLog("下一屏");
        }
        backGameBtn();
    } else {
        toastLog("不在游戏首页，退出")
        exit();
    }
}

function backGameBtn(color) {
    if (color == undefined || color == null) {
        color = "#333333";
    }
    let findeBackPoint = EUtil.ColorSearchEngin(color, [45, 225, 30, 75]);
    if (findeBackPoint != -1) {
        click(findeBackPoint.x, findeBackPoint.y);
        sleep(1000);
    }
}

function singnGetCj() {
    let naJiangli = EUtil.ImageSearchEngin('./res/taolife/taolife_take_ward.png', [deviceWidth / 2, 0, deviceWidth / 2, 400], 1);
    if (naJiangli != -1) {
        console.log("去领取奖励");
        click(naJiangli[0].point.x, naJiangli[0].point.y);
        sleep(3000);
        let wipeCj = className("android.view.View").text("提升成就点").findOnce();
        if (wipeCj != null) {
            swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight - wipeCj.bounds().top, 1000);
        }

        let qiandao = className("android.view.View").text("成就签到").findOnce().parent().children()[5].children()[0];
        if (qiandao != null) {
            console.log("成就签到");
            qiandao.click();
            sleep(2000);
            let xinyuanka = className("android.view.View").text("心愿卡 x1").findOnce().parent();
            let childs = xinyuanka.children()[3];
            childs.click();
            sleep(1000);
        }

        let tiliSign = className("android.view.View").text("拿服装消耗 5 次体力").findOnce().parent().children()[5].children()[0];
        tiliSign.click();
        console.log("拿服装消耗");

        let xiadan = className("android.view.View").text("下单购买宝贝1次").findOnce().parent().children()[5].children()[0];
        xiadan.click();
        console.log("下单购买宝贝1次");

        let taozhuan = className("android.view.View").text("抽套装玩法参与 1 次").findOnce().parent().children()[5].children()[0];
        taozhuan.click();
        console.log("抽套装玩法参与");
        sleep(1000);
        //回去白色的
        back();
    }
}


function juadgeCurrentHasAD() {
    let adScreen = getScreenImg();
    let hasTip = images.read("./res/taolife/taolife_noTip.png");
    let hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    while (hasAdMatches != null && hasAdMatches.length > 0) {
        let pointClose = hasAdMatches[0];
        //关闭
        click(pointClose.point.x + deviceWidth * 0.34, pointClose.point.y + deviceHeight * 0.089);
        sleep(1000);
        let adScreen = getScreenImg();
        hasAdMatches = images.matchTemplate(adScreen, hasTip, { threshold: 0.8, region: [0, deviceHeight / 2], max: 1 }).matches;
    }
}

function getCurentHasCartToGet() {
    let cardScreen = getScreenImg();
    let taoCardToGet = images.read("./res/send_wish_card.png");
    let hasCardMatches = images.matchTemplate(cardScreen, taoCardToGet, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight * 0.338], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        let pointGet = hasCardMatches[0];
        console.log("找到的领卡位置", pointGet);
        toastLog("有可以领取的卡片");
        //点击领取
        for (let i = 0; i < 6; i++) {
            //领取
            click(pointGet.point.x + 110, pointGet.point.y + 50);
            sleep(300);
            //回赠
            click(pointGet.point.x - 135, pointGet.point.y + 50);
            sleep(300);
            //换
            click(pointGet.point.x + 310, pointGet.point.y - 142);
            sleep(400);
        }
        //点击关闭
        click(deviceWidth / 2, pointGet.point.y + 300);
        sleep(500);
        return 3;
    }
    return -1;
}

function _backTo() {
    back();
    sleep(1000);
    let backScreen = getScreenImg();
    let backTxt = images.read("./res/back_taobao.png");
    let hasCardMatches = images.matchTemplate(backScreen, backTxt, { threshold: 0.8, region: [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight * 0.27], max: 1 }).matches;
    if (hasCardMatches != null && hasCardMatches.length > 0) {
        click(deviceWidth / 2, hasCardMatches[0].point.y);
        sleep(6000);
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

function startTiliGame() {
    let startGame = EUtil.ImageSearchEngin('./res/taolife/taolife_start.png', [deviceWidth / 2, deviceHeight - 400, deviceWidth / 2, 400], 1);
    sleep(1000);
    if (startGame != -1) {
        console.log("开始玩游戏");
        click(startGame[0].point.x + 50, startGame[0].point.y + 50);
        sleep(3000);
        //判断是否还有体力
        let maxError = 0;
        while (juadgeTiliZero() && maxError < 30) {
            sleep(1000);
            //找到骰子
            let tice = getTice();
            if (tice != -1) {
                click(tice[0].point.x + 100, tice[0].point.y + 50);
                maxError = 0;
                let maxSearchTime = 20;
                let playType = juadgeTypeToPlay();
                while (playType == -1 && maxSearchTime > 0) {
                    console.log("等待触发任务");
                    sleep(1000);
                    maxSearchTime--;
                    if (maxSearchTime < 10) {
                        let pwhite = EUtil.ImageSearchEnginSelfThrehold(0.95, './res/taolife/taolife_p_position.png', [0, 300, deviceWidth, deviceHeight - 600], 1);
                        if (pwhite != -1) {
                            playType = 111;
                            break;
                        }
                    }
                    playType = juadgeTypeToPlay();
                }
                if (maxSearchTime == 0) {
                    toastLog("可能是 空的继续");
                    continue;
                }

                // let playType = juadgeTypeToPlay();
                switch (playType) {
                    case 1:
                        atHome();
                        break;
                    case 2:
                    case 3:
                    case 6:
                    case 111:
                        continue;
                        break
                    case 4://去拍照
                        takePhotoTask();
                        break;
                    case 7://去送卡
                        sendCardTask(2);
                        break
                    case 8://去点赞
                        friendThumbTask();
                        break
                    case 9://去打扮自己
                        makeupSelfTask();
                        break
                    case 12:
                        photoUpTask();
                        break
                    case 5:
                        juadgeTypeToPlay();
                        break
                    default:
                        //没有匹配到当前任务
                        toastLog("没有匹配到当前任务");
                        exit();
                        break;
                }
            } else {
                //查看是否还有没收取挡住的
                if (maxError = 8) {
                    let result = juadgeTypeToPlay();
                    if (result == -1) {
                        console.log("没有找到骰子");
                        maxError++;
                    }
                } else {
                    console.log("没有找到骰子");
                    maxError++;
                }
            }
        }
    }
}



function get4TiliAfterDotask() {
    //查询是否还有任务没做
    let getMoreTili = EUtil.ImageSearchEngin('./res/taolife/taolife_more_tili.png', [deviceWidth / 3, deviceHeight - 800, deviceWidth / 3, 300], 1);
    if (getMoreTili != -1) {
        click(getMoreTili[0].point.x, getMoreTili.point.y);
        sleep(2000);
        //查找当前 还没有做的任务
        let tiliParticipate = EUtil.ImageSearchEngin('./res/taolife/taolife_get_t_gogo.png', [deviceWidth / 2, deviceHeight * 0.4], 3);
        let xiaoxiaoY = deviceHeight - 1035;
        let dakaY = deviceHeight - 752;
        let jiaoshui = deviceHeight - 472;
        if (tiliParticipate != -1) {
            let arrTask = [];
            tiliParticipate.forEach(element => {
                if (Math.abs(xiaoxiaoY - element.point.y) < 100) {
                    arrTask.push("task1");
                } else if (Math.abs(dakaY - element.point.y) < 100) {
                    arrTask.push("task2");
                } else if (Math.abs(jiaoshui - element.point.y) < 100) {
                    arrTask.push("task3");
                }
            });

            arrTask.forEach(element => {
                if (element == "task1") {
                    click(deviceWidth * 0.866, xiaoxiaoY);
                    let xiaoxiaole = textContains("省钱消消消").findOne(20000);
                    if (xiaoxiaole != null) {
                        sleep(5000);
                        back();
                        sleep(3000);
                        let backBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_back_tb.png', [0, deviceHeight0 * 0.73], 1);
                        if (backBtn != -1) {
                            click(deviceWidth / 2, backBtn[0].point.y + 20);
                            sleep(5000);
                        }
                    } else {
                        toastLog("进消消乐 出错了");
                        exit();
                    }
                } else if (element == "task2") {
                    click(deviceWidth * 0.866, dakaY);
                    let dakaBtn = descContains("问题咨询").findOne(10000);
                    if (dakaBtn != null) {
                        sleep(3000);
                        click(deviceWidth * 0.856, deviceHeight * 0.315);
                        startTaoLife(true, true);
                    } else {
                        toastLog("打卡失败 出错了");
                        exit();
                    }
                } else if (element == "task3") {
                    click(deviceWidth * 0.866, jiaoshui);
                    let keDrop = textContains("可浇水").findOne(5000);
                    if (keDrop != null) {
                        keDrop.click();
                        sleep(2000);
                        let jiaoshui = className("android.widget.Button").text("浇水").findOnce();
                        if (jiaoshui != null) {
                            jiaoshui.click();
                            sleep(1000);
                            back();
                            sleep(1000);
                            back();
                            sleep(1000);
                        } else {
                            toastLog("浇水出错了");
                            exit();
                        }
                    } else {
                        toastLog("浇水出错了");
                        exit();
                    }
                }
            });
        }
        //领取体力
        let lingquTli = EUtil.ImageSearchEngin('./res/taolife/taolife_lingqu_tili.png', [deviceWidth / 2, deviceHeight * 0.4], 3);
        if (lingquTli != -1) {
            lingquTli.forEach(element => {
                click(deviceWidth * 0.866, element.point.y + 20);
                sleep(300);
            });
        }
    }
}

function photoUpTask() {
    let photoUpTask = EUtil.ImageSearchEngin('./res/taolife/taolife_do_task.png', [150, deviceHeight / 2, deviceWidth - 300, 500], 1);
    if (photoUpTask != -1) {
        click(makeUpTask[0].point.x, makeUpTask[0].point.y);
        sleep(3000);
        subUp();
        backGameBtn();
        sleep(5000);
    }
}
function subUp() {
    for (let i = 0; i < 3; i++) {
        let listCard = className("android.widget.ListView").find();
        let listV = null;
        if (listCard != null && listCard.length > 0) {
            listCard.forEach(element => {
                let wideList = element.bounds().right - element.bounds().left;
                console.log("列表宽度", wideList);
                if (wideList > 1000 && wideList < 1080) {
                    listV = element;
                }
            });
        }
        if (listV != null) {
            let listChild = listV.children();
            listChild.forEach(element => {
                // console.log("孩子", element);

                // let friendThumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_sumb.png', [0, 998, deviceWidth, 600], 1);
                try {
                    let clickT = element.child(0).child(1).child(2).child(1);
                    clickT.click();
                } catch (error) {

                }

            });
            for (let k = 0; k < 3; k++) {
                let newCode = className("android.widget.Image").text("ty_icon_money.739dddb9").findOnce();
                if (newCode != null) {
                    newCode.parent().child(2).click();
                }
            }
        }
        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1000);
        sleep(1000);
        swipe(deviceWidth / 2, deviceHeight * 0.8, deviceWidth / 2, deviceHeight * 0.2, 1000);
        sleep(1000);
    }

}


function makeupSelfTask() {
    let makeUpTask = EUtil.ImageSearchEngin('./res/taolife/taolife_do_task.png', [150, deviceHeight / 2, deviceWidth - 300, 500], 1);
    if (makeUpTask != -1) {
        click(makeUpTask[0].point.x, makeUpTask[0].point.y);
        sleep(3000);
        //点第一个
        console.log("选第一个衣服");
        click(deviceWidth * 0.12, deviceHeight * 0.762);
        sleep(1000);
        //点击保存
        click(deviceWidth * 0.787, deviceHeight * 0.615);
        sleep(1000);
        backGameBtn();
        sleep(5000);
    }
}


function friendThumbTask() {
    let goThumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_do_task.png', [150, deviceHeight / 2, deviceWidth - 300, 500], 1);
    if (goThumbUp != -1) {
        click(goThumbUp[0].point.x, goThumbUp[0].point.y);
        sleep(3000);
        swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
        sleep(4000);
        //随便点第三个吧
        click(deviceWidth / 2, deviceHeight * 0.725);
        //进别人屋子了
        let atFriendHome = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 1);
        //等待进家里时间
        let maxWiteFriendTime = 10;
        while (atFriendHome == -1 && maxWiteFriendTime > 0) {
            sleep(1000);
            atFriendHome = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_photo.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
            maxWiteFriendTime--;
        }
        if (atFriendHome != -1) {//在别人家里面
            console.log("进入好友家里");
            let thumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_tumb_up.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 50, deviceHeight / 2], 1);
            if (thumbUp != -1) {
                //点赞
                click(thumbUp[0].point.x, thumbUp[0].point.y);
                sleep(100);
                toastLog("给好友点赞");
            }

            let findeBackPoint = EUtil.ColorSearchEngin("#333333", [45, 225, 30, 75]);
            if (findeBackPoint != -1) {
                click(findeBackPoint.x, findeBackPoint.y);
                toastLog("返回下一个");
                sleep(1500);
            }
        } else {
            back();
            toastLog("进好友家超时，退出");
        }
    }
    backGameBtn();
    sleep(2000);
    //完事之后又到首页了  需要重新进
    playGoGameView();
}

function sendCardTask(taskTime) {
    if(taskTime==undefined || taskTime==null){
        taskTime = 8;
    }
    let goSendCard = EUtil.ImageSearchEngin('./res/taolife/taolife_do_task.png', [150, deviceHeight / 2, deviceWidth - 300, 500], 1);
    if (goSendCard != -1) {
        click(goSendCard[0].point.x, goSendCard[0].point.y);
        sleep(3000);
        let hasSend = false;
        for (let k = 0; k < taskTime; k++) {
            console.log("进入好友互动列表 开始送卡和点赞=" + k);
            let sendCardPosition = EUtil.ImageSearchEngin('./res/taolife/taolife_send_card.png', [deviceWidth * 0.7, deviceHeight / 2, deviceWidth * 0.3 - 100, deviceHeight / 2], 5);
            if (sendCardPosition != -1) {
                console.log("开始送卡");
                for (let i = 0; i < sendCardPosition.length; i++) {
                    let cardItem = sendCardPosition[i];
                    //需要进行二次对比 判断颜色是否一致  否则是送过得
                    let temple1 = images.read('./res/taolife/taolife_send_card.png');
                    let color1 = images.pixel(temple1, 65, 38);
                    let color2 = images.pixel(getScreenImg(), cardItem.point.x + 65, cardItem.point.y + 38)
                    let isSimiler = colors.isSimilar(color1, color2);
                    console.log("颜色对比", color1 + "===" + color2);
                    //第五个才开始判断颜色 不一样则直接跳过 否则不跳
                    if (sendCard > 4) {
                        if (!isSimiler) {
                            continue;
                        }
                    }
                    click(cardItem.point.x + 50, cardItem.point.y + 50);
                    sleep(300);
                    hasSend = true;
                    break;
                }
            }
            //滑动屏幕
            // let scrollHeight = 202 * 5 * k;
            swipe(deviceWidth / 2, deviceHeight - 200, deviceWidth / 2, deviceHeight - 1000, 4000);
            sleep(4000);
            toastLog("下一屏");
        }
        backGameBtn();
        sleep(2000);
        //跑首页去了  需要重新进
        playGoGameView();
    }
}

function takePhotoTask() {
    let goTakePhoto = EUtil.ImageSearchEngin('./res/taolife/taolife_do_task.png', [150, deviceHeight / 2, deviceWidth - 300, 500], 1);
    if (goTakePhoto != -1) {
        click(goTakePhoto[0].point.x, goTakePhoto[0].point.y);
        sleep(3000);
        let photoSelf = textContains("我要自拍").findOnce();
        if (photoSelf != null) {
            click(photoSelf.bounds().centerX(), photoSelf.bounds().centerY());
            sleep(2000);
            //随便选一个
            click(deviceWidth / 4, deviceHeight * 0.225);
            let saiPhoto = textContains("晒出照片").findOnce();
            let maxWitePhoto = 15;
            while (saiPhoto == null && maxWitePhoto > 0) {
                sleep(1000);
                maxWitePhoto--;
                saiPhoto = textContains("晒出照片").findOnce();
            }
            if (maxWitePhoto == 0) {
                toastLog("相机任务出错 退出")
                exit();
            }
            // click(saiPhoto.bounds().centerX(), saiPhoto.bounds().centerY());
            if (saiPhoto != null) {
                sleep(3000);
                saiPhoto.parent().click();
                sleep(3000);
                toastLog("任务完成 开始返回")
                backGameBtn("#FFFFFF");
                sleep(5000);
                juadgeTypeToPlay();
            }
        }
    }
}

function playGoGameView() {
    let startGame = EUtil.ImageSearchEngin('./res/taolife/taolife_start.png', [deviceWidth / 2, deviceHeight - 400, deviceWidth / 2, 400], 1);
    sleep(1000);
    if (startGame != -1) {
        console.log("重新进游戏界面");
        click(startGame[0].point.x + 50, startGame[0].point.y + 50);
        sleep(3000);
        juadgeTypeToPlay();
    }
}

function atHome() {
    //判断当前是否有没有领取过得
    let hasSuits = EUtil.ImageSearchEngin('./res/taolife/taolife_has_suit.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 3);
    let firstHas = false;
    let secondHas = false;
    let thirdHas = false;
    //x1 = 245 x2= 500 x3 = 757
    let x1 = 245;
    let x2 = 500;
    let x3 = 757;
    if (hasSuits != -1) {//肯定有一个 领取过了
        hasSuits.forEach(element => {
            if (Math.abs(element.point.x - x1) < 50) {
                firstHas = true;
            } else if (Math.abs(element.point.x - x2) < 50) {
                secondHas = true;
            } else if (Math.abs(element.point.x - x3) < 50) {
                thirdHas = true;
            }
        });
        //第一个没点 点第一个
        if (!firstHas) {
            click(deviceWidth * 0.227, hasSuits[0].point.y);
            sleep(2000);
            toastLog("领取第一个")
            doSameHome();
            return;
        }
        //第二个没点 点第二个
        if (!secondHas) {
            click(deviceWidth / 2, hasSuits[0].point.y);
            sleep(2000);
            toastLog("领取第二个");
            doSameHome();
            return;
        }
        //第三个没点 点第三个
        if (!thirdHas) {
            click(deviceWidth * 0.73, hasSuits[0].point.y);
            sleep(2000);
            toastLog("领取第三个");
            doSameHome();
            return;
        }
    } else {
        //都没有领取 优先领取第一个
        click(deviceWidth * 0.227, deviceHeight * 0.563);
        sleep(2000);
        toastLog("领取第一个")
        doSameHome();
        return;
    }


}

function doSameHome() {
    juadgeTypeToPlay();
    sleep(1000);
    juadgeTypeToPlay();
    sleep(2000);
    //判断是否有新地图
    let newmap = EUtil.ImageSearchEngin('./res/taolife/taolife_newmap.png', [0, deviceHeight / 3, deviceWidth, deviceHeight / 3], 1);
    if (newmap != -1) {
        click(deviceWidth / 2, newmap[0].point.y + 773);
        sleep(1000);
    }
}

function getTice() {
    let tice = EUtil.ImageSearchEngin('./res/taolife/taolife_tice.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2 - 600], 1);
    return tice;
}

function juadgeTypeToPlay() {
    //判断是否走到了起点
    let homeGift = EUtil.ImageSearchEngin('./res/taolife/taolife_home_gift.png', [deviceWidth / 3, deviceHeight / 3, deviceWidth / 3, deviceHeight / 3], 1);
    if (homeGift != -1) {
        toastLog("原点弹窗");
        click(deviceWidth / 2, homeGift[0].point.y);
        sleep(1000);
        return 1;
    }

    //判断是否是 偶遇大人
    let oyMaster = EUtil.ImageSearchEngin('./res/taolife/taolife_oyMaster.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    if (oyMaster != -1) {//达人可能送钱 送卡片 送体力
        toastLog("偶遇达人");
        click(deviceWidth * 0.69, oyMaster[0].point.y + 492);
        sleep(1000);
        return 2;
    }
    let tiliBtn = EUtil.ImageSearchEngin('./res/taolife/taolife_tili.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    //判断是 踩上了体力 卡片 骰子
    if (tiliBtn != -1) {
        toastLog("踩到了恭喜获得")
        click(deviceWidth / 2, tiliBtn[0].point.y + 710);
        sleep(1000);
        return 3;
    }
    //判断是否是审理礼盒
    let magicBox = EUtil.ImageSearchEngin('./res/taolife/taolife_find_magic_box.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    if (magicBox != -1) {
        toastLog("发现神秘礼盒")

        let taskSbox = taskAnalysis(magicBox);
        switch (taskSbox) {
            case "拍照":
                return 4;
            case "打扮自己":
                return 9;
            case "好友点赞":
                return 8;
            case "照片点赞":
                return 12;
            case "送心愿卡":
                return 7;
            default:
                break;
        }
        // //继续分析盒子类型
        // let takePhotoTask = EUtil.ImageSearchEngin('./res/taolife/taolife_take_photo.png', [150, magicBox[0].point.y, deviceWidth - 300, 600], 1);
        // if (takePhotoTask != -1) {
        //     console.log("任务 去拍照");
        //     return 4;
        // }
        // let makeUpSelfTask = EUtil.ImageSearchEngin('./res/taolife/taolife_makeup_self.png', [150, magicBox[0].point.y, deviceWidth - 300, 600], 1);
        // if (makeUpSelfTask != -1) {
        //     console.log("任务 去打扮自己");
        //     return 9;
        // }

        // let friendThumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_friend_sumb.png', [150, magicBox[0].point.y, deviceWidth - 300, 600], 1);
        // if (friendThumbUp != -1) {
        //     console.log("任务 去给好友点赞");
        //     return 8;
        // }

        // let phtotThumbUp = EUtil.ImageSearchEngin('./res/taolife/taolife_photo_subup.png', [150, magicBox[0].point.y, deviceWidth - 300, 600], 1);
        // if (phtotThumbUp != -1) {
        //     console.log("任务 给照片点赞");
        //     return 12;
        // }
    }
    //发现品牌
    let findBrand = EUtil.ImageSearchEngin('./res/taolife/taolife_find_brand.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    if (findBrand != -1) {
        toastLog("发现品牌奖励")
        click(deviceWidth * 0.69, findBrand[0].point.y + 500);
        sleep(1000);
        return 5;
    }
    //偶遇好友
    let meedFriends = EUtil.ImageSearchEngin('./res/taolife/taolife_meet_friends.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    if (meedFriends != -1) {
        toastLog("偶遇好友")
        click(deviceWidth * 0.69, meedFriends[0].point.y + 500);
        sleep(1000);
        return 6;
    }


    return -1;
}

function taskAnalysis(magicBox) {
    // let magicBox = EUtil.ImageSearchEngin('./res/taolife/taolife_find_magic_box.png', [150, deviceHeight * 0.31, deviceWidth - 300, deviceHeight * 0.4], 1);
    let screen = getScreenImg();
    let temple = images.clip(screen, magicBox[0].point.x + 100, magicBox[0].point.y + 150, 242, 82);
    images.save(temple, "/sdcard/haoyangmaoTask.png");
    // app.viewFile("/sdcard/haoyangmaoTask.png");
    let analysisText = EUtil.baiduAnasisText("/sdcard/haoyangmaoTask.png");
    return analysisText;
}

function juadgeTiliZero() {
    let hasTili = EUtil.ImageSearchEnginSelfThrehold(0.9, './res/taolife/taolife_juadge_tili0.png', [deviceWidth / 3, deviceHeight - 800, deviceWidth / 3, 300], 1);
    //如果为-1 则还有体力 不为-1则没了
    return hasTili == -1;
}

// requestScreenCapture();
// sleep(2000);
// startTaoLife(false, false);
// startTiliGame();
// singnGetCj();
// getSuits();
module.exports = startTaoLife;

