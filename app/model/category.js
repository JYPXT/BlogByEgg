'use strict';
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Category = app.model.define('category', {
    id: {
      type: INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    classification: {
      type: STRING(64),
      allowNull: true,
    },
  });

  Category.associate = () => {
    app.model.Category.belongsTo(app.model.User);
    app.model.Category.hasMany(app.model.Article);
  };

  return Category;
};

