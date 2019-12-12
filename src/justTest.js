let keDrop = textContains("可浇水").findOnce();
console.log("开始了哦")

let deviceWidth = device.width;
let deviceHeight = device.height;
let pageDelay = 16 * 1000;
for (let i = 0; i < 10; i++) {
    sleep(1000);
    let qoGg = textContains("浏览任务").findOnce();
    if (qoGg != null) {
        qoGg.click();
        sleep(pageDelay);
        back();
    } else {
        break;
    }
}









console.log("结束")