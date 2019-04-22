const ServerInfoModule = require('./index').ServerInfoModule;
const util = require('./index').util;
const netCode = require('./index').netCode;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let token = data.token;
        if (token == ServerInfoModule.getRootServerToken()) {
            ServerInfoModule.freeServerStatus();
            ctx.body = {
                code: netCode.SUCCESS
            }
        } else {
            ctx.body = {
                code: netCode.TOKENERR
            }
        }
    } catch (error) {
        util.error(error);
    }
}