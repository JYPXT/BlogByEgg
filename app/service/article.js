'use strict';

const Service = require('egg').Service;

class articleService extends Service {
  async list(queryParam) {
    const { ctx, app, ctx: { helper } } = this;
    const queryParams = Object.assign({
      include: {
        model: app.model.Category,
        attributes: [
          'id',
          'classification',
        ],
      },
      attributes: [
        'id',
        'picture',
        'title',
        'content',
        'tags',
        'browse',
        'created_at',
        'updated_at' ],
    }, queryParam);
    try {
      const article = await app.model.Article.findAndCountAll(queryParams);
      const userId = ctx.state.iss;
      const tags = await app.model.Tag.findAll({
        attributes: [ 'id', 'tag' ],
        where: {
          user_id: userId,
        },
      });
      return helper.success({
        message: 'ok',
        data: article,
        tags,
      });
    } catch (err) {
      return helper.error('查询错误');
    }
  }

  async getArticleById(articleId) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const data = await app.model.Article.findOne({
        attributes: [
          'id', 'picture', 'title', 'content', 'tags',
          'browse', 'category_id', 'accessRight',
        ],
        where: {
          id: articleId,
          user_id: userId,
        },
      });

      return helper.success({
        message: 'ok',
        data,
      });
    } catch (err) {
      return helper.error('查询错误');
    }
  }

  async saveArticle({ title, picture, content, tags, categoryId, accessRight }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const article = await user.createArticle({
        title, content, picture, tags, accessRight, browse: 0,
      });
      if (helper.notEmpty(categoryId)) {
        const category = await app.model.Category.findById(categoryId);
        if (category) {
          article.setCategory(category);
        }
      }
      return helper.success('保存文章成功');
    } catch (err) {
      return helper.error('查询错误');
    }
  }

  async editArticle({ id, title, picture, content, tags, categoryId, accessRight }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const article = await app.model.Article.findOne({
        where: {
          id,
          user_id: userId,
        },
      });
      article.id = id;
      article.title = title;
      article.picture = picture;
      article.content = content;
      article.tags = tags;
      article.categoryId = categoryId;
      article.accessRight = accessRight;
      await article.save();
      return helper.success('修改文章成功');
    } catch (err) {
      return helper.error('查询错误');
    }
  }

  async deleteArticle({ id }) {
    const { app, ctx: { helper } } = this;
    try {
      const article = await app.model.Article.findById(id);
      await article.destroy();
      return helper.success('删除文章成功');
    } catch (err) {
      return helper.error('查询错误');
    }
  }

}

module.exports = articleService;
