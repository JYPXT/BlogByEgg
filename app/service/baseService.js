'use strict';

const Service = require('egg').Service;

class baseService extends Service {
  success(option = {}) {
    return Object.assign(this.app.config.result.success, option);
  }

  error(option = {}) {
    return Object.assign(this.app.config.result.error, option);
  }

  notEmpty(val) {
    // const { type } = option;
    // if ( type === 'object') {

    // }else {
    //   if (typeof val)
    // }

    if (val !== null && val !== '' && val !== undefined) {
      return true;
    }
    return false;
  }
}

module.exports = baseService;
