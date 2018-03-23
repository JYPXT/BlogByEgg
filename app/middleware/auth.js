'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const authorization = ctx.request.headers.authorization;
    if (!authorization) {
      ctx.body = Object.assign(ctx.app.config.result.error, {
        errorMessage: '违法访问',
      });
      return;
    }
    const code = ctx.app.jwt.decode(authorization, ctx.app.config.jwt.secret);
    if (!code) {
      ctx.body = Object.assign(ctx.app.config.result.error, {
        errorMessage: 'token错误',
      });
      return;
    } else if (code.exp < Date.now()) {
      ctx.body = Object.assign(ctx.app.config.result.error, {
        code: '99',
        errorMessage: 'token过期，请重新登陆',
      });
      return;
    }
    // console.log(code.iss); 需不需要验证iss（id）的合法性
    ctx.state.iss = code.iss;
    await next();
  };
};
