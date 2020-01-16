
/**
 * 根据小图找大图 如果不存在返回-1
 * @param {小图的路径} templeUrl 
 * @param {搜索参数} areaRgion 
 * @param {最大查找数量} maxNum 
 */
function ImageSearchEngin(templeUrl, areaRgion, maxNum) {
    let screen = getScreenImg();
    let temple = images.read(templeUrl);
    let hasCardMatches = images.matchTemplate(screen, temple, { threshold: 0.8, region: areaRgion, max: maxNum }).matches;
    console.log("找图工具类提示", hasCardMatches);
    if (hasCardMatches == null || hasCardMatches.length == 0) {
        return -1;
    } else {
        return hasCardMatches;
    }
}

/**
 * 根据小图找大图 如果不存在返回-1
 * @param {相思值} threshold
 * @param {小图的路径} templeUrl 
 * @param {搜索参数} areaRgion 
 * @param {最大查找数量} maxNum 
 */

function ImageSearchEnginSelfThrehold(threshold, templeUrl, areaRgion, maxNum) {
    let screen = getScreenImg();
    let temple = images.read(templeUrl);
    let hasCardMatches = images.matchTemplate(screen, temple, { threshold: threshold, region: areaRgion, max: maxNum }).matches;
    console.log("找图工具类提示", hasCardMatches);
    if (hasCardMatches == null || hasCardMatches.length == 0) {
        return -1;
    } else {
        return hasCardMatches;
    }
}

/**
 * 根据颜色搜索坐标点 不存在返回-1
 * @param {需要找的颜色} templeColor 
 * @param {搜索参数} areaRgion 
 * @param {误差值} threshold 
 */
function ColorSearchEngin(templeColor, areaRgion, threshold) {
    let screen = getScreenImg();
    let findPoint = findColor(screen, templeColor, {
        region: areaRgion,
        threshold: threshold
    });
    console.log("找图工具类提示", findPoint);
    if (findPoint) {
        return findPoint;
    } else {
        return -1;
    }
}

function ColorImageEngin(templeColor, areaRgion, threshold) {
    let screen = getScreenImg();
    let findPoint = findColor(screen, templeColor, {
        region: areaRgion,
        threshold: threshold
    });
    console.log("找图工具类提示", findPoint);
    if (findPoint) {
        return findPoint;
    } else {
        return -1;
    }
}

/**
 * 获取屏幕图片
 */
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


module.exports.ImageSearchEngin = ImageSearchEngin
module.exports.ColorSearchEngin = ColorSearchEngin
module.exports.ImageSearchEnginSelfThrehold = ImageSearchEnginSelfThrehold
module.exports.ColorImageEngin = ColorImageEngin

