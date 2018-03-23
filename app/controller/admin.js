'use strict';

const baseController = require('./baseController');

class adminController extends baseController {
  async index(ctx) {
    const { app } = this;
    // console.log(this.app.baseDir);
    // console.log(this.app.config.sequelize);
    // console.log(this.app.Sequelize);
    const result = await app.model.query(
      'SELECT count(art.id) FROM articles as art where art.user_id = 1 and  find_in_set($label,tags)',
      { bind: { label: 4 },
        type: app.Sequelize.QueryTypes.SELECT,
      });
    console.log(Object.values(result[0])[0])
    ctx.body = { result: result[0] };
  }

  async login() {
    const { ctx, service } = this;
    try {
      const createRule = {
        account: { type: 'string', required: true },
        password: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const user = await service.admin.login(ctx.request.body);
      this.ctx.body = user;
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: error });
    }
  }

}

module.exports = adminController;
