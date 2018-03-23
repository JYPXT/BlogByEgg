'use strict';

const baseController = require('./baseController');

class categoryController extends baseController {
  async list() {
    const { ctx, service } = this;
    // const { pageSize, pageIndex, condition } = ctx.request.body;
    try {
      const createRule = {
        condition: { type: 'object' },
        pageSize: { type: 'number', required: true },
        pageIndex: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      const queryParam = this.queryParam(ctx.request.body);
      ctx.body = await service.category.list(queryParam);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async listAll() {
    const { ctx, service } = this;
    ctx.body = await service.category.listAll();
  }

  async saveCategory() {
    const { ctx, service } = this;
    const { classification } = ctx.request.body;
    try {
      const createRule = {
        classification: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.category.saveCategory({ classification });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async deleteCategory() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.category.deleteCategory(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async editCategory() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
        classification: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.category.editCategory(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }
}

module.exports = categoryController;
