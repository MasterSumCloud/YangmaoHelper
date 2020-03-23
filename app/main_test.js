
// engines.execScriptFile("./src/antFarm.js");
// engines.execScriptFile("./src/taoLife.js");
// engines.execScriptFile("./src/justTest.js");
// engines.execScriptFile("./pop_animi.js");
// engines.execScriptFile("./lib/baiduTextAnysis.js");
// engines.execScriptFile("./src/wangZhe.js");
// engines.execScriptFile("./src/WangZheSignIn.js");


requestScreenCapture();
sleep(2000);
let antFramGame = require("./src/antFarm.js")
antFramGame(false);
