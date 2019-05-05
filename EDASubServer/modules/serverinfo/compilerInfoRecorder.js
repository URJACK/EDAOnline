class CompilerInfoRecorder {
    constructor() {
        this.complierStatus = false;
        this.compilerInfo = "";
    }
    setComplierInfo(info) {
        this.complierStatus = true;
        this.compilerInfo = info;
    }
    getCompilerInfo() {
        this.complierStatus = false;
        return this.compilerInfo;
    }
}
module.exports = new CompilerInfoRecorder();