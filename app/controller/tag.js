'use strict';

const baseController = require('./baseController');

class tagController extends baseController {
  async list() {
    const { ctx, service } = this;
    try {
      const createRule = {
        condition: { type: 'object' },
        pageSize: { type: 'number', required: true },
        pageIndex: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      const queryParam = this.queryParam(ctx.request.body);
      ctx.body = await service.tag.list(queryParam);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async listAll() {
    const { ctx, service } = this;
    ctx.body = await service.tag.listAll();
  }

  async saveTag() {
    const { ctx, service } = this;
    try {
      const tag = ctx.request.body.label;
      const createRule = {
        label: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.saveTag({ tag });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async deleteTag() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.deleteTag(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async editTag() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
        label: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.tag.editTag(ctx.request.body);
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }
}

module.exports = tagController;
