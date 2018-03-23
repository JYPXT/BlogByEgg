'use strict';

const Controller = require('egg').Controller;

class baseController extends Controller {
  // 写在框架拓展里吧
  success(option = {}) {
    return Object.assign(this.app.config.result.success, option);
  }

  error(option = {}) {
    return Object.assign(this.app.config.result.error, option);
  }

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
  }
}

module.exports = baseController;
