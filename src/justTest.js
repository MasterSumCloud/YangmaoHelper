console.log("开始")
//进群打卡领金币
click(900, 950);
sleep(3000);
//随便点个群
click(500, 485);
sleep(8000);
//点击打卡
click(700,700);
sleep(3000);
//判断时候有任务
let lingqu = id("action_button").findOnce();
if(lingqu!=null){
    lingqu.click();
    sleep(3000);
    descContains("领取奖励").findOnce().click();
    back();
    sleep(1000);
    back();
    sleep(1000);
    back();
    sleep(1000);
}

console.log("结束")