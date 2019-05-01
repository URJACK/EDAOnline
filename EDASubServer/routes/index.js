const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('debug');
})

module.exports = router
