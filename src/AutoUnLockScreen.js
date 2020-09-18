const CONFIG_STORAGE_NAME = 'starsBallTargetScore'
let configStorage = storages.create(CONFIG_STORAGE_NAME);
let pwmap = require("./modules/MODULE_PWMAP");
let encrypt = pwmap.encrypt;
let passWorld = configStorage.get("savePhonePassword");
encrypt(passWorld);
require("./modules/MODULE_UNLOCK").unlock();