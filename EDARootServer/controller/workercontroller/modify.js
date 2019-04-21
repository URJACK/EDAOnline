const util = require('./index').util;
const netCode = require('./index').netCode;
const serverCode = require('./index').serverCode;
const userLevelCode = require('./index').userLevelCode;
const db = require('./index').db;
const resultOfCheckUserLevelISManager = require('./index').resultOfCheckUserLevelISManager;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let serverinfo = data.serverinfo;
        let result = await resultOfCheckUserLevelISManager(ctx);
        if (result == true) {
            let dbObj = await db.SubServer.findOne({
                where: {
                    name: serverinfo.name
                }
            })
            if (dbObj == null) {
                ctx.body = {
                    code: netCode.SUBSERVERNOTEXIST
                }
            } else {
                dbObj.location = serverinfo.location;
                dbObj.introduction = serverinfo.introduction;
                dbObj.httpport = serverinfo.httpport;
                dbObj.address = serverinfo.address;
                await dbObj.save();
                ctx.body = {
                    code: netCode.SUCCESS
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