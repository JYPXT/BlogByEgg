'use strict';

const baseService = require('./baseService');
const crypto = require('crypto');

class adminService extends baseService {
  async login({ account, password }) {
    const { ctx, app } = this;
    const user = await app.model.User.findOne({
      where: {
        account,
        password: this.crypto(password),
      },
    });

    if (!user) {
      return this.error({
        errorMessage: '账号或密码错误',
      });
    }
    const { id, nick, desc, portrait, background } = user;
    const token = await this.getToken(ctx, id);
    return this.success({
      successMessage: '登陆成功',
      data: {
        nick,
        desc,
        portrait,
        background,
        token,
      },
    });
  }

  async getToken(ctx, key) {
    const options = {
        iss: key,
        exp: Date.now() + ctx.app.config.jwt.expires,
      },
      secret = ctx.app.config.jwt.secret;

    return ctx.app.jwt.sign(options, secret);
  }

  crypto(str, type = 'sha256') {
    return crypto.createHash(type).update(str + this.app.config.shaSecret).digest('hex');
  }
}

module.exports = adminService;
