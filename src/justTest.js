
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")

let indexItem = className("android.view.View").text(5).findOne();
// let rvList = indexItem.children();
// console.log("布局", indexItem);
let index = indexItem.parent().parent().parent();
console.log("布局", index.children()[3].click());

console.log("结束")