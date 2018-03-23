'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const baseController = require('./baseController');
const fs = require('fs');

class uploadFileController extends baseController {
  async upload() {
    const { ctx, app } = this;
    try {
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
        ctx.body = this.error({ errorMessage: err });
        throw err;
      }

      ctx.body = this.success({
        successMessage: '上传成功',
        imageUrl: `${app.config.static.prefix}${name}`,
      });

    } catch (error) {
      ctx.body = this.error({ errorMessage: '文件错误，只能上传图片' });
    }

  }
}

module.exports = uploadFileController;
