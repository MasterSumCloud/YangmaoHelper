let deviceWidth = device.height;
let deviceHeight = device.width;
let EUtil = require('./EUtil.js');
requestScreenCapture(true);
sleep(2000);
//横屏状态从左上角开始算坐标
function goInGame(indeed) {
    if (indeed) {
        let inGame = EUtil.ImageSearchEngin('./res/wangzhe/wz_wxtg.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2], 1);
        let witeSecondIn = 60;
        while (witeSecondIn > 0) {
            inGame = EUtil.ImageSearchEngin('./res/wangzhe/wz_wxtg.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2], 1);
            if (inGame != -1) {
                sleep(1000);
                toastLog("点击开始游戏");
                click(inGame[0].point.x + 100, inGame[0].point.y + 100);
                break;
            } else {
                sleep(1000);
                witeSecondIn--;
            }
        }

        let gdCoseBtn = EUtil.ImageSearchEngin('./res/wangzhe/wz_gd_cose.png', [deviceWidth * 0.8, 0, deviceWidth * 0.2, deviceHeight / 2], 1);
        let xWite = 30;
        while (xWite > 0) {
            gdCoseBtn = EUtil.ImageSearchEngin('./res/wangzhe/wz_gd_cose.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2], 1);
            if (gdCoseBtn != -1) {
                toastLog("关闭广告");
                click(gdCoseBtn[0].point.x + 25, gdCoseBtn[0].point.y + 25);
                sleep(1000);
                let hasMore = true;
                while (hasMore) {
                    gdCoseBtn = EUtil.ImageSearchEngin('./res/wangzhe/wz_gd_cose.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2], 1);
                    if (gdCoseBtn != -1) {
                        click(gdCoseBtn[0].point.x + 25, gdCoseBtn[0].point.y + 25);
                        sleep(1000);
                        hasMore = true;
                    } else {
                        hasMore = false;
                        break;
                    }
                }
                break;
            } else {
                sleep(1000);
                witeSecondIn--;
            }
        }
    }
    selectMaoxian();
}

function selectMaoxian() {
    //选择万象天工
    let wxtgImage = EUtil.ImageSearchEngin('./res/wangzhe/wz_wxtg.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
    if (wxtgImage != -1) {
        //点击万象天工
        toastLog("点击万象天工")
        click(wxtgImage[0].point.x + 100, wxtgImage[0].point.y + 100);
        sleep(2000);
        //选择冒险模式
        let maoxianEntry = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian.png', [0, 0, 400, deviceHeight], 1);
        if (maoxianEntry != -1) {
            console.log("选择冒险模式");
            click(maoxianEntry[0].point.x + 100, maoxianEntry[0].point.y + 100);
            sleep(3000);
            //选中挑战
            // let startChallenge = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_select.png', [deviceWidth / 3, deviceHeight / 2, deviceWidth / 3, deviceHeight / 2], 1);
            let startChallengeText = textAna(deviceWidth / 2 - 150, deviceHeight - 320, 300, 100);
            if (startChallengeText == "挑战") {
                toastLog("点击挑战")
                click(deviceWidth / 2, deviceHeight - 270);
                sleep(2000);
                //选择默认关卡
                let startNext = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_next.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
                if (startNext != -1) {
                    toastLog("开始默认关卡")
                    click(startNext[0].point.x + 50, startNext[0].point.y + 50);
                    sleep(2000);
                    //开始闯关
                    whileGameing();
                }
            }
        }
    }
}

function whileGameing() {
    let currentFinish = false;
    let cycCount = 1;
    while (!currentFinish) {
        let startGame = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_cg.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
        if (startGame != -1) {
            toastLog("开始闯关")
            click(startGame[0].point.x + 50, startGame[0].point.y + 50);
            sleep(2000);
            playingi();
            toastLog("再次开始" + cycCount)
            cycCount++;
        }
        sleep(1000);
        click(deviceWidth / 2, 100);
        sleep(1000);

        if (cycCount > 300) {
            currentFinish = true;
            console.log("限制300次循环")
        }
    }
}

function playingi() {
    let startFinded = false;
    let whiteSeconds = 0;
    while (!startFinded && whiteSeconds < 300) {//最大5分钟
        let passBtnGold = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_pass.png', [deviceWidth * 0.8, 0, deviceWidth * 0.2, 200], 1);
        if (passBtnGold != -1) {
            click(passBtnGold[0].point.x + 50, passBtnGold[0].point.y + 30);
            sleep(1000);
        }

        let passBtnBlue = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_pass_2.png', [deviceWidth * 0.8, 0, deviceWidth * 0.2, 200], 1);
        if (passBtnBlue != -1) {
            click(passBtnBlue[0].point.x + 50, passBtnBlue[0].point.y + 30);
            sleep(1000);
        }

        //判断是否有星星
        let currentFinishState = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_finish.png', [deviceWidth / 3, 200, deviceWidth / 3, deviceHeight / 2], 1);
        if (currentFinishState != -1) {
            click(currentFinishState[0].point.x, currentFinishState[0].point.y);
            sleep(1000);
            click(currentFinishState[0].point.x, currentFinishState[0].point.y);
            sleep(1000);
            click(currentFinishState[0].point.x, currentFinishState[0].point.y);
            sleep(2000);
            console.log("进入结算页面")
            let watchTime = 0;
            if (watchTime < 20) {
                console.log("循环找again按钮")
                //点击再次
                let coutinueGame = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_again.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
                if (coutinueGame != -1) {
                    toastLog("点击再次挑战")
                    click(coutinueGame[0].point.x + 50, coutinueGame[0].point.y + 50);
                    sleep(2000);
                    startFinded = true;
                    whiteSeconds = 0;
                    break;
                } else {
                    sleep(1000);
                    click(deviceWidth / 2, 100);
                    watchTime++;
                }
            } else {
                toastLog("等待再次超时")
                exit();
            }
        } else {
            sleep(3000);
            whiteSeconds++;
            console.log("进行时间", whiteSeconds);
        }
        
        //点击再次
        let coutinueGame = EUtil.ImageSearchEngin('./res/wangzhe/wz_maoxian_again.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
        if (coutinueGame != -1) {
            toastLog("点击再次挑战")
            click(coutinueGame[0].point.x + 50, coutinueGame[0].point.y + 50);
            sleep(2000);
            startFinded = true;
            whiteSeconds = 0;
            break;
        }

        //判断是否有超时  有超时点击确定
        let timeTout3h = EUtil.ImageSearchEngin('./res/wangzhe/wz_time_out_3h.png', [deviceWidth / 2, deviceHeight / 2, deviceWidth / 2, deviceHeight / 2], 1);
        if (timeTout3h != -1) {
            toastLog("超时记录")
            click(timeTout3h[0].point.x + 50, timeTout3h[0].point.y + 50);
            sleep(5000);
        }
    }


    if (whiteSeconds >= 300) {
        console.log("超时错误退出");
        exit();
    }
}

function textAna(x, y, w, h) {
    let screen = getScreenImg();
    let temple = images.clip(screen, x, y, w, h);
    images.save(temple, "/sdcard/chicken_at_home_wangzhe.png");
    let analysisText = EUtil.baiduAnasisText("/sdcard/chicken_at_home_wangzhe.png");
    return analysisText;
}

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


goInGame(false);