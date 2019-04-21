const db = require('../../service/db/index');
const util = require('../../service/util/index');
const netCode = require('../../modules/code/index').transMissionCode;
const userLevelCode = require("../../modules/code/index").userLevelCode;
const serverCode = require('../../modules/code/index').subserverStatusCode;

console.log("init workercontroller.............");

module.exports.db = db;
module.exports.util = util;
module.exports.netCode = netCode;
module.exports.serverCode = serverCode;
module.exports.userLevelCode = userLevelCode;

const action_add = require('./add');
module.exports.action_add = action_add;
const action_delete = require('./delete');
module.exports.action_delete = action_delete;
const action_resettoken = require('./resettoken');
module.exports.action_resettoken = action_resettoken;
const action_link = require('./link');
module.exports.action_link = action_link;
const action_notoccupy = require('./notoccupy');
module.exports.action_notoccupy = action_notoccupy;
const action_info = require('./info');
module.exports.action_info = action_info;