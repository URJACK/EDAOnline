const transMissionCode = require('./transmissionCode');
const userStatusCode = require('./userStatusCode');
class Code {
    constructor() {
        this.transMissionCode = transMissionCode;
        this.userStatusCode = userStatusCode;
    }
}
module.exports = new Code();