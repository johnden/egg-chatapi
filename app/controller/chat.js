"use strict";

const { Controller } = require("egg");
require("dotenv").config();

const conversation = {
  // accesstoken: 'string',
  message: "string",
  conversationId: { type: "string", required: false },
};

class ChatController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, chat";
  }

  async chat() {
    const { ctx } = this;
    ctx.validate(conversation, ctx.request.body);
    // To use ESM in CommonJS, you can use a dynamic import
    const { ChatGPTAPI } = await import("chatgpt");
    const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await api.sendMessage(ctx.request.body.message, {
      conversationId: ctx.request.body.conversationId,
      parentMessageId: ctx.request.body.parentMessageId
    });
    ctx.body = {
      id: res.id,
      message: res.text,
      conversationId: res.conversationId,
      parentMessageId: res.parentMessageId,
    };
    ctx.status = 200;
  }

  async getChat() {
    const { ctx } = this;
    console.log(ctx);
    // To use ESM in CommonJS, you can use a dynamic import
    const { ChatGPTAPI } = await import("chatgpt");
    const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });
    const res = await api.sendMessage(ctx.query.message);
    console.log(res.text);
    ctx.body = res.text;
    ctx.status = 200;
  }
}

module.exports = ChatController;
