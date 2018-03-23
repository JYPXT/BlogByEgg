'use strict';

const baseService = require('./baseService');

class tagService extends baseService {
  async list(queryParam) {
    const { ctx, app } = this;
    const queryParams = Object.assign({
      attributes: [
        'id',
        'tag',
        'created_at',
        'updated_at' ],
    }, queryParam);
    try {
      const tag = await app.model.Tag.findAndCountAll(queryParams);
      return this.success({
        successMessage: 'ok',
        data: tag,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async listAll() {
    const { ctx, app } = this;
    const userId = ctx.state.iss;
    try {
      const tag = await app.model.Tag.findAll({
        attributes: [
          'id',
          'tag',
        ],
        where: {
          user_id: userId,
        },
        order: [[ 'created_at', 'desc' ]],
      });

      return this.success({
        successMessage: 'ok',
        tag,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async saveTag(params) {
    const { ctx, app } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const result = await user.createTag(params);
      const { id, tag, created_at, updated_at } = result;
      return this.success({
        successMessage: '新建标签成功',
        data: {
          id, tag, created_at, updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async deleteTag({ id }) {
    // 没做多对多，删之前检查文章有没有对应的tag
    const { ctx, app } = this;
    const userId = ctx.state.iss;
    try {
      const tag = await app.model.Tag.findById(id);
      const result = await app.model.query(
        'SELECT count(art.id) FROM articles as art where art.user_id = $userId and  find_in_set($label,tags)',
        { bind: { userId, label: id },
          type: app.Sequelize.QueryTypes.SELECT,
        });
      const count = Object.values(result[0])[0];
      if (parseInt(count, 10) === 0) {
        await tag.destroy();
        return this.success({
          successMessage: '删除标签成功',
        });
      }

      return this.error({ errorMessage: '删除失败，文章中有对应的标签' });

    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async editTag({ id, label }) {
    const { ctx, app } = this;
    try {
      const tag = await app.model.Tag.findById(id);
      tag.tag = label;
      const result = await tag.save();
      return this.success({
        successMessage: '修改标签成功',
        data: {
          id: result.id,
          tag: result.tag,
          created_at: result.created_at,
          updated_at: result.updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

}

module.exports = tagService;
