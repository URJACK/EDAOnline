const ServerInfoModule = require('./index').ServerInfoModule;
const util = require('./index').util;
const netCode = require('./index').netCode;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let userinfo = data.userinfo;
        let token = data.token;
        if (token == ServerInfoModule.getRootServerToken()) {
            ServerInfoModule.usingServerStatus();
            ServerInfoModule.setUserInfo(userinfo);
            ctx.body = {
                code: netCode.SUCCESS
            }
        } else {
            ctx.body = {
                code: netCode.TOKENERR
            }
        }
    } catch (err) {
        util.error(err);
    }
}