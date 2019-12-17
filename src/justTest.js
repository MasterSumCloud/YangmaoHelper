
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")

let topTitle = className("android.view.View").text("周排行榜").findOnce();
// let itemList = topTitle.parent().parent().parent().child(1);
let item0 = topTitle.parent().parent().parent().child(0).child(0).child(0).child(0).text();

console.log(parseInt(item0));

console.log("结束")