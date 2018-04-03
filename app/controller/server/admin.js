'use strict';

const Controller = require('egg').Controller;

class adminController extends Controller {
  async index() {
    // await this.ctx.render('index');
  }

  async login() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        account: { type: 'string', required: true },
        password: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.server.admin.login(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

}

module.exports = adminController;
