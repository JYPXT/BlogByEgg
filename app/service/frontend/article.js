'use strict';

const Service = require('egg').Service;

class articleService extends Service {
  async list(queryParam) {
    const { ctx, app, ctx: { helper } } = this;
    const queryParams = Object.assign(queryParam, {
      include: {
        model: app.model.User,
        attributes: [
          'nick', 'avatar',
        ],
      },
      attributes: [
        'id', 'picture', 'title', 'content',
        'tags', 'browse', 'created_at', 'updated_at' 
        ],
      where: {
	    accessRight: 1,
	  },
    });
    try {

      const article = await app.model.Article.findAndCountAll(queryParams);

      return helper.success({
        message: 'ok',
        data: article,
      });
    } catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }
  // 归档
  async articleArchive( queryParam ) {
  	const { ctx, app, ctx: { helper } } = this;
  	const queryParams = Object.assign(queryParam, {
  	  attributes: [
        'id', 'title', 'created_at',
      ],
      where: {
	    accessRight: 1,
	  },
  	})
  	try {
  		// 查月份 并且统计
  		const date = await app.model.query(
	    'SELECT count(id) as count, DATE_FORMAT(created_at,"%Y/%m") month FROM articles WHERE articles.accessRight = 1 GROUP BY month ORDER BY articles.created_at DESC',
	    { type: app.Sequelize.QueryTypes.SELECT,});

  		const data = await app.model.Article.findAll(queryParams);

        return helper.success({
	        message: 'success',
	        date,
	        data,
	    });
  	} catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }



  async getArticleById(articleId) {
    const { ctx, app, ctx: { helper } } = this;
    try {
      const data = await app.model.Article.findOne({
        // include: [
        //   {
        //     model: app.model.User,
        //     attributes: [
        //       'nick', 'avatar',
        //     ],
        //   },
        //   {
        //     model: app.model.Category,
        //     attributes: [
        //       'classification',
        //     ],
        //   },
        // ],
        attributes: [
          'id', 'picture', 'title', 'content', 'tags',
          'browse',
        ],
        where: {
          id: articleId,
          accessRight: 1,
        },
      });
      if (!helper.notEmpty(data)) {
      	return helper.error({
	        message: '找不到这个文章'
	    });
      }
      const tags = [];
      if (helper.notEmpty(data.tags)){
      	const articletTags = `${data.tags},`;
      	const tag = await app.model.Tag.findAll();
		tag.forEach(o => {
		if (articletTags.includes(`${o.id},`)) {
		  tags.push({
		    id: o.id,
		    tag: o.tag,
		  });
		}
		});
      }

      return helper.success({
        message: 'ok',
        data,
        tags,
      });
    } catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }

  async getArticleListByTag(id) {
  	const { ctx, app, ctx: { helper } } = this;
  	try {
  		const data = await app.model.query(
        'select art.id, art.title, art.created_at from articles as art where find_in_set($labelId,art.tags) and art.accessRight = 1',
        { bind: { labelId: id },
          type: app.Sequelize.QueryTypes.SELECT,
        });
        return helper.success({
	        message: 'success',
	        data,
	    });
  	} catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }

  async searchArticle(condition) {
  	const { ctx, app, ctx: { helper } } = this;
  	try {
  		const data = await app.model.Article.findAll({
  		  attributes: [
	        'id', 'title', 'created_at',
	      ],
	      where: {
	        '$or': [
	        {
	          title: {
	            '$like': `%${condition}%`
	          },
	        },
	        {
	          content: {
	            '$like': `%${condition}%`
	          }
	        }
	        ],
	        accessRight: 1,
	      }
		})
        return helper.success({
	        message: 'success',
	        data,
	    });
  	} catch (err) {
      ctx.logger.error(new Error(err));
      return helper.error('查询错误');
    }
  }
  
}

module.exports = articleService;
