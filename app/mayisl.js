let dierqiJy = [{ "name": "玟茂", "water": "14000" }, { "name": "森林小伙伴", "water": "13000" }, { "name": "开挂的大叔", "water": "11000" }, { "name": "旭阳", "water": "10000" }, { "name": "加油", "water": "10000" }, { "name": "Lucky", "water": "10000" }, { "name": "真宝儿", "water": "10000" }, { "name": "WH", "water": "10000" }, { "name": "坤朋", "water": "9010" }, { "name": "月光时年", "water": "9000" }, { "name": "Glenn", "water": "9000" }, { "name": "蔚蓝枫叶", "water": "9000" }, { "name": "蹦~沙卡拉卡", "water": "9000" }, { "name": "majorz", "water": "9000" }, { "name": "陌路枯藤", "water": "9000" }, { "name": "洋", "water": "9000" }, { "name": "森林小伙伴", "water": "9000" }, { "name": "HolyJoe", "water": "9000" }, { "name": "XINGWEI.☀", "water": "9000" }, { "name": "NIYIHSGNAUH", "water": "9000" }, { "name": "无端又被西风误", "water": "4000" }, { "name": ".", "water": "4000" }, { "name": "along1225", "water": "4000" }, { "name": "在心里", "water": "4000" }, { "name": "陌颜染", "water": "4000" }, { "name": "猫熊", "water": "4000" }];
let arrList = [];
const sanqiJJ = 3000;
function main() {
    let rankList = id('J-rank').findOnce();
    if (rankList != null) {
        let zzList = rankList.child(1).child(0).children();
        for (let i = 0; i < zzList.length; i++) {
            let element = zzList[i];
            let person = {
                "name": '',
                "water": ''
            };
            if (i < 3) {
                let name = element.child(2).text();
                let qk = element.child(3).text().replace("g", "");
                // console.log(name, qk);
                person.name = name;
                person.water = qk;
            } else {
                let name = element.child(3).text();
                let qk = element.child(4).text().replace("g", "");
                // console.log(name, qk);
                person.name = name;
                person.water = qk;
            }
            arrList.push(person);
        }
        let jizhun = JSON.stringify(arrList);
        // console.log(jizhun);
    }
    for (let i = 0; i < arrList.length; i++) {
        let newItem = arrList[i];
        for (let k = 0; k < dierqiJy.length; k++) {
            let oldItem = dierqiJy[k];
            if (newItem.name == oldItem.name) {
                let newNum = parseInt(newItem.water);
                let oldNum = parseInt(oldItem.water);
                if (newNum - oldNum < sanqiJJ) {
                    console.log("名字：" + newItem.name + "   差额：" + (sanqiJJ - (newNum - oldNum)))
                }
            }
        }
        let newMember = parseInt(newItem.water);
        if (newMember < sanqiJJ) {
            console.log("新人名字：" + newItem.name + "   差额：" + (sanqiJJ - newMember))
        }
    }
}

main();