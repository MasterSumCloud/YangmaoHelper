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

let afmillis = new Date().getTime() + 5 * 60 * 1000;
let task = timers.addDisposableTask({
    path: './src/antForestTimeTask.js',
    date: afmillis
})
console.log(task)