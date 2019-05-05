const ServerInfoModule = require('../../modules/serverinfo/index');
const util = require('../../service/util/index');
const networkModule = require('../../service/network/index');
const netCode = require('../../modules/code/index').transMissionCode;
const codeDownloadModule = require('../../modules/codedownloader/index');
const serialConn = require('../../modules/serialconn/index');

module.exports.ServerInfoModule = ServerInfoModule;
module.exports.util = util;
module.exports.networkModule = networkModule;
module.exports.netCode = netCode;
module.exports.codeDownloadModule = codeDownloadModule;
module.exports.serialConn = serialConn;

const action_code = require('./code');
module.exports.action_code = action_code;
const action_ctrl = require('./ctrl');
module.exports.action_ctrl = action_ctrl;
const action_result = require('./result');
module.exports.action_result = action_result;
const action_getstatus = require('./getstatus');
module.exports.action_getstatus = action_getstatus;
const action_setstatus = require('./setstatus');
module.exports.action_setstatus = action_setstatus;