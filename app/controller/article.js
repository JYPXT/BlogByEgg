'use strict';

const baseController = require('./baseController');

class articleController extends baseController {
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
      ctx.body = await service.article.list(queryParam);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async getArticleById() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'string', required: true },
      };
      ctx.validate(createRule);
      const id = ctx.request.body.id;
      ctx.body = await service.article.getArticleById(id);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async saveArticle() {
    const { ctx, service } = this;
    try {
      const createRule = {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        accessRight: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.article.saveArticle(ctx.request.body);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async editArticle() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'string', required: true }, // 页面的id 从url上获取的
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
        accessRight: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.article.editArticle(ctx.request.body);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

  async deleteArticle() {
    const { ctx, service } = this;
    try {
      const createRule = {
        id: { type: 'number', required: true },
      };
      ctx.validate(createRule);
      ctx.body = await service.article.deleteArticle(ctx.request.body);
    } catch (err) {
      ctx.logger.warn(new Error(err));
      ctx.body = this.error({ errorMessage: '提交的字段有错误' });
    }
  }

}

module.exports = articleController;
