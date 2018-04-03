'use strict';

const path = require('path');

const resolves = (appInfo, value) => {
  return path.join(appInfo.baseDir, value);
};

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521423914693_9924';

  // add your config here
  config.middleware = [ 'auth' ];
  config.auth = {
    ignore: /\/admin|^\/$|^\/apis\//,
  };

  // cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ ],
  };

  // 静态文件夹
  config.static = {
    prefix: '/',
    dir: [ resolves(appInfo, 'app/public') ],
    maxAge: 86400,
  };

  config.multipart = {
    whitelist: [
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
    ],
    // fileSize: '1mb',
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'blog',
    host: 'localhost',
    port: '3306',
    username: '',
    password: '',
  };

  config.jwt = {
    secret: '135792468',
    enable: false,
    expires: 60 * 60 * 1000,
  };

  return config;
};
