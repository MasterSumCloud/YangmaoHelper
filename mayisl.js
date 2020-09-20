let dierqiJy = [{"name":"玟茂","water":"20000"},{"name":"森林小伙伴","water":"18000"},{"name":"开挂的大叔","water":"17000"},{"name":"Lucky","water":"14000"},{"name":"majorz","water":"13011"},{"name":"坤朋","water":"13010"},{"name":"加油","water":"13000"},{"name":"旭阳","water":"13000"},{"name":"洋","water":"12000"},{"name":"蔚蓝枫叶","water":"12000"},{"name":"月光时年","water":"12000"},{"name":"蹦~沙卡拉卡","water":"12000"},{"name":"陌路枯藤","water":"12000"},{"name":"WH","water":"11000"},{"name":"HolyJoe","water":"12000"},{"name":"NIYIHSGNAUH","water":"12000"},{"name":"Glenn","water":"12000"},{"name":"森林小伙伴","water":"12000"},{"name":"XINGWEI.☀","water":"12000"},{"name":"真宝儿","water":"11000"},{"name":".","water":"8000"},{"name":"在心里","water":"8000"},{"name":"猫熊","water":"7000"},{"name":"along1225","water":"7000"},{"name":"陌颜染","water":"7000"},{"name":"无端又被西风误","water":"4000"},{"name":"磊哥","water":"3000"},{"name":"道1569","water":"3000"},{"name":"Mr.Zhu","water":"1000"},{"name":"静水流深","water":"1000"}]
let arrList = [];
const sanqiJJ = 7000;
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
                } else {
                    console.log("名字：" + newItem.name + "   已交：" + (newNum - oldNum))
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