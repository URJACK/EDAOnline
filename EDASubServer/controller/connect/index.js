const ServerInfoModule = require('../../modules/serverinfo/index');
const util = require('../../service/util/index');
const networkModule = require('../../service/network/index');
const netCode = require('../../modules/code/index').transMissionCode;
const codeDownloadModule = require('../../modules/codedownloader/index');

module.exports.ServerInfoModule = ServerInfoModule;
module.exports.util = util;
module.exports.networkModule = networkModule;
module.exports.netCode = netCode;
module.exports.codeDownloadModule = codeDownloadModule;

const action_code = require('./code');
module.exports.action_code = action_code;
const action_ctrl = require('./ctrl');
module.exports.action_ctrl = action_ctrl;
const action_result = require('./result');
module.exports.action_result = action_result;