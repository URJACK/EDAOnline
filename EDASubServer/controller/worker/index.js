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

const action_status = require('./status');
module.exports.action_status = action_status;
const action_occupy = require('./occupy');
module.exports.action_occupy = action_occupy;
const action_notoccupy = require('./notoccupy');
module.exports.action_notoccupy = action_notoccupy;