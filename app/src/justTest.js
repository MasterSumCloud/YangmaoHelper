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
        //先拿到所有可执行的任务 
        let canDoTask = [];
        for (let k = 0; k < listTask.childCount(); k++) {
            let taskItem = listTask.child(k);
            if (taskItem != null) {
                let textOfItem = taskItem.text();
                if (textOfItem != null && textOfItem != undefined && textOfItem != '') {
                    if (textOfItem.includes('每日限领')) {
                        let putTask = textOfItem.slice(0, textOfItem.indexOf(" ") + 1);
                        if (putTask.includes("首页")) {
                            continue;
                        } else if (putTask.includes("淘宝人生")) {
                            continue;
                        } else if (putTask.includes("消消消")) {
                            continue;
                        } else if (putTask.includes("下单")) {
                            continue;
                        } else if (putTask.includes("进群打卡")) {
                            continue;
                        }
                        console.log("保存的任务", putTask)
                        canDoTask.push(putTask);
                    }
                }
            }
        }

        for (let o = 0; o < canDoTask.length; o++) {
            let doName = canDoTask[o];
            findTaskAndDoIt(doName);
        }
    }
}

function findTaskAndDoIt(doName) {
    let partent = textStartsWith("领水滴 做任务领水滴，可大幅提升植物成熟后的收获哦").findOnce();
    if (partent != null) {
        let listTask = partent.child(0).child(1).child(0);
        for (let k = 0; k < listTask.childCount(); k++) {
            let taskItem = listTask.child(k);
            if (taskItem != null) {
                let textOfItem = taskItem.text();
                if (textOfItem != null && textOfItem != undefined && textOfItem != '') {
                    if (textOfItem.startsWith(doName)) {
                        if (k + 4 < listTask.childCount()) {
                            let finishTypeUi = listTask.child(k + 4);
                            let stateTaskType = finishTypeUi.text();
                            if (stateTaskType != null && stateTaskType != undefined && stateTaskType != '') {
                                if (stateTaskType.includes("冷却中")) {
                                    console.log("冷却中的任务", doName);
                                } else if (stateTaskType.includes("已完成")) {
                                    console.log("已完成的任务", doName);
                                } else {
                                    if (stateTaskType == '去逛逛' || stateTaskType == '去完成') {
                                        console.log("执行的任务名字", doName);
                                        liuLanAndBack(finishTypeUi, 15000, true);
                                    } else if (stateTaskType == '打卡') {
                                        console.log("执行的任务名字", doName);
                                        liuLanAndBack(finishTypeUi, 0, false);
                                    }
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