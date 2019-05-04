
/**
 * 应用启动
 */
const startApplication = function () {
    console.log("Applictaion is going to start....");
    require("../modules/serialconn/index").initSerialPort();
    require("../modules/serverinfo/index").setRootServerIp("192.168.1.105");
    require("../modules/serverinfo/index").setRootServerPort(80);
}
module.exports = startApplication;