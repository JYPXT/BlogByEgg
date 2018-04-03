'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class userService extends Service {
  async getUserInfo() {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findOne({
        attributes: [
          'nick',
          'desc',
          'domain',
          'avatar',
          'background',
        ],
        where: {
          id: userId,
        },
      });
      return helper.success({
        message: 'ok',
        data: user,
      });
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('数据出错');
    }
  }

  async editPassword({ oldPassword, newPassword }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findOne({
        where: {
          id: userId,
          password: helper.crypto(oldPassword),
        },
      });
      if (user) {
        user.password = helper.crypto(newPassword);
        user.save();
        return helper.success('修改成功');
      }
      return helper.error('旧密码错误');
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('数据出错');
    }
  }

  async editUserInfo({ nick, desc, avatar, background, domain }) {
    const { ctx, app, ctx: { helper } } = this;
    const userId = ctx.state.iss;
    try {
      const user = await app.model.User.findById(userId);
      const oldAvatar = user.avatar,
        oldBackground = user.background;
      user.nick = nick;
      user.desc = desc;
      user.domain = domain;
      if (helper.notEmpty(avatar)) {
        user.avatar = avatar;
      }
      if (helper.notEmpty(background)) {
        user.background = background;
      }
      await user.save();
      try {
        if (helper.notEmpty(oldAvatar) && helper.notEmpty(avatar)) {
          await fs.unlinkSync(path.join('app/public/', oldAvatar));
        }
        if (helper.notEmpty(oldBackground) && helper.notEmpty(background)) {
          await fs.unlinkSync(path.join('app/public/', oldBackground));
        }
      } catch (error) {
        return helper.success('修改成功,但是删除旧图片失败');
      }
      return helper.success('修改成功');
    } catch (error) {
      ctx.logger.error(new Error(error));
      ctx.body = helper.error('数据出错');
    }
  }
}

module.exports = userService;
