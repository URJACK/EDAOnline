class TransmissionCode {
    constructor() {
        this.SUCCESS = 200;
        this.MAILNOTEXIST = 301;
        this.MAILEXIST = 302;
        this.PASSWORDNOTRIGHT = 303;
        this.VERIFYINGERR = 304;
        this.BASICINFOERR = 305;
        this.QUERYPAGINGERR = 306;
        this.SUBSERVEROCCCUPIED = 307;
        this.YOUHAVEOCCUPIEDSUBSERVER = 308;
        this.SUBSERVERNAMENOTUNIQUE = 309;
        this.SUBSERVERNOTEXIST = 310;
        this.TOKENERR = 311;
        this.PORTCONFIGERR = 312;
        this.SUBSERVERLOSTCONNECTION = 313;
        this.NOTREGIST = 314;
        this.NOLEVEL = 315;
        this.UNEXPECTEDERR = 399;
    }

}
module.exports = new TransmissionCode();