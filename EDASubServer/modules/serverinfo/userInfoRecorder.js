class UserInfoRecorder {
    constructor() {
        this.userEmail = null;
        this.userName = null;
        this.userGrade = null;
        this.userInfo = null;
    }
    setUserInfo(data) {
        this.userEmail = data.email;
        this.userName = data.name;
        this.userGrade = data.grade;
        this.userInfo = data.userinfo;
    }
    getUserInfo() {
        return {
            email: this.userEmail,
            name: this.userName,
            grade: this.userGrade,
            info: this.userinfo
        }
    }
}
module.exports = new UserInfoRecorder();