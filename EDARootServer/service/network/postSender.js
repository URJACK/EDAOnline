const http = require("http");
const querystring = require("querystring");
class PostSender {
    sendJson(address, port, path, data, callback) {
        let postData = querystring.stringify(data);
        console.log("<debug><postsender><sendjson>");
        console.log(address);
        console.log(port);
        console.log(path);
        console.log(data);
        let options = {
            hostname: address,
            port: port,
            path: path,
            method: "POST",
            headers: {
                "Connection": "keep-alive",
                "Content-Length": postData.length,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
        let req = http.request(options, function (res) {
            res.on("data", callback);
        });

        req.on("error", function (err) {
            console.log(err.message);
        })
        req.write(postData);
        req.end();
    }
    sendFile(address, port, uploadPath, filePath, callback) {
        var http = require('http');
        var fs = require('fs');

        var boundaryKey = new Date().getTime()//Math.random().toString(16); //创建随机切割标识字

        var options = {
            hostname: address,
            port: port,
            path: uploadPath,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----' + boundaryKey,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
            }
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.on('data', callback);
            res.on('end', function () {
                console.log('res end');
            });
        });

        var payload = '\r\n------' + boundaryKey + '\r\n' +
            'Content-Disposition: form-data; name="file"; filename="test.docx"\r\n' +
            'Content-Type: image/png\r\n\r\n';
        var enddata = '\r\n------' + boundaryKey + '--';

        var fileStream = fs.readFileSync(filePath);
        req.setHeader('Content-Length', Buffer.byteLength(payload) + Buffer.byteLength(enddata) + fs.statSync("./test.docx").size);
        req.write(payload);
        req.write(fileStream);
        req.end(enddata);
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

    }
}
module.exports = new PostSender();