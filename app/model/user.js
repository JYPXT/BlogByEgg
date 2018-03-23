'use strict';
module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize; // CHAR
  const User = app.model.define('user', {
    id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    account: {
      type: STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING(128),
      allowNull: false,
    },
    nick: {
      type: STRING(20),
      allowNull: true,
    },
    desc: {
      type: STRING(512),
      allowNull: true,
    },
    desc_en: {
      type: STRING(512),
      allowNull: true,
    },
    email: {
      type: STRING(64),
      allowNull: true,
    },
    head_portrait: {
      type: STRING(255),
      allowNull: true,
    },
    backgroundImage: {
      type: STRING(255),
      allowNull: true,
    },
    isAdmin: {
      type: BOOLEAN,
      allowNull: true,
    },
    audit: {
      type: BOOLEAN,
      allowNull: true,
    },
  });

  User.associate = () => {
    app.model.User.hasMany(app.model.Article);// , { as: 'user', foreignKey: 'user_id' }
    app.model.User.hasMany(app.model.Category);
    app.model.User.hasMany(app.model.Tag);
  };
  return User;
};

