'use strict';

const crypto = require('crypto');

module.exports = {

  success(message) {
    let result = {
      status: 'success',
      message: '',
    };
    if (typeof message === 'string') {
      result.message = message;
    } else {
      result = Object.assign(result, message);
    }
    return result;
  },

  error(message) {
    let result = {
      status: 'error',
      message: '',
    };
    if (typeof message === 'string') {
      result.message = message;
    } else {
      result = Object.assign(result, message);
    }
    return result;
  },

  /**
   * @param {order} [
   * 不填默认created_at 倒序,
   * 填字符串 created_at order,
   * 填数组 [排序字段，正倒序]]
   */

  queryParam({ pageSize, pageIndex, condition, order }) {
    const { ctx } = this;
    const userId = ctx.state.iss;
    let result = {
      where: {
        user_id: userId,
      },
      limit: pageSize,
      offset: pageSize * (pageIndex - 1),
    };

    if (JSON.stringify(condition) !== '{}' && Object.prototype.toString.call(condition) === '[object Object]') {
      result.where = Object.assign(result.where, condition);
    }
    if (!order) {
      result = Object.assign(result, {
        order: [[ 'created_at', 'desc' ]],
      });
    } else {
      if (typeof order === 'string') {
        result = Object.assign(result, {
          order: [[ 'created_at', order ]],
        });
      } else if (Object.prototype.toString.call(order) === '[object Array]') {
        result = Object.assign(result, {
          order: [ order ],
        });
      }
    }
    return result;
  },

  notEmpty(val) {
    // const { type } = option;
    // if ( type === 'object') {

    // }else {
    //   if (typeof val === type)
    // }

    if (val !== null && val !== '' && val !== undefined) {
      return true;
    }
    return false;
  },

  crypto(str, type = 'sha256') {
    return crypto.createHash(type).update(str + this.app.config.shaSecret).digest('hex');
  },
};
