const util = require('./index').util;
const netCode = require('./index').netCode;
const serverCode = require('./index').serverCode;
const networkService = require('./index').networkService;
const db = require('./index').db;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let serverName = data.servername;
        let token = data.token;
        let subServerObj = await db.SubServer.findOne({
            where: {
                name: serverName
            }
        })
        if (subServerObj == null) {
            ctx.body = {
                code: netCode.SUBSERVERNOTEXIST
            }
        } else {
            if (subServerObj.token != token) {
                ctx.body = {
                    code: netCode.TOKENERR
                }
            } else {
                subServerObj.status = serverCode.FREE
                ctx.body = {
                    code: netCode.SUCCESS
                }
            }
        }
    } catch (error) {
        util.error(error);
    }
}