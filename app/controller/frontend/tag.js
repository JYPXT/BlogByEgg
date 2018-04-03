'use strict';

const Controller = require('egg').Controller;

class tagController extends Controller {

  async list() {
    const { ctx, service } = this;
    ctx.body = await service.frontend.tag.list();
  }

}

module.exports = tagController;
