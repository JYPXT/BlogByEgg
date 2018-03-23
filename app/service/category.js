'use strict';

const baseService = require('./baseService');

class categoryService extends baseService {
  async list(queryParam) {
    const { ctx, app } = this;
    const queryParams = Object.assign({
      attributes: [
        'id',
        'classification',
        'created_at',
        'updated_at' ],
    }, queryParam);
    try {

      const category = await app.model.Category.findAndCountAll(queryParams);
      return this.success({
        successMessage: 'ok',
        data: category,
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
      const category = await app.model.Category.findAll({
        attributes: [
          'id',
          'classification',
        ],
        where: {
          user_id: userId,
        },
        order: [[ 'created_at', 'desc' ]],
      });

      return this.success({
        successMessage: 'ok',
        category,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async saveCategory(params) {
    const { ctx, app } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const result = await user.createCategory(params);
      const { id, classification, created_at, updated_at } = result;
      return this.success({
        successMessage: '新建分类成功',
        data: {
          id, classification, created_at, updated_at,
        },
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async deleteCategory({ id }) {
    const { ctx, app } = this;
    try {
      const category = await app.model.Category.findById(id);
      await category.destroy();
      return this.success({
        successMessage: '删除分类成功',
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '查询错误' });
    }
  }

  async editCategory({ id, classification }) {
    const { ctx, app } = this;
    try {
      const category = await app.model.Category.findById(id);
      category.classification = classification;
      const result = await category.save();
      return this.success({
        successMessage: '修改分类成功',
        data: {
          id: result.id,
          classification: result.classification,
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

module.exports = categoryService;
