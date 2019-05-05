const ServerInfoModule = require('./index').ServerInfoModule;
const networkModule = require('./index').networkModule;
const util = require('./index').util;
const netCode = require('./index').netCode;
const codeDownloadModule = require('./index').codeDownloadModule;

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let info = data.info;
        console.log("正在设置编译信息.....");
        ServerInfoModule.setCompilerInfo(info);
        console.log("......设置编译信息成功");
        ctx.body = {
            code: netCode.SUCCESS
        }
    } catch (err) {
        util.error(err);
    }
}