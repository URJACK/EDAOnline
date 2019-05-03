const packetCreater = require('./packetCreater');
const packetReceiver = require('./packetReceiver');
const packetSender = require('./packetSender');
const SerialPort = require('serialport');
const config = require('./config')

/**
 * 打开的与串口的通信接口
 */
let serialPort;
module.exports.packetCreater = packetCreater;
module.exports.packetReceiver = packetReceiver;

/**
 * 向单片机设置属性
 * @param {string} frequencyValue 
 * @param {string} switchValue 
 * @param {string} modeValue 
 * @param {string} analogValue 
 */
const setData = function (frequencyValue, switchValue, modeValue, analogValue) {
    try {
        //创建一个帧，并尝试放松给串口,send函数内部会书写差错检测
        let frame = packetCreater.createFrame(frequencyValue, switchValue, modeValue, analogValue);
        packetSender.send(frame);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports.setData = setData;

/**
 * 取得被测频率
 */
const getRecordedFrequency = function () {
    return packetReceiver.recordedFrequency;
}
module.exports.getRecordedFrequency = getRecordedFrequency;

/**
 * 取得记录的脉宽
 */
const getPulseWidth = function () {
    return packetReceiver.pulseWidth;
}
module.exports.getPulseWidth = getPulseWidth;

/**
 * 取得模拟电压这里模拟电压
 * @param {number} index 
 */
const getAnalogVoltage = function (index) {
    if (index < 0 || index >= config.analogVoltageNumbers) {
        throw new Error("尝试获取服务器模拟电压的下标不正确")
    } else {
        return packetReceiver.analogVoltage[index];
    }
}
module.exports.getAnalogVoltage = getAnalogVoltage;

/**
 * 取得开关状态
 */
const getSwitchStatus = function () {
    return packetReceiver.switchStatus;
}
module.exports.getSwitchStatus = getSwitchStatus;

/**
 * 取得输出模式
 */
const getOutputMode = function () {
    return packetReceiver.outputMode;
}
module.exports.getOutputMode = getOutputMode;

/**
 * 初始化串口状态
 */
const initSerialPort = function () {
    //Opening a Port
    serialPort = new SerialPort(config.serialPort, {
        //波特率，可在设备管理器中对应端口的属性中查看
        baudRate: config.baudRate,
        autoOpen: config.autoOpen
    })
    serialPort.open(function () {
        packetSender.setSerialPort(serialPort)
        console.log("serial Port 是否打开:" + serialPort.isOpen);
    })
    serialPort.on('data', function (data) {
        packetReceiver.inputNewString(data);
    })
    //错误监听
    serialPort.on('error', function (error) {
        console.log('Serial Listen Error: ' + error)
    })
}
module.exports.initSerialPort = initSerialPort;