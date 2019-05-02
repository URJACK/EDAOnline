const db = require('../../service/db/index');
const util = require('../../service/util/index');
const netCode = require('../../modules/code/index').transMissionCode;
const userStatusCode = require('../../modules/code/index').userStatusCode;
const userLevelCode = require('../../modules/code/index').userLevelCode;
const nodeModule = require('../../service/email/index');

console.log("Init UserController ...........");


module.exports.db = db;
module.exports.netCode = netCode;
module.exports.userStatusCode = userStatusCode;
module.exports.userLevelCode = userLevelCode;
module.exports.util = util;
module.exports.nodeModule = nodeModule;


const action_login = require('./login');
module.exports.action_login = action_login;
const action_signupemail = require('./signupemail');
module.exports.action_signupemail = action_signupemail;
const action_signupverify = require('./signupverify');
module.exports.action_signupverify = action_signupverify;;
const action_signupinfo = require('./signupinfo');
module.exports.action_signupinfo = action_signupinfo;
const action_modifyinfo = require('./modifyinfo');
module.exports.action_modifyinfo = action_modifyinfo;
const action_info = require('./info');
module.exports.action_info = action_info;