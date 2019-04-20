const db = require('./index').db;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;

/**创建一个codeLength长度的数字验证码 */
function createVerifyCode(codeLength) {
    let arr = new String();
    for (let i = 0; i < codeLength; ++i) {
        arr += Math.floor(Math.random() * 10);
    }
    return arr;
}

/**创建一个数据里的User对象 */
function createUser(email, verifyCode) {
    return {
        email: email,
        status: userStatusCode.WAITINGVERIFYINGCODE,
        verifytime: new Date(),
        verifycode: verifyCode
    }
}

module.exports = async function (ctx, next) {
    let data = ctx.request.body;
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
                info: "用户邮箱已经存在"
            }
            return;
        }
        let verifyCode = createVerifyCode(5);
        userObj = db.User.build(createUser(email, verifyCode));
        await userObj.save();
        ctx.body = {
            code: netCode.SUCCESS,
            info: verifyCode
        }

    } catch (error) {
        console.log(error);
        ctx.body = {
            code: netCode.UNEXPECTEDERR
        }
    }
}