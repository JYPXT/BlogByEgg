'use strict';

const baseService = require('./baseService');

class articleService extends baseService {
  async list(queryParam) {
    const { ctx, app } = this;
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
      return this.success({
        successMessage: 'ok',
        data: article,
        tags,
      });
    } catch (err) {
      return this.error({
        errorMessage: '查询文章出错',
      });
    }
  }

  async getArticleById(articleId) {
    const { ctx, app } = this;
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

      return this.success({
        successMessage: 'ok',
        data,
      });
    } catch (err) {
      return this.error({
        errorMessage: '查询文章出错',
      });
    }
  }

  async saveArticle({ title, picture, content, tags, categoryId, accessRight }) {
    const { ctx, app } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const article = await user.createArticle({
        title, content, picture, tags, accessRight, browse: 0,
      });
      if (this.notEmpty(categoryId)) {
        const category = await app.model.Category.findById(categoryId);
        if (category) {
          article.setCategory(category);
        }
      }
      return this.success({
        successMessage: '保存文章成功',
      });
    } catch (err) {
      return this.error({
        errorMessage: '保存文章出错',
      });
    }
  }

  async editArticle({ id, title, picture, content, tags, categoryId, accessRight }) {
    const { ctx, app } = this;
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
      return this.success({
        successMessage: '修改文章成功',
      });
    } catch (err) {
      return this.error({
        errorMessage: '修改数据出错',
      });
    }
  }

  async deleteArticle({ id }) {
    const { app } = this;
    try {
      const article = await app.model.Article.findById(id);
      await article.destroy();
      return this.success({
        successMessage: '删除文章成功',
      });
    } catch (err) {
      return this.error({
        errorMessage: '删除文章出错',
      });
    }
  }

}

module.exports = articleService;
