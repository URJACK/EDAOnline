const netCode = require('../../modules/code/index').transMissionCode;
console.log("Init service-util............");
const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
/**
 * 检查邮箱是否合法
 */
module.exports.emailCheck = function (email) {
    return emailReg.test(email);
}
/**
 * 检查基本信息中的数字字段是否合法
 */
module.exports.infoNumberCheck = function (number) {
    if (number == null || number < 0) {
        return false;
    }
    return true;
}
/**
 * 检查基本信息中的字符串字段是否合法
 */
module.exports.infoStringCheck = function (str) {
    if (str == null || str == "") {
        return false;
    }
    return true;
}
/**
 * 从上下文对象ctx中取得post数据
 */
module.exports.getPostData = function (ctx) {
    return ctx.request.body;
}
/**
 * 创建一个长度为 codeLength 纯数字的 token
 */
module.exports.createToken = function (codeLength) {
    let arr = new String();
    for (let i = 0; i < codeLength; ++i) {
        arr += Math.floor(Math.random() * 10);
    }
    return arr;
}
/**
 * Error处理流程
 */
module.exports.error = function (ctx, err) {
    console.log(err);
    ctx.body = {
        code: netCode.UNEXPECTEDERR
    }
}