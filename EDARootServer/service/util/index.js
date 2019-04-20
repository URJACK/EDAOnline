let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

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