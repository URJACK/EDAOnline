const db = require('./index').db;
const util = require('./index').util;
const netCode = require('./index').netCode;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let userinfo = data.userinfo;
        let dbObj = await db.User.findOne({
            where: {
                email: userinfo.email
            }
        });
        if (dbObj == null) {
            ctx.body = {
                code: netCode.MAILNOTEXIST,
                info: "该用户已经消失"
            }
        } else {
            if (ctx.session.email == userinfo.email) {
                if (!util.infoStringCheck(userinfo.name)) {
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
                    dbObj.name = userinfo.name;
                    dbObj.grade = userinfo.grade;
                    dbObj.info = userinfo.info;
                    await dbObj.save();
                    ctx.body = {
                        code: netCode.SUCCESS,
                        info: "用户的信息修改完成"
                    }
                }
            } else {
                ctx.body = {
                    code: netCode.BASICINFOERR,
                    info: "登陆邮箱与需要更改的邮箱不符合"
                }
            }
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: netCode.UNEXPECTEDERR
        }
    }
}