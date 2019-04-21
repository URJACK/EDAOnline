/**
 * quartus编译器
 * 用来编译quartus的一个类
 */
const cp = require('child_process');
const fs = require('fs');
const config = require('./config');
class QuartusCompiler {
    /**
     * 生成quartus编译器
     * @param {*编译前缀}
     * @param {*编译后缀}
     * @param {*控制命令发送器}
     */
    constructor(preFix, postFix) {
        this.prefix = preFix;
        this.postFix = postFix;
        this.pathcode = config.PATH_CODE;
        this.pathconf = config.PATH_PROJCONF;
        this.pathproj = config.PATH_PROJECT;
        this.pathsof = config.PATH_SOF;
        this.nameproj = config.NAME_PROJECT;
    }
    /**
     * 设置引脚们
     * @param {*引脚} pin 
     */
    setPins(pins) {
        this.pins = "";
        for (let key in pins) {
            let pinNum = pins[key];
            let str = `set_location_assignment PIN_${pinNum} -to ${key}\n`;
            this.pins += str;
        }
    }
    /**
     * 设置被编译的代码
     * @param {*需要被编译的代码} code 
     */
    setCode(code) {
        this.code = code;
    }
    /**
     * 预编译 根据自己的 pins 与 compile
     */
    preCompile() {
        console.log("start preCompile............");
        let PATHCODE = this.pathcode;
        let PATHCONF = this.pathconf;
        console.log("Writing Code File......");
        fs.writeFileSync(PATHCODE, this.code);
        console.log("Writing Program Config ....")
        fs.writeFileSync(PATHCONF, this.prefix + this.pins + this.postFix);
        console.log("preCompile finished");
    }
    /**
     * 执行编译 大量函数是同步执行的
     */
    compile() {
        console.log("start compile...........");
        let PATHPROJ = this.pathproj;
        let NAMEPROJ = this.nameproj;
        let COMMAND_MAP = `quartus_map --read_settings_files=on --write_settings_files=off ${PATHPROJ} -c ${NAMEPROJ}\n`;
        let COMMAND_FIT = `quartus_fit --read_settings_files=off --write_settings_files=off ${PATHPROJ} -c ${NAMEPROJ}\n`;
        let COMMAND_ASM = `quartus_asm --read_settings_files=off --write_settings_files=off ${PATHPROJ} -c ${NAMEPROJ}\n`;
        let COMMAND_STA = `quartus_sta ${PATHPROJ} -c ${NAMEPROJ}\n`;
        cp.execSync(COMMAND_MAP);
        cp.execSync(COMMAND_FIT);
        cp.execSync(COMMAND_ASM);
        cp.execSync(COMMAND_STA);
        console.log("compile finished");
    }
    /**
     * 执行下载
     */
    download() {
        let PATHSOF = this.pathsof;
        let COMMAND_PGM = `quartus_pgm -m jtag -c USB-Blaster[USB-0] -o ${PATHSOF} \n`;
        buffer = cp.execSync(COMMAND_PGM);
    }
}
module.exports = new QuartusCompiler(config.COMPILE_PREFIX, config.COMPILE_POSTFIX);