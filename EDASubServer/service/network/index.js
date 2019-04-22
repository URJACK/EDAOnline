const postSender = require('./postSender');
console.log("NetWork Service .........")
class NetWork {
    constructor() {
        this.sendPostJson = postSender.sendJson;
        this.sendPostFile = postSender.sendFile;
    }
}
module.exports = new NetWork();