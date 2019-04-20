const db = require('./index').db;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;

module.exports = async function (ctx, next) {
    let data = ctx.request.body;
    try {
        let email = data.email;
        let password = data.password;
        let userObject = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (userObject == null) {
            ctx.body = {
                code: netCode.MAILNOTEXIST,
                info: "邮箱不存在"
            }
            return;
        }
        if (userObject.status == userStatusCode.FINISHEDREGISTER) {
            if (userObject.password == password) {
                //在会话中记录邮箱号
                ctx.session.email = email;
                ctx.body = {
                    code: netCode.SUCCESS,
                    info: "登陆成功"
                }
                return;
            } else {
                ctx.body = {
                    code: netCode.PASSWORDNOTRIGHT,
                    info: "密码不正确"
                }
                return;
            }
        } else {
            ctx.body = {
                code: netCode.NOTREGIST,
                info: "该邮箱尚未完成注册"
            }
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: netCode.UNEXPECTEDERR
        }
    }
}