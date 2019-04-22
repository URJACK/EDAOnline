const config = require('./config');
class RootServerInfoRecorder {
    constructor() {
        this.rootServerIp = null;
        this.rootServerPort = null;
        this.rootServerToken = config.ROOTSERVERTOKEN;
    }
    setIp(ip) {
        this.rootServerIp = ip;
    }
    getIp() {
        return this.rootServerIp;
    }
    setPort(port) {
        this.rootServerPort = port;
    }
    getPort() {
        return this.rootServerPort;
    }
    getRootServerToken() {
        return this.rootServerToken;
    }
}
module.exports = new RootServerInfoRecorder();