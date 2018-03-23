'use strict';
module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Tag = app.model.define('tag', {
    id: {
      type: INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
    },
    tag: {
      type: STRING(64),
      allowNull: true,
    },
  });

  Tag.associate = () => {
    app.model.Tag.belongsTo(app.model.User);
  };

  return Tag;
};

