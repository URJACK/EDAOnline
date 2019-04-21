const util = require('./index').util;
const netCode = require('./index').netCode;
const serverCode = require('./index').serverCode;
const networkService = require('./index').networkService;
const db = require('./index').db;

function databaseToUserInfo(userObj) {
    let obj = {};
    obj.email = userObj.email;
    obj.name = userObj.name;
    obj.grade = userObj.grade;
    obj.info = userObj.info;
    return obj;
}
const subServerOccupyPath = "/worker/occupy";
const subServerVisitPath = "/index";
/**This Method Has Not Been Tested Yet */
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let serverName = data.servername;
        let subServer = await db.SubServer.findOne({
            where: {
                name: serverName
            }
        });
        if (subServer == null) {
            ctx.body = {
                code: netCode.SUBSERVERNOTEXIST
            }
        } else {
            if (subServer.status == serverCode.CLOSE) {
                ctx.body = {
                    code: netCode.SUBSERVERNOTOPEN
                }
            } else if (subServer.status == serverCode.USING) {
                ctx.body = {
                    code: netCode.SUBSERVEROCCCUPIED
                }
            } else if (subServer.status == serverCode.FREE) {
                let userInfo = await db.User.findOne({
                    where: {
                        email: ctx.session.email
                    }
                });
                if (userInfo != null) {
                    networkService.sendPostJson(subServer.address, subServer.httpport, subServerOccupyPath, databaseToUserInfo(userInfo), function (data) {
                        ctx.body = {
                            code: netCode.SUCCESS,
                            linkurl: createLinkUrl(subServer.address, subServer.httpport, subServerVisitPath)
                        }
                    });
                } else {
                    ctx.body = {
                        code: netCode.MAILNOTEXIST
                    }
                }
            } else {
                ctx.body = {
                    code: netCode.UNEXPECTEDERR
                }
            }
        }
    } catch (error) {
        util.error(error);
    }
}