
/**
 * 应用启动
 */
const startApplication = function () {
    console.log("Applictaion is going to start....");
    require("../modules/serialconn/index").initSerialPort();
}
module.exports = startApplication;