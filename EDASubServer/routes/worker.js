const router = require('koa-router')()
const WorkerController = require('../controller/worker/index');

router.prefix('/worker');

router.post('/status', async (ctx, next) => {
    await WorkerController.action_status(ctx, next);
})
router.post('/occupy', async (ctx, next) => {
    await WorkerController.action_occupy(ctx, next);
})
router.post('/notoccupy', async (ctx, next) => {
    await WorkerController.action_notoccupy(ctx, next);
})

module.exports = router