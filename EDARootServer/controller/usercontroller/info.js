const db = require('./index').db;
const netCode = require('./index').netCode;
const userStatusCode = require('./index').userStatusCode;

function createUserInfo(userObj) {
    return {
        email: userObj.email,
        name: userObj.name,
        grade: userObj.grade,
        info: userObj.info
    }
}

module.exports = async function (ctx, next) {
    let data = ctx.request.body;
    try {
        let email = ctx.session.email;
        if (email != null) {
            let userObj = await db.User.findOne({
                where: {
                    email: email
                }
            })
            if (userObj != null) {
                ctx.body = {
                    code: netCode.SUCCESS,
                    userinfo: createUserInfo(userObj)
                }
            } else {
                ctx.body = {
                    code: netCode.MAILNOTEXIST
                }
            }
        } else {
            ctx.body = {
                code: netCode.MAILNOTEXIST
            }
        }
    } catch (error) {

    }
}