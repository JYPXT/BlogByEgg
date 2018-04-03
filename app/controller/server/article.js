'use strict';

const Controller = require('egg').Controller;

class articleController extends Controller {
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
      ctx.body = await service.server.article.list(queryParam);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async getArticleById() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const id = ctx.request.body.id;
      ctx.body = await service.server.article.getArticleById(id);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async saveArticle() {
    const { ctx, service, ctx: { helper } } = this;
    const formdataBody = ctx.state.formdataBody;
    try {
      const createRule = {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        accessRight: { type: 'string', required: true },
      };
      ctx.validate(createRule, formdataBody);
      ctx.body = await service.server.article.saveArticle(formdataBody);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async editArticle() {
    const { ctx, service, ctx: { helper } } = this;
    const formdataBody = ctx.state.formdataBody;
    try {
      const createRule = {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        accessRight: { type: 'string', required: true },
      };
      ctx.validate(createRule, formdataBody);
      ctx.body = await service.server.article.editArticle(formdataBody);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async deleteArticle() {
    const { ctx, service, ctx: { helper } } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.server.article.deleteArticle(ctx.request.body);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

}

module.exports = articleController;
