const ServerInfoModule = require('./index').ServerInfoModule;
const networkModule = require('./index').networkModule;
const util = require('./index').util;
const netCode = require('./index').netCode;
const serialConn = require('./index').serialConn;

function infomationChecker(frequencyValue, switchValue, modeValue, analogValue) {
    if (frequencyValue.length == 8 && switchValue.length == 2 && modeValue.length == 1 && analogValue.length == 3) {
        return true;
    } else {
        return false;
    }
}
/**
 * 这是一个传输接口
 * 用来处理 “用户”对服务器的控制信号
 */
module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let frequencyValue = data.frequency;
        let switchValue = data.switch;
        let modeValue = data.mode;
        let analogValue = data.analog;
        if (infomationChecker(frequencyValue, switchValue, modeValue, analogValue)) {
            if (serialConn.setData(frequencyValue, switchValue, modeValue, analogValue)) {
                ctx.body = {
                    code: netCode.SUCCESS
                }
            } else {
                ctx.body = {
                    code: netCode.PORTCONFIGERR
                }
            }
        } else {
            ctx.body = {
                code: netCode.BASICINFOERR
            }
        }
    } catch (error) {
        util.error(error);
    }
}