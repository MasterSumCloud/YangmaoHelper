// let EUtil = require('./EUtil.js');
let deviceWidth = device.width;
let deviceHeight = device.height;
// requestScreenCapture();
// sleep(2000);

console.log("开始")

function getWaterDrop() {
    let partent = textStartsWith("领水滴 做任务领水滴，可大幅提升植物成熟后的收获哦").findOnce();
    if (partent != null) {
        let listTask = partent.child(0).child(1).child(0);
        for (let i = 0; i < listTask.childCount(); i++) {
            // let taskItemPosition = i % 4;
            let taskNameUi = listTask.child(i);
            let taskType = -1;
            if (taskNameUi.text() != null && taskNameUi.text().includes("每日限领")) {
                if (i > 24) {//滑动一屏幕
                    swipe(deviceWidth / 2, deviceHeight * 0.9, deviceWidth / 2, deviceHeight * 0.2, 2000)
                    sleep(2000);
                }
                let taskName = taskNameUi.text();
                console.log("进来的任务=", taskName)
                if (taskName != null && taskName != undefined && taskName != '') {
                    if (taskName.includes("打卡")) {
                        taskType = 1;
                    } else if (taskName.includes("淘宝人生")) {
                        taskType = 2;
                    } else if (taskName.includes("消消消")) {
                        taskType = 3;
                    } else if (taskName.includes("下单")) {
                        taskType = 4;
                    } else if (taskName.includes("金币")) {
                        taskType = 5;
                    } else if (taskName.includes("首页")) {
                        taskType = 6;
                    } else {
                        taskType = 11;
                    }
                    console.log("执行的任务类型", taskType)
                    //判断是否可以做 或者已经做过了
                    if (i + 4 < listTask.childCount()) {
                        let finishTypeUi = listTask.child(i + 4);
                        let stateTaskType = finishTypeUi.text();
                        if (stateTaskType != null && stateTaskType != undefined && stateTaskType != '') {
                            if (stateTaskType.includes("冷却中")) {
                                console.log("冷却中的任务", taskName);
                            } else if (stateTaskType.includes("已完成")) {
                                console.log("已完成的任务", taskName);
                            } else {
                                if (taskType == 1) {
                                    if (stateTaskType == '打卡') {
                                        console.log("执行的任务名字", taskName);
                                        liuLanAndBack(finishTypeUi, 0, false);
                                        getWaterDrop();
                                        break;
                                    }
                                } else if (taskType == 11) {
                                    if (stateTaskType == '去逛逛' || stateTaskType == '去完成') {
                                        console.log("执行的任务名字", taskName);
                                        liuLanAndBack(finishTypeUi, 15000, true);
                                        getWaterDrop();
                                        break;
                                    }
                                } else {
                                    console.log("不做的任务", taskName);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function liuLanAndBack(uiSelf, delay, needBack) {
    if (uiSelf != null) {
        // click(deviceWidth * 0.85, uiSelf.bounds().centerY());
        uiSelf.click()
        sleep(delay);
        if (needBack) {
            back();
            sleep(3000);
        }
    }
}

getWaterDrop();

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

function backGameBtn(color) {
    if (color == undefined || color == null) {
        color = "#333333";
    }
    let findeBackPoint = EUtil.ColorSearchEngin(color, [45, 225, 30, 75]);
    if (findeBackPoint != -1) {
        click(findeBackPoint.x, findeBackPoint.y);
        sleep(1000);
    }
}