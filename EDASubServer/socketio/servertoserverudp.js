const config = require('./config');
module.exports = function (server) {
    server.on('error', (err) => {
        console.log(`服务器异常：\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`Udp Listen At : ${address.address}:${address.port}`);
    });

    server.bind(config.UDPLISTEN);
}