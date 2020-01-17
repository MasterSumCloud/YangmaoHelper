let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
requestScreenCapture();
sleep(2000);
//click(deviceWidth / 2, 1670);
console.log("开始")

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

subUp();

console.log("结束")





let okBtn = className("android.view.View").text("确定").findOnce();
if (okBtn != null) {
    okBtn.parent().click();
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