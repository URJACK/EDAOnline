const router = require('koa-router')()
const ConnectController = require('../controller/connect/index');

router.prefix('/connect');

router.post('/code', async (ctx, next) => {
    await ConnectController.action_code(ctx, next);
})
router.post('/ctrl', async (ctx, next) => {
    await ConnectController.action_ctrl(ctx, next);
})
router.post('/result', async (ctx, next) => {
    await ConnectController.action_result(ctx, next);
})

module.exports = router