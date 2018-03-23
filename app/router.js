'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin', controller.admin.index);
  router.post('/admin/login', controller.admin.login);
  router.post('/article/list', controller.article.list);
  router.post('/article/getArticleById', controller.article.getArticleById);
  router.post('/article/saveArticle', controller.article.saveArticle);
  router.post('/article/editArticle', controller.article.editArticle);
  router.post('/article/deleteArticle', controller.article.deleteArticle);

  router.post('/category/list', controller.category.list);
  router.post('/category/listAll', controller.category.listAll);
  router.post('/category/saveCategory', controller.category.saveCategory);
  router.post('/category/deleteCategory', controller.category.deleteCategory);
  router.post('/category/editCategory', controller.category.editCategory);

  router.post('/tag/list', controller.tag.list);
  router.post('/tag/listAll', controller.tag.listAll);
  router.post('/tag/saveTag', controller.tag.saveTag);
  router.post('/tag/deleteTag', controller.tag.deleteTag);
  router.post('/tag/editTag', controller.tag.editTag);

  router.post('/uploadFile/upload', controller.uploadFile.upload);
};
