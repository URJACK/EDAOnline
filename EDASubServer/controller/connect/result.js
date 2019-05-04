const ServerInfoModule = require('./index').ServerInfoModule;
const networkModule = require('./index').networkModule;
const util = require('./index').util;
const netCode = require('./index').netCode;
const codeDownloadModule = require('./index').codeDownloadModule;

module.exports = async function (ctx, next) {
    try {
        codeDownloadModule.download();
        
    } catch (error) {
        util.error(error);
    }
}