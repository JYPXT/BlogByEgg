'use strict';

module.exports = () => {
  return async function auth(ctx, next) {

    const { helper } = ctx;
    const authorization = ctx.request.get('authorization');
    if (!authorization) {
      ctx.body = helper.error('违法访问');
      return;
    }
    const code = ctx.app.jwt.decode(authorization, ctx.app.config.jwt.secret);
    if (!code || !helper.notEmpty(code.iss)) {
      ctx.body = helper.error({
        code: '99',
        message: 'token错误',
      });
      return;
    } else if (code.exp < Date.now()) {
      ctx.body = helper.error({
        code: '99',
        message: 'token过期，请重新登陆',
      });
      return;
    }

    ctx.state.iss = code.iss;
    await next();
  };
};
