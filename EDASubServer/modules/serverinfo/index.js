const userInfoRecorder = require('./userInfoRecorder');
const serverInfoRecorder = require('./serverInfoRecorder');
const rootServerInfoRecorder = require('./rootServerInfoRecorder');

module.exports.getServerName = function () {
    return serverInfoRecorder.serverName;
}
module.exports.getServerToken = function () {
    return serverInfoRecorder.serverToken;
}
module.exports.freeServerStatus = function () {
    serverInfoRecorder.freeStatus();
}
module.exports.usingServerStatus = function () {
    serverInfoRecorder.usingStatus();
}
module.exports.getServerStatus = function () {
    return serverInfoRecorder.serverStatus;
}
module.exports.getUserInfo = function () {
    return userInfoRecorder.getUserInfo();
}
module.exports.setUserInfo = function (userinfo) {
    userInfoRecorder.setUserInfo(userinfo);
}
module.exports.setRootServerIp = function (ip) {
    rootServerInfoRecorder.setIp(ip);
}
module.exports.getRootServerIp = function () {
    return rootServerInfoRecorder.getIp();
}
module.exports.setRootServerPort = function (port) {
    rootServerInfoRecorder.setPort(port);
}
module.exports.getRootServerPort = function () {
    return rootServerInfoRecorder.getPort();
}
module.exports.getRootServerToken = function () {
    return rootServerInfoRecorder.getRootServerToken()
}