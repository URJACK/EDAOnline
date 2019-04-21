const util = require('./index').util;
const netCode = require('./index').netCode;
const serverCode = require('./index').serverCode;
const userLevelCode = require('./index').userLevelCode;
const db = require('./index').db;

let countPerPage = 10;

function checkPageIndex(index) {
    if (index == null || index < 0) {
        return false;
    }
    return true;
}

function subserverDatabaseMapping(subServers) {
    let arr = [];
    for (let i = 0; i < subServers.length; i++) {
        let subServer = subServers[i];
        let mappingObject = {};
        mappingObject.name = subServer.name;
        mappingObject.location = subServer.location;
        mappingObject.introduction = subServer.introduction;
        mappingObject.httpport = subServer.httpport;
        mappingObject.address = subServer.address;
        arr.push(mappingObject);
    }
    return arr;
}

module.exports = async function (ctx, next) {
    let data = util.getPostData(ctx);
    try {
        let index = data.index;
        if (checkPageIndex(index)) {
            let subServers = await db.SubServer.findAll({
                limit: countPerPage,
                offset: countPerPage * index
            });
            subServers = subserverDatabaseMapping(subServers);
            ctx.body = {
                code: netCode.SUCCESS,
                subservers: subServers
            }
        } else {
            ctx.body = {
                code: netCode.QUERYPAGINGERR
            }
        }
    } catch (error) {
        util.error(ctx, error);
    }
}