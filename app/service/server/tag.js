'use strict';

const Service = require('egg').Service;

class tagService extends Service {
  async list(queryParam) {
    const { ctx, app, ctx: { helper } } = this;
    const queryParams = Object.assign({
      attributes: [
        'id',
        'tag',
        'created_at',
        'updated_at' ],
    }, queryParam);
    try {
      const tag = await app.model.Tag.findAndCountAll(queryParams);
      return helper.success({
        message: 'ok',
        data: tag,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async listAll() {
    const { ctx, app, ctx: { helper } } = this;
    // const userId = ctx.state.iss;
    try {
      const tag = await app.model.Tag.findAll({
        attributes: [
          'id',
          'tag',
        ],
        // where: {
        //   user_id: userId,
        // },
        order: [[ 'created_at', 'desc' ]],
      });

      return helper.success({
        message: 'ok',
        tag,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async saveTag(params) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const result = await user.createTag(params);
      const { id, tag, created_at, updated_at } = result;
      return helper.success({
        message: '新建标签成功',
        data: {
          id, tag, created_at, updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async deleteTag({ id }) {
    // 删之前检查文章有没有对应的tag
    const { ctx, app, ctx: { helper } } = this;
    // const userId = ctx.state.iss;
    try {
      const tag = await app.model.Tag.findById(id);
      const result = await app.model.query( //  art.user_id = $userId and
        'SELECT count(art.id) as count FROM articles as art where find_in_set($labelId,tags)',
        { bind: { labelId: id }, // userId,
          type: app.Sequelize.QueryTypes.SELECT,
        });
      const count = result[0].count;
      if (parseInt(count, 10) === 0) {
        await tag.destroy();
        return helper.success('删除标签成功');
      }

      return helper.error('删除失败，文章中有对应的标签');

    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async editTag({ id, label }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const tag = await app.model.Tag.findById(id);
      const user_id = tag.user_id;
      if (user_id !== userId) {
        const user = await app.model.User.findById(userId);
        await tag.setUser(user);
      }
      tag.tag = label;
      const result = await tag.save();
      return helper.success({
        message: '修改标签成功',
        data: {
          id: result.id,
          tag: result.tag,
          created_at: result.created_at,
          updated_at: result.updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

}

module.exports = tagService;
