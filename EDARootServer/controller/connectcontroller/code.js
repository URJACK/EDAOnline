const util = require('./index').util;
const db = require('./index').db;
const netCode = require('./index').netCode;
const compilerModule = require('./index').compilerModule;

/**编译代码 */
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    let subServer;
    try {
        let serverName = data.servername;
        let token = data.token;
        let content = data.content;
        let pins = data.pins;
        pins = JSON.parse(pins);
        subServer = await db.SubServer.findOne({
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
                compilerModule.transferFile(subServer.address, subServer.httpport, function (data) {
                    console.log("已经成功传输了文件")
                })
                let statusData = {
                    code: netCode.SUCCESS
                }
                compilerModule.sendStatus(subServer.address, subServer.httpport, statusData, function (data) {
                    console.log("已经成功设置了子服务器状态")
                })
            }
        }
    } catch (error) {
        console.log(error);
        let statusData = {
            code: netCode.SUBSERVERLOSTCONNECTION,
            info: error.message
        }
        compilerModule.sendStatus(subServer.address, subServer.httpport, statusData, function (data) {
            console.log("编译错误，已经成功设置了子服务器状态")
        })
    }
}