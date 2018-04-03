'use strict';

const Service = require('egg').Service;

class categoryService extends Service {
  async list(queryParam) {
    const { ctx, app, ctx: { helper } } = this;
    const queryParams = Object.assign({
      attributes: [
        'id',
        'classification',
        'created_at',
        'updated_at' ],
    }, queryParam);
    try {

      const category = await app.model.Category.findAndCountAll(queryParams);
      return helper.success({
        message: 'ok',
        data: category,
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
      const category = await app.model.Category.findAll({
        attributes: [
          'id',
          'classification',
        ],
        // where: {
        //   user_id: userId,
        // },
        order: [[ 'created_at', 'desc' ]],
      });

      return helper.success({
        message: 'ok',
        category,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async saveCategory(params) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const result = await user.createCategory(params);
      const { id, classification, created_at, updated_at } = result;
      return helper.success({
        message: '新建分类成功',
        data: {
          id, classification, created_at, updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async deleteCategory({ id }) {
    const { ctx, app, ctx: { helper } } = this;
    try {
      const category = await app.model.Category.findById(id);
      await category.destroy();
      return helper.success({
        message: '删除分类成功',
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      return helper.error('查询错误');
    }
  }

  async editCategory({ id, classification }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const category = await app.model.Category.findById(id);
      const user_id = category.user_id;
      if (user_id !== userId) {
        const user = await app.model.User.findById(userId);
        await category.setUser(user);
      }
      category.classification = classification;
      const result = await category.save();
      return helper.success({
        message: '修改分类成功',
        data: {
          id: result.id,
          classification: result.classification,
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

module.exports = categoryService;
