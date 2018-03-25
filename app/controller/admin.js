'use strict';

const Controller = require('egg').Controller;

class adminController extends Controller {
  async index() {
    // const { app, ctx, ctx: { helper } } = this;
    // // console.log(ctx);
    // // console.log(app.config);
    // helper.pxttest();
    // console.log(ctx.response);
    this.ctx.body = { result: 'msg' };
  }

  async login() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        account: { type: 'string', required: true },
        password: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const user = await service.admin.login(ctx.request.body);
      ctx.body = user;
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

}

module.exports = adminController;
