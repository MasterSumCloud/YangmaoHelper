let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
sleep(2000);
//click(deviceWidth / 2, 1670);
console.log("开始")

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

function playGoGameView() {
    let startGame = EUtil.ImageSearchEngin('./res/taolife/taolife_start.png', [deviceWidth / 2, deviceHeight - 400, deviceWidth / 2, 400], 1);
    sleep(1000);
    if (startGame != -1) {
        console.log("重新进游戏界面");
        click(startGame[0].point.x + 50, startGame[0].point.y + 50);
        sleep(3000);
    }
}

friendThumbTask();

console.log("测试", cancelGold);


console.log("结束")

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