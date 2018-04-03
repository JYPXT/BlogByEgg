'use strict';

const Service = require('egg').Service;

class adminService extends Service {
  async login({ account, password }) {
    const { ctx, app, ctx: { helper } } = this;
    try {
      const user = await app.model.User.findOne({
        where: {
          account,
          password: helper.crypto(password),
        },
      });

      if (!user) {
        return helper.error('账号或密码错误');
      }
      const { id, nick, desc, avatar, background } = user;
      const token = await this.getToken(ctx, id);
      return helper.success({
        message: '登陆成功',
        data: { nick, desc, avatar, background },
        token,
      });
    } catch (error) {
      return helper.error('查询错误');
    }
  }

  async getToken(ctx, key) {
    const options = {
        iss: key,
        exp: Date.now() + ctx.app.config.jwt.expires,
      },
      secret = ctx.app.config.jwt.secret;

    return ctx.app.jwt.sign(options, secret);
  }

}

module.exports = adminService;
