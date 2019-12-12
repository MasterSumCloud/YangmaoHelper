console.log("开始")

id("my_rv").findOne().children().forEach(child => {
    var target = child.findOne(id("my_coupons_ll"));
    target.click();
});
// text[1].click();
// for (let i = 0; i < yaoqing.length; i++) {
//     textMatches(/^邀请$/).findOnce().click();
//     sleep(500);
// }

//textContains("立即签到").findOnce().click();
console.log("结束")