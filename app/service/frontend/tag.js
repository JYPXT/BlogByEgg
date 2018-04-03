'use strict';

const Service = require('egg').Service;

class tagService extends Service {

  async list() {
    const { ctx, app, ctx: { helper } } = this;
    try {
      // const tag = await app.model.Tag.findAll({
      //   attributes: [
      //     'id',
      //     'tag',
      //   ],
      //   order: [[ 'created_at', 'desc' ]],
      // });

      const tag = await app.model.query(
        `SELECT
          count(art.id) AS count,
          t.id,
          t.tag
        FROM
          tags AS t
        LEFT JOIN articles AS art ON find_in_set(t.id, art.tags)
        WHERE
          art.accessRight = 1
        GROUP BY
          t.id
        ORDER BY
          t.created_at DESC`,
      { type: app.Sequelize.QueryTypes.SELECT,});

      return helper.success({
        message: 'ok',
        tag,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

}

module.exports = tagService;
