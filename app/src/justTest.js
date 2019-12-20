
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")

let memeberAli = id("item_left_text").text("支付宝会员").findOnce();
// click(inHome.bounds().centerX(), inHome.bounds().centerY());
memeberAli.click();

console.log("结束")