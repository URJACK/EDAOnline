const transMissionCode = require('./transmissionCode');
const userStatusCode = require('./userStatusCode');
const subserverStatusCode = require('./subserverStatusCode');
const userLevelCode = require('./userLevelCode');
class Code {
    constructor() {
        this.transMissionCode = transMissionCode;
        this.userStatusCode = userStatusCode;
        this.subserverStatusCode = subserverStatusCode;
        this.userLevelCode = userLevelCode;
    }
}
module.exports = new Code();