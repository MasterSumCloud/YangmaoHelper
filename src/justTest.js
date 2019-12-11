function toDaygoldTask(){
    // click(113,1149);
    swipe(device.width/2, device.height*0.9, device.width/2, 0, 1000);
    sleep(100);
    swipe(device.width/2, device.height*0.9, device.width/2, device.height*0.9-540, 500);
    
    let itemButtonX = 912;
    let firstButtonY = 283;

    for (let i = 0; i < 5; i++) {
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
toDaygoldTask();