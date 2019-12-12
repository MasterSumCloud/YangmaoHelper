let keDrop = textContains("可浇水").findOnce();
console.log("开始了哦")

let yaoqing = textMatches(/^邀请$/).find();

console.log(yaoqing.length)
// for (let i = 0; i < yaoqing.length; i++) {
//     textMatches(/^邀请$/).findOnce().click();
//     sleep(500);
// }

//textContains("立即签到").findOnce().click();
console.log("结束")