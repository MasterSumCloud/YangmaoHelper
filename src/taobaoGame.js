let deviceWidth = device.width;
let deviceHeight = device.height;


function startTaobao() {
    console.log("去淘宝");

    launch("com.taobao.taobao");
    sleep(3000)
    //launch app
    click(device.width - 100, device.height - 100);
    sleep(200)
    swipe(device.width / 2, device.height * 0.9, device.width / 2, 0, 1000);
    openGoldGarden()
}

/**
 * 淘宝金币庄园 游戏
 */
function openGoldGarden() {

    click(device.width * 0.75, device.height * 0.7);
    sleep(3000);


    //金币庄园
    toDaygoldTask();
    sleep(1000);
    //掘金团队

}

function goWaterDrop() {
    //做领取水滴任务
    click(973, 1113);
    sleep(2000);
    //第一个签到
    textContains("打卡").findOnce().click();
    sleep(100);
    //浏览任务
    let pageDelay = 16 * 1000;
    for (let i = 0; i < 4; i++) {
        sleep(1000);
        let qoGg = textContains("去逛逛").findOnce();
        if(qoGg!=null){
            qoGg.click();
            sleep(pageDelay);
            back();
        }else{
            break;
        }
        
    }
    
    //陶人生 先不做 TODO

    //浇水
    sleep(1000);
    textContains("去浇水").findOnce().click();
    sleep(2000);

    let dropWaterTimes = 0;
    let openBtmTimes = 0;
    while(dropWaterTimes<5){
        let keDrop = textContains("可浇水").findOnce();
        if(keDrop!=null){
            keDrop.click();
            sleep(2000);
            click(1000,900);
            sleep(1000);
            back();
            dropWaterTimes++;
        }else{
            if(openBtmTimes>=5){
                dropWaterTimes = 5;
                break;
            }
            textContains("好友可偷金币").findOnce().click();
            openBtmTimes++;
            swipe(deviceWidth/2,deviceHeight*0.8,deviceWidth/2,deviceHeight*0.3,2000);
        }
    }
    

    //关闭水滴领取框
    click(device.width / 2, 235);
    sleep(1000);
}


function goNuggetsAndBack() {
    click(600,1170);
    sleep(3000);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, 0, 1000);
    sleep(100);

    clickInvestMulti();
    clickInvestMulti();
    clickInvestMulti();
    back();
}

/**
 * 金币庄园  邀请
 */
function clickInvestMulti(){
    let firstInvestX = 192;
    let firstInvestY = 522;
    let xDistence = 350;
    let yDistence = 525;
    //中间不点 挡住了 直接换一拨
    clickInvestButton(firstInvestX, firstInvestY);
    clickInvestButton(firstInvestX + xDistence, firstInvestY);
    clickInvestButton(firstInvestX + 2 * xDistence, firstInvestY);

    clickInvestButton(firstInvestX, firstInvestY + yDistence);
    clickInvestButton(firstInvestX + 2 * xDistence, firstInvestY + yDistence);

    clickInvestButton(firstInvestX, firstInvestY + 2 * yDistence);
    clickInvestButton(firstInvestX + xDistence, firstInvestY + 2 * yDistence);
    clickInvestButton(firstInvestX + 2 * xDistence, firstInvestY + 2 * yDistence);

        //换一批
    click(device.width / 2, 1720);
    sleep(2000);
}


function clickInvestButton(x, y) {
    click(x, y);
    sleep(500);
}

/**
 * 每日金币领取
 */
function toDaygoldTask() {
    click(113, 1149);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, 0, 1000);
    sleep(100);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, device.height * 0.9 - 540, 500);

    let itemButtonX = 912;
    let firstButtonY = 283;

    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    goGet5GoldAndBack(itemButtonX, firstButtonY);
    //回去
    back();
}

/**
    店铺来回签到
 */
function goGet5GoldAndBack(x, y, i) {
    click(x, y);
    sleep(3000);
    back();
    sleep(1000);
    swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.8 - 688, 1000);
    sleep(1000);
}

//startTaobao();
goWaterDrop();