let dierqiJy = [{
    name: '玟茂',
    water: '20000',
    head64: 'T1CKNfXa8fXXXXXXXX_160X160'
},
{ name: '森林小伙伴', water: '18000', head64: 'T17aFfXddfXXXXXXXX_160X160' },
{
    name: '开挂的大叔',
    water: '17000',
    head64: 'T1ZctrXhJaXXXXXXXX_160X160'
},
{
    name: 'Lucky',
    water: '14000',
    head64: 'TB1EKnyb8WiDuNjmeUwXXap2XXa_160X160'
},
{
    name: 'majorz',
    water: '13011',
    head64: 'T1UXFqXeVfXXXXXXXX_160X160'
},
{
    name: '坤朋',
    water: '13010',
    head64: 'TB1ZZt1bARDDuNkUvLzXXaPTpXa_160X160'
},
{
    name: '加油',
    water: '13000',
    head64: 'T1lKRqXdxaXXXXXXXX_160X160'
},
{
    name: '旭阳',
    water: '13000',
    head64: 'TB1SujNXjBADuNjm2FTXXbqGpXa_160X160'
},
{
    name: '洋',
    water: '12000',
    head64: 'T1c7ddXeBpXXXXXXXX_160X160'
},
{ name: '蔚蓝枫叶', water: '12000', head64: 'TB1kE0' },
{
    name: '月光时年',
    water: '12000',
    head64: 'T1UBRhXf0bXXXXXXXX_160X160'
},
{
    name: '蹦~沙卡拉卡',
    water: '12000',
    head64: 'T1ncXlXmpeXXXXXXXX_160X160'
},
{
    name: '陌路枯藤',
    water: '12000',
    head64: 'TB1YdT_XaCHMeJjme6tXXauEXXa_160X160'
},
{
    name: 'WH',
    water: '11000',
    head64: 'T1jMpdXkppXXXXXXXX_160X160'
},
{ name: 'HolyJoe', water: '12000', head64: 'TB13' },
{
    name: 'NIYIHSGNAUH',
    water: '12000',
    head64: 'TB19wM5blhDDuNjm2FfXXai4pXa_160X160'
},
{
    name: 'Glenn',
    water: '12000',
    head64: 'T1Cv8AXb8aXXXXXXXX_160X160'
},
{ name: '森林小伙伴', water: '12000', head64: '' },
{
    name: 'XINGWEI.☀',
    water: '12000',
    head64: 'TB1GclwXomHDuNjme5VXXafZVXa_160X160'
},
{
    name: '真宝儿',
    water: '11000',
    head64: 'TB1ns_aaz9EDuNjmgXUXXbCKXXa_160X160'
},
{
    name: '.',
    water: '8000',
    head64: 'T110tcXoFoXXXXXXXX_160X160'
},
{
    name: '在心里',
    water: '8000',
    head64: 'TB1L3oIcndyDuNkUvLmXXaJ7XXa_160X160'
},
{ name: '猫熊', water: '7000', head64: '' },
{
    name: 'along1225',
    water: '7000',
    head64: 'T1rlBtXmNbXXXXXXXX_160X160'
},
{
    name: '陌颜染',
    water: '7000',
    head64: 'T1OOJEXfJXXXXXXXXX_160X160'
},
{
    name: '无端又被西风误',
    water: '4000',
    head64: 'T1tpBtXXFXXXXXXXXX_160X160'
},
{
    name: '磊哥',
    water: '3000',
    head64: 'TB1sGsJbfqGDuNjme5gXXavWpXa_160X160'
},
{
    name: '道1569',
    water: '3000',
    head64: 'T1NQVeXhXeXXXXXXXX_160X160'
},
{
    name: 'Mr.Zhu',
    water: '1000',
    head64: 'T1PyxeXhphXXXXXXXX_160X160'
},
{
    name: '静水流深',
    water: '1000',
    head64: 'T1qI0aXeldXXXXXXXX_160X160'
}]


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
                "water": '',
                "head64": ''
            };
            if (i < 3) {
                let head64 = element.child(1).child(0).text();
                let name = element.child(2).text();
                let qk = element.child(3).text().replace("g", "");
                // console.log(name, qk);
                person.name = name;
                person.water = qk;
                person.head64 = head64;
            } else {
                let head64 = element.child(2).child(0).text();
                let name = element.child(3).text();
                let qk = element.child(4).text().replace("g", "");
                // console.log(name, qk);
                person.name = name;
                person.water = qk;
                person.head64 = head64;
            }
            arrList.push(person);
        }
        // let jizhun = JSON.stringify(arrList);
        // getddd(arrList);
        // console.log(jizhun);
    }
    for (let i = 0; i < arrList.length; i++) {
        if (i < arrList.length) {
            let newItem = arrList[i];

            // console.log("打印名字" + i, newItem.name)

            for (let k = 0; k < dierqiJy.length; k++) {
                let oldItem = dierqiJy[k];

                // if (i == 0) {
                //     console.log("打印名字"+k, oldItem.name)
                // }

                if (newItem.name == oldItem.name && newItem.head64 == oldItem.head64) {
                    let newNum = parseInt(newItem.water);
                    let oldNum = parseInt(oldItem.water);
                    if (newNum - oldNum < sanqiJJ) {
                        console.log("在总排中种序号：" + (i + 1) + "  名字：" + newItem.name + "   差额：" + (sanqiJJ - (newNum - oldNum)))
                    } else {
                        console.log("在总排名种序号：" + (i + 1) + "  名字：" + newItem.name + "   已交：" + (newNum - oldNum))
                    }
                }
            }
        }
    }

    for (let i = 0; i < arrList.length; i++) {
        let newJoinPerson = arrList[i];
        let newMember = parseInt(newJoinPerson.water);

        let isOldPerson = false;
        let histryYlWwater = 0;
        var hasInOldList = dierqiJy.filter((person) => {
            if (newJoinPerson.name == person.name && newJoinPerson.head64 == person.head64) {
                histryYlWwater = parseInt(person.water);
                return true;
            }
        });
        if (hasInOldList.length > 0) {
            isOldPerson = true;
        }

        if (newMember < sanqiJJ && !isOldPerson) {
            console.log("在总排名种序号：" + (i + 1) + "  新人名字：" + newJoinPerson.name + "   差额：" + (sanqiJJ - newMember))
        } else if (!isOldPerson) {
            console.log("在总排名种序号：" + (i + 1) + "  新人名字：" + newJoinPerson.name + "   已交：" + newMember)
        }
    }

    // console.log(dierqiJy)
}

//对名字进行修正


main();



/*
[
    { "name": "玟茂", "water": "20000", "head64": "" },
    { "name": "森林小伙伴", "water": "18000", "head64": "" },
    { "name": "开挂的大叔", "water": "17000", "head64": "" },
    { "name": "Lucky", "water": "14000", "head64": "" },
    { "name": "majorz", "water": "13011", "head64": "" },
    { "name": "坤朋", "water": "13010", "head64": "" },
    { "name": "加油", "water": "13000", "head64": "" },
    { "name": "旭阳", "water": "13000", "head64": "" },
    { "name": "洋", "water": "12000", "head64": "" },
    { "name": "蔚蓝枫叶", "water": "12000", "head64": "" },
    { "name": "月光时年", "water": "12000", "head64": "" },
    { "name": "蹦~沙卡拉卡", "water": "12000", "head64": "" },
    { "name": "陌路枯藤", "water": "12000", "head64": "" },
    { "name": "WH", "water": "11000", "head64": "" },
    { "name": "HolyJoe", "water": "12000", "head64": "" },
    { "name": "NIYIHSGNAUH", "water": "12000", "head64": "" },
    { "name": "Glenn", "water": "12000", "head64": "" },
    { "name": "森林小伙伴", "water": "12000", "head64": "" },
    { "name": "XINGWEI.☀", "water": "12000", "head64": "" },
    { "name": "真宝儿", "water": "11000", "head64": "" },
    { "name": ".", "water": "8000", "head64": "" },
    { "name": "在心里", "water": "8000", "head64": "" },
    { "name": "猫熊", "water": "7000", "head64": "" },
    { "name": "along1225", "water": "7000", "head64": "" },
    { "name": "陌颜染", "water": "7000", "head64": "" },
    { "name": "无端又被西风误", "water": "4000", "head64": "" },
    { "name": "磊哥", "water": "3000", "head64": "" },
    { "name": "道1569", "water": "3000", "head64": "" },
    { "name": "Mr.Zhu", "water": "1000", "head64": "" },
    { "name": "静水流深", "water": "1000", "head64": "" }]
*/

