let deviceWidth = device.width;
let deviceHeight = device.height;

function startFarm() {
    //进入支付宝
    //判断当前是否进入了蚂蚁庄园
    let antFarm = className("android.webkit.WebView").text("蚂蚁庄园").findOnce();
    if (antFarm != null) {
        //判断自己家的鸡在不在
        
        //收蛋
        toastLog("查看是否有贼鸡！")
        let screenZj = getScreenImg();
        let zeiren = images.read("./res/zei_chicken.png");
        let pList = images.matchTemplate(screenZj, zeiren, { threshold: 0.8, region: [Math.round(deviceWidth * 0.185), deviceHeight * 0.63], max: 2 });
        if (pList != null) {
            console.log("找到的贼鸡", pList.matches);
            if (pList.matches != null && pList.matches.length > 0) {
                finded.forEach(item => {
                    console.log("怼贼鸡", item);
                    click(item.point.x, item.point.y + 10);
                    sleep(1000);
                    let screenFuck = getScreenImg();
                    let fuckOff = images.read("./res/piss_off.png");
                    let ppPoint = images.matchTemplate(screenFuck, fuckOff, { threshold: 0.8, region: [0, deviceHeight * 0.58], max: 1 });
                    if (ppPoint != null && ppPoint.matches != null) {
                        toastLog("敢走贼鸡");
                        let pointItem = ppPoint.matches[0];
                        click(pointItem.point.x, pointItem.point.y);
                        sleep(1000);
                    }
                });
            }
        }
        toastLog("没有贼鸡，喂饲料,并收蛋");
        //喂饲料 930 2000
        click(Math.round(deviceWidth * 0.861), Math.round(deviceHeight * 0.9));
        sleep(500);
        //领个蛋 183 1682
        click(Math.round(deviceWidth * 0.17), Math.round(deviceHeight * 0.757));

    } else {
        toastLog("不在庄园页面结束");
        exit();
    }
    toastLog("完事收工");
    exit();
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

module.exports = startFarm;