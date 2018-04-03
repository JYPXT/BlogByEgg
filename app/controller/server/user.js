'use strict';

const Controller = require('egg').Controller;

class userController extends Controller {
  async getUserInfo() {
    const { ctx, service } = this;
    ctx.body = await service.server.user.getUserInfo();
  }

  async editPassword() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        oldPassword: { type: 'string', required: true },
        newPassword: { type: 'string', required: true },
        confirmPassword: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const { oldPassword, newPassword, confirmPassword } = ctx.request.body;
      if (newPassword !== confirmPassword) {
        ctx.body = helper.error('2次输入的密码不一样');
        return;
      };
      ctx.body = await service.server.user.editPassword({ oldPassword, newPassword });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async editUserInfo() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const formdataBody = ctx.state.formdataBody;
      const createRule = {
        nick: { type: 'string', required: true },
        desc: { type: 'string' },
        domain: { type: 'string', required: true },
      };
      ctx.validate(createRule, formdataBody);
      ctx.body = await service.server.user.editUserInfo(formdataBody);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

}

module.exports = userController;
