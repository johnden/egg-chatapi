'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getchat', controller.chat.getChat);
  router.post('/chat', controller.chat.chat);
  // router.post('/chat', controller.chat.chat);

  app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*"); // 允许任意域名
    // 或者 ctx.set("Access-Control-Allow-Origin", "http://example.com"); // 允许指定域名
    await next();
  });
};
