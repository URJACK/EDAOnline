const db = require('./index').db;
const util = require('./index').util;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
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
                info: "邮箱不存在，请不要擅自修改信息"
            }
        } else {
            if (userObj.status != userStatusCode.FINISHEDREGISTER) {
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
            } else {
                ctx.body = {
                    code: netCode.MAILEXIST,
                    info: "请注意你的邮箱是否已经被重复注册"
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