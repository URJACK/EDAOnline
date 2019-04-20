const db = require('./index').db;
const util = require('./index').util;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;

module.exports = async function (ctx, next) {
    let data = ctx.request.body;
    try {
        let userinfo = data.userinfo;
        let password = data.password;
        let userObj = await db.User.findOne({
            where: {
                email: userinfo.email
            }
        });
        if (userObj == null) {
            ctx.body = {
                code: netCode.MAILNOTEXIST,
                info: "请不要擅自再次修改邮箱信息"
            }
        } else {
            if (!util.emailCheck(userinfo.email)) {
                ctx.body = {
                    code: netCode.BASICINFOERR,
                    info: "邮箱不符合规范"
                }
            } else if (!util.infoStringCheck(userinfo.name)) {
                ctx.body = {
                    code: netCode.BASICINFOERR,
                    info: "用户的名称不能为空"
                }
            } else if (!util.infoNumberCheck(userinfo.grade)) {
                ctx.body = {
                    code: netCode.BASICINFOERR,
                    info: "用户的年级信息有误"
                }
            } else {
                userObj.email = userinfo.email;
                userObj.name = userinfo.name;
                userObj.grade = userinfo.grade;
                userObj.info = userinfo.info;
                userObj.password = password;
                userObj.status = userStatusCode.FINISHEDREGISTER;
                ctx.session.email = userinfo.email;
                await userObj.save();
                ctx.body = {
                    code: netCode.SUCCESS,
                    info: "已经成功完成用户注册"
                }
            }
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: netCode.UNEXPECTEDERR,
        }
    }
}