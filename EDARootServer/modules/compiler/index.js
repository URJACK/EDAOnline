const quartusCompiler = require('./quartusCompiler');
const netWorkService = require('../../service/network/index');
const config = require('./config');
const upLoadPath = "/connect/result";
const filePath = config.PATH_SOF;
/** 是一个同步方法，过程是阻塞的*/
module.exports.compile = function (pins, code) {
    quartusCompiler.setPins(pins);
    quartusCompiler.setCode(code);
    quartusCompiler.preCompile();
    quartusCompiler.compile();
}
/** 传输文件给子服务器*/
module.exports.transferFile = function (address, port, callback) {
    netWorkService.sendPostFile(address, port, upLoadPath, filePath, callback);
}