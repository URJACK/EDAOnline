const db = require('./index').db;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;
const userLevelCode = require('./index').userLevelCode;
const util = require('./index').util;
const nodeModule = require('./index').nodeModule;

/**创建一个数据里的User对象 */
function createUser(email, verifyCode) {
    return {
        email: email,
        status: userStatusCode.WAITINGVERIFYINGCODE,
        verifytime: new Date(),
        verifycode: verifyCode,
        level: userLevelCode.USER
    }
}

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let email = data.email;
        let userObj = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (userObj != null) {
            ctx.body = {
                code: netCode.MAILEXIST,
            }
            return;
        }
        let verifyCode = util.createToken(5);
        userObj = db.User.build(createUser(email, verifyCode));
        nodeModule.send(email, "FPGA在线实验室注册验证码", "验证码为:" + verifyCode)
        await userObj.save();
        ctx.body = {
            code: netCode.SUCCESS,
        }

    } catch (error) {
        util.error(ctx, error);
    }
}