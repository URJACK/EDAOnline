const router = require('koa-router')()
const WorkerController = require('../controller/workercontroller/index');

router.prefix('/worker');

router.post('/add', async (ctx, next) => {
  await WorkerController.action_add(ctx, next);
})
router.post('/delete', async (ctx, next) => {
  await WorkerController.action_delete(ctx, next);
})
router.post('/info', async (ctx, next) => {
  await WorkerController.action_info(ctx, next);
})
router.post('/link', async (ctx, next) => {
  await WorkerController.action_link(ctx, next);
})
router.post('/notoccupy', async (ctx, next) => {
  await WorkerController.action_notoccupy(ctx, next);
})
router.post('/resettoken', async (ctx, next) => {
  await WorkerController.action_resettoken(ctx, next);
})
router.post('/modify', async (ctx, next) => {
  await WorkerController.action_modify(ctx, next);
})

module.exports = router;