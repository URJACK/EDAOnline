const config = require('./config');
const serverStatusCode = require('../code/index').subserverStatusCode;
class ServerInfoRecorder {
    constructor() {
        this.serverName = config.SERVERNAME
        this.serverToken = config.SERVERTOKEN
        this.serverStatus = serverStatusCode.FREE;
    }
    freeStatus() {
        this.serverStatus = serverStatusCode.FREE;
    }
    usingStatus() {
        this.serverStatus = serverStatusCode.USING;
    }
}
module.exports = new ServerInfoRecorder();