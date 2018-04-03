'use strict';

const Controller = require('egg').Controller;

class articleController extends Controller {
  async list() {
    const { ctx, service, ctx: { helper } } = this;
    const queryParam = helper.queryParam(ctx.request.query);
    try {
      ctx.body = await service.frontend.article.list(queryParam);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async articleArchive () {
    const { ctx, service, ctx: { helper } } = this;
    const queryParam = helper.queryParam(ctx.request.query);
    try {
      ctx.body = await service.frontend.article.articleArchive(queryParam);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async getArticleById() {
    const { ctx, service, ctx: { helper } } = this;
    const id = ctx.request.query.id;
    try {
      const createRule = {
        id: { type: 'string', required: true },
      };
      ctx.validate(createRule, { id });
      ctx.body = await service.frontend.article.getArticleById(id);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('提交字段验证出错');
    }
  }

  async getArticleListByTag() {
    const { ctx, service, ctx: { helper } } = this;
    const id = ctx.request.query.id;
    try {
      const createRule = {
        id: { type: 'string', required: true },
      };
      ctx.validate(createRule, { id });
      ctx.body = await service.frontend.article.getArticleListByTag(id);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('标签不能为空');
    }
  }

  async searchArticle() {
    const { ctx, service, ctx: { helper } } = this;
    const condition = ctx.request.query.condition;
    try {
      const createRule = {
        condition: { type: 'string', required: true },
      };
      ctx.validate(createRule, { condition });
      ctx.body = await service.frontend.article.searchArticle(condition);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = helper.error('关键字不能为空');
    }
  }

}

module.exports = articleController;
