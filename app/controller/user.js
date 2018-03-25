'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {

  async editPassword() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        orderPassword: { type: 'string', required: true },
        password: { type: 'string', required: true },
        confirmPassword: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const user = await service.user.editPassword(ctx.request.body);
      ctx.body = user;
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async editUserInfo() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        nick: { type: 'string', required: true },
        // desc: { type: 'string' },
        email: { type: 'email', required: true },
        // backgroundImage: { type: 'string' },
        // avatar
      };
      ctx.validate(createRule);
      const user = await service.user.editPassword(ctx.request.body);
      ctx.body = user;
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

}

module.exports = userController;
