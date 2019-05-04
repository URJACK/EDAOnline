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
        pins = JSON.parse(pins);
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
                ctx.body = {
                    code: netCode.SUCCESS
                }
                compilerModule.compile(pins, content);
                compilerModule.transferFile(subServer.address, subServer.port, function (data) {
                    console.log("已经成功传输了文件")
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}