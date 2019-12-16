
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")


function startTaoLife() {
    let taorens = className("android.webkit.WebView").textContains("第二人生").findOnce();
    //如果有人送卡
    if (taorens != null) {
        let taoDivHeight = taorens.bounds().bottom - taorens.bounds().top;
        let taobarHeight = taorens.bounds().top;
        for (let i = 0; i < 5; i++) {
            click(Math.round(deviceWidth * 0.548), Math.round(taoDivHeight * 0.546) + taobarHeight);
            sleep(300);
            click(Math.round(deviceWidth * 0.781), Math.round(taoDivHeight * 0.546) + taobarHeight);
            sleep(300);
            click(Math.round(deviceWidth * 0.958), Math.round(taoDivHeight * 0.457) + taobarHeight);
            sleep(400);
        }
        //点击可能存在的任务等
        for (let i = 0; i < 5; i++) {
            click(deviceWidth / 2, Math.round(taoDivHeight * 0.715 + taobarHeight));
            sleep(1000);
        }
        back();
        sleep(1000);
        //返回的按钮
        click(deviceWidth / 2, Math.round(taoDivHeight * 0.645) + taobarHeight);
    }
}

startTaoLife();


console.log("结束")