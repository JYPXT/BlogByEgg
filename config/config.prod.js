'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // cors
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  console.log(appInfo);

  return config;
};
