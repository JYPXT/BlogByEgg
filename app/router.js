'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const formdata = middleware.formdata(); // 上传文件的中间件

  router.post('/api/admin/login', controller.server.admin.login);

  router.post('/api/user/getUserInfo', controller.server.user.getUserInfo);
  router.post('/api/user/editPassword', controller.server.user.editPassword);
  router.post('/api/user/editUserInfo', formdata, controller.server.user.editUserInfo);

  router.post('/api/article/list', controller.server.article.list);
  router.post('/api/article/getArticleById', controller.server.article.getArticleById);
  router.post('/api/article/saveArticle', formdata, controller.server.article.saveArticle);
  router.post('/api/article/editArticle', formdata, controller.server.article.editArticle);
  router.post('/api/article/deleteArticle', controller.server.article.deleteArticle);

  router.post('/api/category/list', controller.server.category.list);
  router.post('/api/category/listAll', controller.server.category.listAll);
  router.post('/api/category/saveCategory', controller.server.category.saveCategory);
  router.post('/api/category/deleteCategory', controller.server.category.deleteCategory);
  router.post('/api/category/editCategory', controller.server.category.editCategory);

  router.post('/api/tag/list', controller.server.tag.list);
  router.post('/api/tag/listAll', controller.server.tag.listAll);
  router.post('/api/tag/saveTag', controller.server.tag.saveTag);
  router.post('/api/tag/deleteTag', controller.server.tag.deleteTag);
  router.post('/api/tag/editTag', controller.server.tag.editTag);

  router.post('/api/uploadFile/upload', controller.server.uploadFile.upload);

  router.get('/apis/article/list', controller.frontend.article.list);
  router.get('/apis/article/getArticleById', controller.frontend.article.getArticleById);
  router.get('/apis/article/articleArchive', controller.frontend.article.articleArchive);
  router.get('/apis/article/searchArticle', controller.frontend.article.searchArticle);
  router.get('/apis/article/getArticleListByTag', controller.frontend.article.getArticleListByTag);
  router.get('/apis/tag/list', controller.frontend.tag.list);

};
