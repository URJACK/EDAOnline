class PacketSender {
    constructor() {
        console.log("Serial Port Sender has been created without serialPort Object ....")
        /**
         * 串口通信对象
         */
        this.serialPort = null;
    }
    /**
     * 发送数据帧给串口
     * @param {string} data 被发送的帧
     */
    send(data) {
        let item = Buffer.from(data, "ascii");
        if (this.serialPort != null && this.serialPort.isOpen) {
            this.serialPort.write(item, function (error, result) {
                if (error) {
                    throw new Error("Serial Port Write Error")
                    console.log(error);
                }
            })
        } else {
            throw new Error("Serial Port is not available");
        }
    }
    /**
     * 设置串口通信对象
     * @param {object} serialPort 
     */
    setSerialPort(serialPort) {
        // 串口发送器已经成功设置通信对象
        console.log("串口发送器已经成功设置通信对象......");
        this.serialPort = serialPort;
    }
}
module.exports = new PacketSender();