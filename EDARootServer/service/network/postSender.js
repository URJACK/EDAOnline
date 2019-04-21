const http = require("http");
const querystring = require("querystring");
class PostSender {
    sendJson(address, port, path, data, callback) {
        let postData = querystring.stringify(data);
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
}
module.exports = new PostSender();