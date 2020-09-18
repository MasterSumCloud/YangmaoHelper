// let backApp = text("startapp?appId=60000002&url=%2Fwww%2Fhome").findOnce();
// backApp.click();
// console.log(backApp);

// let masen = text("蚂蚁森林").id("h5_tv_title").findOnce();

// let kanLinQu = className("android.widget.Button").text("看林区").findOne(3000);
// console.log(kanLinQu);
// kanLinQu.parent().children().forEach(child => {
//     if (child.text() == ' ' || child.text().startsWith("收集能量")) {
//         click(child.bounds().centerX(), child.bounds().centerY());
//         sleep(150);
//         console.log("点击收能量")
//     }
// });

let deviceWidth = device.width;
let deviceHeight = device.height;
gesture(300, [deviceWidth / 2, deviceHeight * 0.9], [deviceWidth / 2, deviceHeight * 0.2])
// gesture(1000, [0, 0], [500, 500], [500, 1000])