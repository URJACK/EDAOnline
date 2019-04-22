const config = require('./config');
class ServerInfoRecorder {
    constructor() {
        this.serverName = config.SERVERNAME
        this.serverToken = config.SERVERTOKEN
    }

}
module.exports = new ServerInfoRecorder();