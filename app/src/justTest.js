let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
sleep(2000);

console.log("开始")


function quJiaoShui() {
    let toujibi = className("android.widget.Button").text("偷金币").findOnce();
    click(toujibi.bounds().centerX(), toujibi.bounds().centerY());
    if (toujibi != null) {
        sleep(2000);
        let haoyGold = textContains("个好友可偷金币").findOnce();
        while (haoyGold != null) {
            let kejiaoshui = className("android.widget.Button").text("可浇水").findOnce();
            while (kejiaoshui != null) {
                kejiaoshui.click();
                sleep(2000);
                let jiaoshui = className("android.widget.Button").text("浇水").findOnce();
                if (jiaoshui != null) {
                    click(jiaoshui.bounds().centerX(), jiaoshui.bounds().centerY());
                    let back = className("android.widget.Button").text("返回").findOnce();
                    if (back != null) {
                        back.click();
                        sleep(1500);
                    }
                }
                kejiaoshui = className("android.widget.Button").text("可浇水").findOnce();
            }


            let toujinb = EUtil.ImageSearchEngin('./res/toujinb_btn.png', [deviceWidth / 2, deviceHeight * 0.35, deviceWidth / 2, deviceHeight * 0.65], 5);
            if (toujinb != -1) {
                toujinb.forEach(element => {
                    click(element.point.x + 20, element.point.y + 50);
                    sleep(2000);
                    //写死坐标 点一下
                    click(deviceWidth / 2, deviceHeight * 0.356);
                    sleep(1000);
                    let back = className("android.widget.Button").text("返回").findOnce();
                    if (back != null) {
                        back.click();
                        sleep(1500);
                    }
                });

            }

            haoyGold.click();
            swipe(deviceWidth / 2, deviceHeight * 0.7, deviceWidth / 2, deviceHeight * 0.3, 2000);
            sleep(1000);
            haoyGold = textContains("个好友可偷金币").findOnce();
        }
    }

}

quJiaoShui();


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