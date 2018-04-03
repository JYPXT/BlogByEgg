'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class articleService extends Service {
  async list(queryParam) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
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
    }, queryParam,
    { where: {
      user_id: userId,
    },
    });
    try {
      const article = await app.model.Article.findAndCountAll(queryParams);
      const tags = await app.model.Tag.findAll({
        attributes: [ 'id', 'tag' ],
        // where: {
        //   user_id: userId,
        // },
      });
      return helper.success({
        message: 'ok',
        data: article,
        tags,
      });
    } catch (err) {
      ctx.logger.error(new Error(err));
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
      ctx.logger.error(new Error(err));
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
          await article.setCategory(category);
        }
      }
      return helper.success('保存文章成功');
    } catch (err) {
      ctx.logger.error(new Error(err));
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
      const oldPicture = article.picture,
        oldCategoryId = article.category_id;
      article.id = id;
      article.title = title;
      if (helper.notEmpty(picture)) {
        article.picture = picture;
      }
      article.content = content;
      article.tags = tags;
      article.accessRight = accessRight;
      if (oldCategoryId !== categoryId) {
        const category = await app.model.Category.findById(categoryId);
        await article.setCategory(category);
      }
      await article.save();
      try {
        if (helper.notEmpty(oldPicture) && helper.notEmpty(picture)) {
          await fs.unlinkSync(path.join('app/public/', oldPicture));
        }
      } catch (error) {
        return helper.success('修改文章成功,但是删除旧图片失败');
      }
      return helper.success('修改文章成功');
    } catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }

  async deleteArticle({ id }) {
    const { app, ctx, ctx: { helper } } = this;
    try {
      const article = await app.model.Article.findById(id);
      const picture = article.picture;
      await article.destroy();
      try {
        if (helper.notEmpty(picture)) {
          await fs.unlinkSync(path.join('app/public/', picture));
        }
      } catch (error) {
        return helper.success('删除文章成功,但是删除旧图片失败');
      }
      return helper.success('删除文章成功');
    } catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }

}

module.exports = articleService;
