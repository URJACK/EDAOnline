const util = require('./index').util;
const netCode = require('./index').netCode;
const serverCode = require('./index').serverCode;
const userLevelCode = require('./index').userLevelCode;
const db = require('./index').db;
const resultOfCheckUserLevelISManager = require("./index").resultOfCheckUserLevelISManager;


/**
 * 添加一台新的服务器
 */
function createSubServer(name, location, introduction, httpport, address, token) {
    return {
        name: name,
        location: location,
        introduction: introduction,
        httpport: httpport,
        address: address,
        token: token,
        status: serverCode.CLOSE
    }
}
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let serverinfo = data.serverinfo;
        let name = serverinfo.name;
        let result = await resultOfCheckUserLevelISManager(ctx);
        if (result == true) {
            let dbObj = await db.SubServer.findOne({
                where: {
                    name: name
                }
            })
            if (dbObj != null) {
                //如果已经存在该服务器
                ctx.body = {
                    code: netCode.SUBSERVERNAMENOTUNIQUE
                }
            } else {
                let token = util.createToken(15);
                //如果不存在这个服务器
                dbObj = db.SubServer.build(createSubServer(serverinfo.name, serverinfo.location, serverinfo.introduction, serverinfo.httpport, serverinfo.address, token))
                await dbObj.save();
                ctx.body = {
                    code: netCode.SUCCESS,
                    token: token
                }
            }
        } else {
            ctx.body = result;
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: netCode.UNEXPECTEDERR
        }
    }
}