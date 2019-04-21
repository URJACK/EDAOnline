const postSender = require('./postSender');
class NetWork {
    constructor() {
        this.sendPostJson = postSender.sendJson;
    }
}
module.exports = new NetWork();