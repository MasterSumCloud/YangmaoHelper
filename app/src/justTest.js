
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")

let getScoreV = className("android.view.View").text("领积分").findOnce();
click(getScoreV.bounds().centerX(), getScoreV.bounds().centerY());


console.log("结束")