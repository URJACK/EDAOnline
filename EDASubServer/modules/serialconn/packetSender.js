class PacketSender {
    constructor() {
        this.hexCoder = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        this.powerCoder = [1, 2, 4, 8];
        this.FRAMELENGTH = 18;
        console.log("PacketSender has been created successfully.")
    }
    getChecker(sum) {
        let checker = "";
        let buffer = sum % 256;     //取得当前校验和取余的数值(unsigned char) 与 (int)在这里应该是等价的，因为后序位操作没有操作到符号位
        let nbuffer;
        let i;                      //i为循环右移的位数
        let halfByteValue;          //半字节的临时数值 例如"5A"中的"5"与"A"对应的16进制的数值（数值本身不是ASCII码，但我们在得出数值之后转成ASCII）

        halfByteValue = 0;
        for (i = 4; i < 8; ++i) {
            nbuffer = buffer >> i;
            halfByteValue += (nbuffer & 1) * (this.powerCoder[i - 4]);
        }
        checker += this.hexCoder[halfByteValue];       //校验码"5"的得出

        halfByteValue = 0;
        for (i = 0; i < 4; ++i) {
            nbuffer = buffer >> i;
            halfByteValue += (nbuffer & 1) * (this.powerCoder[i]);
        }
        checker += this.hexCoder[halfByteValue];       //校验码"A"的得出
        return checker;
    }
    /**
      * 创建一个帧
      * @param {number} frequencyValue 8位字符串类型
      * @param {string} switchValue 2位字符串类型
      * @param {string} modeValue 1位字符串类型
      * @param {number} analogValue 1位字符串类型
      */
    createFrame(frequencyValue, switchValue, modeValue, analogValue) {
        let frame = "";
        //创建帧头
        frame += '$';
        //设置频率变量
        frame += frequencyValue;
        //设置开关变量
        frame += switchValue;
        //设置模式变量
        frame += modeValue;
        //设置模拟变量
        frame += analogValue;
        //计算校验和
        let frameSum = 0;
        let i;
        for (i = 1; i < this.FRAMELENGTH - 3; ++i) {
            frameSum += frame[i].charCodeAt();
        }
        let checkSum = this.getChecker(frameSum);
        //设置校验和
        frame += checkSum;
        //设置帧尾
        frame += '*';
        return frame;
    }
}
module.exports = new PacketSender();