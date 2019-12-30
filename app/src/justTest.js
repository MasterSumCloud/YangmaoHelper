let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

function singnGetCj() {

    let naJiangli = EUtil.ImageSearchEngin('./res/taolife_take_ward.png', [deviceWidth / 2, 0, deviceWidth / 2, 400], 1);
    if (naJiangli != -1) {
        console.log("去领取奖励");
        click(naJiangli[0].point.x, naJiangli[0].point.y);
        sleep(3000);
        let qiandao = className("android.view.View").text("成就签到").findOnce().parent().children()[5].children()[0];
        if (qiandao != null) {
            console.log("成就签到");
            qiandao.click();
            sleep(1000);
            let xinyuanka = className("android.view.View").text("心愿卡 x2").findOnce().parent();
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
        //回去白色的
        // backGameBtn("#FFFFFF");
    }


}

requestScreenCapture();
singnGetCj();

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