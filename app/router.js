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
};
