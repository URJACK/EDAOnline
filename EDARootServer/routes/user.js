const router = require('koa-router')()
const UserController = require('../controller/usercontroller/index');

router.prefix('/user');

router.get('/', function (ctx, next) {
  if (ctx.session.id != null) {
    ctx.session.id = ctx.session.id + 1;
    ctx.body = ctx.session.id;
  } else {
    ctx.session.id = 1;
    ctx.body = "Init";
  }
})

router.post('/login', async (ctx, next) => {
  await UserController.action_login(ctx, next);
})
router.post('/signupemail', async (ctx, next) => {
  await UserController.action_signupemail(ctx, next);
})
router.post('/signupverify', async (ctx, next) => {
  await UserController.action_signupverify(ctx, next);
})
router.post('/signupinfo', async (ctx, next) => {
  await UserController.action_signupinfo(ctx, next);
})
router.post('/modifyinfo', async (ctx, next) => {
  await UserController.action_modifyinfo(ctx, next);
})

module.exports = router;