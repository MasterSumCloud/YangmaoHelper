
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")

let vDaka = className("android.view.View").descContains("立即打卡").findOnce();
click(vDaka.bounds().centerX(), vDaka.bounds().centerY());
// vDaka.click();

// getMutiSuns();


console.log("结束")