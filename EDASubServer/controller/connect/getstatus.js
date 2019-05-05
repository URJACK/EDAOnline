const ServerInfoModule = require('./index').ServerInfoModule;
const networkModule = require('./index').networkModule;
const util = require('./index').util;
const netCode = require('./index').netCode;
const codeDownloadModule = require('./index').codeDownloadModule;

module.exports = async function (ctx, next) {
    try {
        let info = ServerInfoModule.getCompilerInfo();
        ctx.body = {
            code: netCode.SUCCESS,
            info: info
        }
    } catch (error) {
        if (error.message != "nosuit") {
            util.error(error);
        } else {
            ctx.body = {
                code: netCode.SUBSERVERLOSTCONNECTION
            }
        }
    }
}