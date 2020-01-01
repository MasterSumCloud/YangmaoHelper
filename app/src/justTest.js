// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
importPackage(org.joda.time);
// requestScreenCapture();
//click(deviceWidth / 2, 1670);
console.log("开始")

const CONFIG_STORAGE_NAME = 'ant_start_score'
let configStorage = storages.create(CONFIG_STORAGE_NAME);
configStorage.put("starsBallTargetScore", 210);
let data = configStorage.get("starsBallTargetScore");
console.log("da===", data);



console.log("结束")

function getScreenImg() {
    let screenPic = captureScreen();
    console.log(screenPic);
    sleep(100);
    if (screenPic == null || typeof (screenPic) == "undifined") {
        toastLog("截图失败,退出脚本");
        exit();
    } else {
        return screenPic;
    }
}