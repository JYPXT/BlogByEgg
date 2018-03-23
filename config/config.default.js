'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521423914693_9924';

  // add your config here
  config.middleware = [ 'auth' ];
  config.auth = {
    ignore: '/admin',
    // ignore: /\/admin|\/upload/,
  };

  // 静态文件夹
  config.static = {
    prefix: '/static/',
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
    database: 'blogs',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'a123456',
  };

  // cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:4200', 'http://localhost:7777' ],
  };

  // {string|Function} origin: '*',
  // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  // config.cors = {
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };

  config.jwt = {
    secret: '135792468',
    enable: false,
    expires: 60 * 60 * 1000,
  };

  // pwd加密的叠加字符串
  config.shaSecret = '#13579';

  config.result = {
    success: {
      status: 'success',
      code: '1',
      successMessage: '',
    },
    error: {
      status: 'error',
      code: '0',
      errorMessage: '',
    },
  };

  return config;
};
