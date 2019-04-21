const db = require('./index').db;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;
const util = require('./index').util;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let verifyCode = data.verifycode;
        let email = data.email;
        let userObj = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (userObj == null) {
            ctx.body = {
                code: netCode.MAILNOTEXIST
            }
        } else {
            if (userObj.verifycode == verifyCode) {
                userObj.status = userStatusCode.WAITINGBASICINFOMATION;
                await userObj.save();
                ctx.body = {
                    code: netCode.SUCCESS
                }
            } else {
                ctx.body = {
                    code: netCode.VERIFYINGERR
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