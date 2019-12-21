
let deviceWidth = device.width;
let deviceHeight = device.height;

console.log("开始")
function getNeedGetAliScore(need) {
    //如果需要领取积分
    if (need) {
        let inMine = id("tab_description").text("我的").findOnce();
        click(inMine.bounds().centerX(), inMine.bounds().centerY());
        sleep(500);
        //判断当前有没有积分可以领取
        let hasScore = textContains("个积分待领取").findOnce();
        if (hasScore != null) {
            let backCount = 0;
            let memeberAli = id("item_left_text").text("支付宝会员").findOnce();
            if (memeberAli != null) {
                click(memeberAli.bounds().centerX(), memeberAli.bounds().centerY());
                backCount++;
                sleep(2000);
                let getScoreV = className("android.view.View").text("领积分").findOnce();
                if (getScoreV != null) {
                    click(getScoreV.bounds().centerX(), getScoreV.bounds().centerY());
                    sleep(2000);
                    backCount++;
                    let clickGetScore = className("android.view.View").text("点击领取").findOnce();
                    while (clickGetScore != null) {
                        click(clickGetScore.bounds().centerX(), clickGetScore.bounds().centerY());
                        sleep(300);
                        clickGetScore = className("android.view.View").text("点击领取").findOnce();
                    }
                }
            }

            for (let i = 0; i < backCount; i++) {
                back();
                sleep(500);
            }
        } else {
            toastLog("没有积分可领取")
        }
        let inHome = id("tab_description").text("首页").findOnce();
        click(inHome.bounds().centerX(), inHome.bounds().centerY());
        sleep(500);
    }
}

getNeedGetAliScore(true);
console.log("结束")