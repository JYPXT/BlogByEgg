'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:4200', 'http://localhost:9999' ],
  };
  console.log(appInfo);

  return config;
};
