const router = require('koa-router')()
const ConnectController = require('../controller/connect/index');
const netCode = require('../modules/code/index').transMissionCode;
const downloadConfig = require('../modules/codedownloader/config');

const multer = require('koa-multer');//加载koa-multer模块
//文件上传
//配置
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, downloadConfig.PATHJIC)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({ storage: storage });

router.prefix('/connect');

router.post('/code', async (ctx, next) => {
    await ConnectController.action_code(ctx, next);
})
router.post('/ctrl', async (ctx, next) => {
    await ConnectController.action_ctrl(ctx, next);
})
router.post('/getstatus', async (ctx, next) => {
    await ConnectController.action_getstatus(ctx, next);
})
router.post('/setstatus', async (ctx, next) => {
    await ConnectController.action_setstatus(ctx, next);
})
//路由
router.post('/result', upload.single('file'), async (ctx, next) => {
    console.log("已经接收到来自服务器的文件")
    ctx.body = {
        code: netCode.SUCCESS
    }
})

module.exports = router