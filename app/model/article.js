'use strict';
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Article = app.model.define('article', {
    id: {
      type: INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      // unique: true,
    },
    picture: {
      type: STRING(255),
      allowNull: true,
    },
    title: {
      type: STRING(255),
      allowNull: false,
    },
    content: {
      type: STRING(4096),
      allowNull: false,
    },
    tags: {
      type: STRING(128),
      allowNull: true,
    },
    browse: {
      type: INTEGER(11),
      allowNull: true,
    },
    accessRight: {
      type: INTEGER(2),
      allowNull: true,
    },
  });

  Article.associate = () => {
    app.model.Article.belongsTo(app.model.User);
    app.model.Article.belongsTo(app.model.Category);
  };

  return Article;
};

