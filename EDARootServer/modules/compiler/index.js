const quartusCompiler = require('./quartusCompiler');
const netWorkService = require('../../service/network/index');
const config = require('./config');
const upLoadPath = "/upload/file";
const filePath = config.PATH_SOF;
module.exports.setPins = quartusCompiler.setPins;
module.exports.setCode = quartusCompiler.setCode;
/** 是一个同步方法，过程是阻塞的*/
module.exports.compile = function () {
    quartusCompiler.preCompile();
    quartusCompiler.compile();
}
module.exports.transferFile = function (address, port, callback) {
    netWorkService.sendPostFile(address, port, upLoadPath, filePath, callback);
}