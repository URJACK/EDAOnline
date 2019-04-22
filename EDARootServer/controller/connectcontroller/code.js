const util = require('./index').util;
const db = require('./index').db;
const netCode = require('./index').netCode;
const compilerModule = require('./index').compilerModule;

/**编译代码 */
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let serverName = data.servername;
        let token = data.token;
        let content = data.content;
        let pins = data.pins;
        let subServer = await db.SubServer.findOne({
            where: {
                name: serverName
            }
        })
        if (subServer == null) {
            ctx.body = {
                code: netCode.SUBSERVERNOTEXIST
            }
        } else {
            if (subServer.token != token) {
                ctx.body = {
                    code: netCode.TOKENERR
                }
            } else {
                compilerModule.setPins(pins);
                compilerModule.setCode(content);
                compilerModule.compile();
                compilerModule.transferFile(subServer.address, subServer.port, function (data) {
                    ctx.body = {
                        code: netCode.SUCCESS
                    }
                })
            }
        }
    } catch (error) {
        util.error(error);
    }
}