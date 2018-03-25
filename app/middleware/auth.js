'use strict';

module.exports = () => {
  return async function auth(ctx, next) {

    const { helper } = ctx;
    const authorization = ctx.request.headers.authorization;
    if (!authorization) {
      ctx.body = helper.error('违法访问');
      return;
    }
    const code = ctx.app.jwt.decode(authorization, ctx.app.config.jwt.secret);
    if (!code) {
      ctx.body = helper.error('token错误');
      return;
    } else if (code.exp < Date.now()) {
      ctx.body = helper.error({
        code: '99',
        message: 'token过期，请重新登陆',
      });
      return;
    }
    // console.log(code.iss); 需不需要验证iss（id）的合法性
    ctx.state.iss = code.iss;
    await next();
  };
};
