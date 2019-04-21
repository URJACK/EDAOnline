const db = require('../../service/db/index');
const util = require('../../service/util/index');
const netCode = require('../../modules/code/index').transMissionCode;
const userStatusCode = require('../../modules/code/index').userStatusCode;
const userLevelCode = require('../../modules/code/index').userLevelCode;
const nodeModule = require('../../service/email/index');

console.log("Init ConnectController ...........");

module.exports.db = db;
module.exports.netCode = netCode;
module.exports.userStatusCode = userStatusCode;
module.exports.userLevelCode = userLevelCode;
module.exports.util = util;
module.exports.nodeModule = nodeModule;

const action_code = require('./code');
module.exports.action_code = action_code;