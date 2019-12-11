
function startTaobao(){
    console.log("去淘宝");

    launch("com.taobao.taobao");
    sleep(3000)
    //launch app
    click(device.width-100,device.height-100);
    sleep(200)
    swipe(device.width/2, device.height*0.9, device.width/2, 0, 1000);
    openGoldGarden()
}

/**
 * 淘宝金币庄园 游戏
 */
function openGoldGarden(){

    click(device.width*0.75,device.height*0.7);
    sleep(3000);
    //做领取水滴任务
    click(973,1113);
    let taskButtonX = 920;
    let diButtonHeigh = 215;
    let firstButtonY = 826;
    //第一个签到
    click(taskButtonX,firstButtonY);
    sleep(100);

    //第二个浏览商品
    goSeeAndBack(taskButtonX,firstButtonY+diButtonHeigh);
    sleep(500);
    //第三个
    goSeeAndBack(taskButtonX,firstButtonY+2*diButtonHeigh);
    sleep(500);
    //第四个
    goSeeAndBack(taskButtonX,firstButtonY+3*diButtonHeigh);
    sleep(500);
    //第五个
    goSeeAndBack(taskButtonX,firstButtonY+4*diButtonHeigh);
    sleep(500);
    //第六个
    goSeeAndBack(taskButtonX,firstButtonY+5*diButtonHeigh);
    sleep(500);
    //陶人生 先不做 TODO

    //浇水 先不做

    //关闭水滴领取框
    click(device.width/2,235);
    sleep(500);
}

function toDaygoldTask(){
    click(113,1149);
    swipe(device.width/2, device.height*0.9, device.width/2, 0, 1000);
    sleep(100);
    swipe(device.width/2, device.height*0.9, device.width/2, device.height*0.9-540, 500);
    
    let itemButtonX = 912;
    let firstButtonY = 283;

    for (let i = 0; i < 6; i++) {
        goGet5GoldAndBack(itemButtonX, firstButtonY);
    }

}

function goGet5GoldAndBack(x, y) {
    click(x, y);
    sleep(3000);
    back();
    sleep(500);
    swipe(device.width / 2, device.height * 0.9, device.width / 2, device.height * 0.9 - 689, 1000);
    sleep(500);
}

function goSeeAndBack(x,y){
    click(x,y);
    sleep(14000);
    click(74,135);
}

startTaobao();