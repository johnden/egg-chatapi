'use strict';

const { Controller } = require('egg');
require('dotenv').config();

const conversation = {
  // accesstoken: 'string',
  message: 'string',
  conversationId: { type: 'string', required: false },
};

class ChatController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, chat';
  }

  async chat() {
    const { ctx } = this;
    ctx.validate(conversation, ctx.request.body);
    // To use ESM in CommonJS, you can use a dynamic import
    const { ChatGPTAPI } = await import('chatgpt');
    const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await api.sendMessage(ctx.request.body.message);
    console.log(res.text);
    ctx.body = res.text;
    ctx.status = 201;
  }
}

module.exports = ChatController;
