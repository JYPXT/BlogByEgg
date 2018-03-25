'use strict';

const Controller = require('egg').Controller;

class tagController extends Controller {
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
      ctx.body = await service.tag.list(queryParam);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async listAll() {
    const { ctx, service } = this;
    ctx.body = await service.tag.listAll();
  }

  async saveTag() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const tag = ctx.request.body.label;
      const createRule = {
        label: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.saveTag({ tag });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async deleteTag() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.deleteTag(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async editTag() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
        label: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.editTag(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('提交字段验证出错');
    }
  }
}

module.exports = tagController;
