var client_id = ""; // client_id 
var Secret_Key = ""; //Secret_Key
var image = ""; //base64图片字符串

var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + Secret_Key;
var res = http.get(url);
var rel = "";
if (res.statusCode == 200) {
    rel = res.body.string().toString();
    var map = eval("(" + rel + ")");
    rel = map.access_token;
}
url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=" + rel;
res = http.post(url, {
    "image": image
})
if (res.statusCode == 200) {
    rel = res.body.string().toString();
    var map = eval("(" + rel + ")");
    rel = map.words_result;
    var list = new Array();
    list = rel;
    var words = "";
    for (var i = 0; i < list.length; i++) {
        var ss = list[i];
        words  +=   ss.words;
    }
    print(words);   ///这个就是识别的文字
}