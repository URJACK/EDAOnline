const Sequelize = require('sequelize');
const dbconfig = require('./config');
const sequelize = new Sequelize(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    port: dbconfig.port,
    dialect: dbconfig.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
class User extends Sequelize.Model { };
User.init({
    //登陆时使用的邮箱
    email: {
        type: Sequelize.STRING
    },
    //用户登陆显示的名称
    name: {
        type: Sequelize.STRING
    },
    //用户所注册的年级
    grade: {
        type: Sequelize.INTEGER
    },
    //用户所拥有的基本信息
    info: {
        type: Sequelize.TEXT
    },
    //用户的密码
    password: {
        type: Sequelize.STRING
    },
    //用户当前的状态
    status: {
        type: Sequelize.INTEGER
    },
    //用户验证码
    verifycode: {
        type: Sequelize.STRING
    },
    //用户获取验证码的时间
    verifytime: {
        type: Sequelize.DATE
    },
    //用户的级别
    level: {
        type: Sequelize.INTEGER
    }
}, { sequelize, modelName: 'user' });

class SubServer extends Sequelize.Model { };
SubServer.init({
    //子服务器的名字是独一无二的
    name: {
        type: Sequelize.STRING
    },
    //子服务器的位置所在地
    location: {
        type: Sequelize.STRING
    },
    //子服务器的介绍
    introduction: {
        type: Sequelize.TEXT,
    },
    //记录的IP地址
    address: {
        type: Sequelize.STRING
    },
    //HTTP 协议监听端口
    httpport: {
        type: Sequelize.INTEGER
    },
    //子服务器的令牌 与 name 属性构成合法可靠的访问
    token: {
        type: Sequelize.STRING
    },
    //当前子服务器是否被占用 默认是没有被占用
    status: {
        type: Sequelize.INTEGER,
    },
    //最近使用的用户的邮箱
    recentlyemail: {
        type: Sequelize.STRING,
    },
    //最近一次的使用时间
    recentlytime: {
        type: Sequelize.DATE
    }
}, { sequelize, modelName: 'subserver' });


//同步数据库
// sequelize.sync();

console.log("init Database Service............");
module.exports.User = User;
module.exports.SubServer = SubServer;