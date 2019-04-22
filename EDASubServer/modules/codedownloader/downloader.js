const config = require('./config');
const cp = require("child_process");
class Downloader {
    constructor() {

    }
    download() {
        let PATHSOF = config.PATHSOF;
        let COMMAND_PGM = `quartus_pgm -m jtag -c USB-Blaster[USB-0] -o ${PATHSOF} \n`;
        buffer = cp.execSync(COMMAND_PGM);
    }
}
module.exports = new Downloader();