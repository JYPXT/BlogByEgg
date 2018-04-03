'use strict';

const Controller = require('egg').Controller;

class categoryController extends Controller {
  async list() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        condition: { type: 'object' },
        pageSize: { type: 'number', required: true },
        pageIndex: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      const queryParam = helper.queryParam(ctx.request.body);
      ctx.body = await service.server.category.list(queryParam);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async listAll() {
    const { ctx, service } = this;
    ctx.body = await service.server.category.listAll();
  }

  async saveCategory() {
    const { ctx, service, ctx: { helper } } = this;
    const { classification } = ctx.request.body;
    try {
      const createRule = {
        classification: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.server.category.saveCategory({ classification });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async deleteCategory() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.server.category.deleteCategory(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async editCategory() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
        classification: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.server.category.editCategory(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }
}

module.exports = categoryController;
