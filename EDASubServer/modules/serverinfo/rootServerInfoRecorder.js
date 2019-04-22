class RootServerInfoRecorder {
    constructor() {
        this.rootServerIp = null;
        this.rootServerPort = null;
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
}
module.exports = new RootServerInfoRecorder();