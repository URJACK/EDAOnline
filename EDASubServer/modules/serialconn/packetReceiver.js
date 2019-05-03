class PacketReceiver {
    constructor() {
        //一共 59 B  除开帧头帧尾一共 55 B
        //帧头为$$ 帧头 2 B
        //帧尾为** 帧尾 2 B

        /**
         * 设置最大限制字段，超过会导致缓存清空
         * */
        this.MAXFRAMELENGTH = 70;

        /**
         * 被测频率 10 B
         */
        this.recordedFrequency = "0";
        /**
         * 脉宽 10 B
         *  */
        this.pulseWidth = "0";
        /**
         * 发生频率 10 B
         *  */
        this.happendFrequency = "0";
        /**
         * 模拟电压 20 B  (5 B)一份，一共四份
         *  */
        this.analogVoltage = ["0", "0", "0", "0"];
        /**
         * 开关状态 2 B
         *  */
        this.switchStatus = "0";
        /**
         * 输出模式 1 B
         *  */
        this.outputMode = "0";
        /**
         * 校验和 2 B
         *  */
        this.checkSum = "0"
        /**
         * 缓存字串
         *  */
        this.bufferStr = "";
        /**
         * 是否读取的标记
         *  */
        this.readingFlag = false;
        console.log("PacketReceiver has been created successfully.")
    }
    /**
     * PacketReceiver外部调用接口
     * 
     * 通过这个接口不断的读取从串口收到的数据
     */
    inputNewString(str) {
        //如果是正确的状态
        if (this.readingFlag) {
            workNewString(str)
        }
        //如果是还没有打开的情况就是在其请求readingFlag
        else {
            let beginpos = str.indexOf("$$");
            if (beginpos != -1) {
                this.readingFlag = true;
                //这里初次传入的帧是跳过了帧头的
                workNewString(str.substring(beginpos + 2, str.length - 1))
            }
        }
    }
    /**
     * 从读取的帧中去取得对应的内容
     * @param {string} frame 传入的数据帧 10 + 10 + 10 + 20 + 2 + 1 + 2 
     */
    getDataFromFrame(frame) {
        this.recordedFrequency = frame.substring(0, 10);
        this.pulseWidth = frame.substring(10, 20);
        this.happendFrequency = frame.substring(20, 30);
        this.analogVoltage[0] = frame.substring(30, 35);
        this.analogVoltage[1] = frame.substring(35, 40);
        this.analogVoltage[2] = frame.substring(40, 45);
        this.analogVoltage[3] = frame.substring(45, 50);
        this.switchStatus = frame.substring(50, 52);
        this.outputMode = frame.substring(52, 53);
        this.checkSum = frame.substring(53, 55);
        console.log("<Debug> 已经接受成功帧");
    }
    /**
     * 将字符串内容传入缓存数组中进行数据的录入
     * @param {string} str 被传入的字符串内容
     */
    workNewString(str) {
        this.bufferStr += str;
        let endpos = this.bufferStr.indexOf("**");
        //如果发现了结束标记
        if (endpos != -1) {
            //取得帧字串，帧头在外部被跳过了
            let frameStr = this.bufferStr.substring(0, endpos);
            this.bufferStr = "";
            this.readingFlag = false;

        }
        //如果没有发现结束标记
        else {
            if (this.bufferStr.length > this.MAXFRAMELENGTH) {
                //缓存字串被清零
                this.bufferStr = "";
                //阅读标记改为尚未进行阅读
                this.readingFlag = false;
            }
        }
    }
}
module.exports = new PacketReceiver();