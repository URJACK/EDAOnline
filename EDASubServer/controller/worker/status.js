const ServerInfoModule = require('./index').ServerInfoModule;
const util = require('./index').util;
const netCode = require('./index').netCode;
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let address = data.address;
        let port = data.port;
        let token = data.token;
        if (token == ServerInfoModule.getRootServerToken()) {
            //设置 本地记录的主服务器的 IP 与 PORT
            ServerInfoModule.setRootServerIp(address);
            ServerInfoModule.setRootServerPort(port);
            //尝试取得 当前子服务器的状态
            let status = ServerInfoModule.getServerStatus();
            ctx.body = {
                code: netCode.SUCCESS,
                status: status
            }
        } else {
            ctx.body = {
                code: netCode.TOKENERR,
            }
        }
    } catch (error) {
        util.error(error);
    }
}