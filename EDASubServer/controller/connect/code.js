const ServerInfoModule = require('./index').ServerInfoModule;
const networkModule = require('./index').networkModule;
const util = require('./index').util;
const netCode = require('./index').netCode;


function createSenddata(content, pins) {
    return {
        servername: ServerInfoModule.getServerName(),
        token: ServerInfoModule.getServerToken(),
        content: content,
        pins: JSON.stringify(pins)
    }
}

const rootServerCodePath = "/connect/code";

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let content = data.content;
        let pins = data.pins;
        let sendData = createSenddata(content, pins);
        console.log(sendData);
        networkModule.sendPostJson(ServerInfoModule.getRootServerIp(), ServerInfoModule.getRootServerPort(), rootServerCodePath, sendData, function (data) {
            console.log("主服务器正在进行编译");
        })
        ctx.body = {
            code: netCode.SUCCESS
        }
    } catch (error) {
        util.error(error);
    }
}