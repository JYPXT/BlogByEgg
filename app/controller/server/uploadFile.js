'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const Controller = require('egg').Controller;
const fs = require('fs');

class uploadFileController extends Controller {
  async upload() {
    const { ctx, app, ctx: { helper } } = this;
    try {
      // 支持一个上传文件，所有字段必须在文件后面， 文件不能为空
      // 另一个上传方式写在中间件formdata
      const stream = await ctx.getFileStream();
      const suffix = stream.filename.substr(stream.filename.lastIndexOf('.'));
      const name = `upload/${Date.now()}${suffix}`;
      const targetUrl = path.join('app/public/', name);
      const writeStream = fs.createWriteStream(targetUrl);
      // fields = stream.fields 字段
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        // 把流消费掉
        await sendToWormhole(stream);
        ctx.body = helper.error(err);
        throw err;
      }

      ctx.body = helper.success({
        message: '上传成功',
        imageUrl: `${app.config.static.prefix}${name}`,
      });

    } catch (error) {
      ctx.body = helper.error('文件错误，只能上传图片');
    }

  }
}

module.exports = uploadFileController;
