const router = require('koa-router')()
const ConnectController = require('../controller/connectcontroller/index');

router.prefix('/connect');

router.post('/code', async (ctx, next) => {
  await ConnectController.action_code(ctx, next);
})

module.exports = router;