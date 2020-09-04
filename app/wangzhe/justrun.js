let deviceWidth = device.width;
let deviceHeight = device.height;

// let backApp = text("startapp?appId=60000002&url=%2Fwww%2Fhome").findOnce();
// backApp.click();
// console.log(backApp);

// let masen = text("蚂蚁森林").id("h5_tv_title").findOnce();
// console.log(masen);


let back2main = text("startapp?appId=60000002&url=%2Fwww%2Fhome").findOnce();
if (back2main != null) {
    back2main.click();
}