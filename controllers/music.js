const musicModel = require('../models/music');
const path = require('path');

function upload(ctx) {
  // 接受所有的参数
  // console.log(ctx.request.files)
  // console.log(ctx.request.body)
  // 1.获取字符串数据
  let { title, singer, time } = ctx.request.body;
  // 2.获取文件->保存文件的网络路径（方便/public请求返回）
  let { file, filelrc } = ctx.request.files;

  let saveSingObj = {
    title,
    singer,
    time
  };
  // 2.5 歌词可选
  saveSingObj.filelrc = ''; // 没有歌词
  if (filelrc) {
    // 文件路径 文件名+后缀
    saveSingObj.filelrc = '/public/files/' + path.parse(filelrc.path).base;
  }

  if (!file) {
    ctx.throw('歌曲必须上传');
  }
  // 处理歌曲路径
  saveSingObj.file = '/public/files/' + path.parse(file.path).base;

  // 加入用户ID 未来用session
  saveSingObj.uid = 1;

  return saveSingObj;
}

module.exports = {
  async addMusic(ctx, next) {
    let saveSingObj = upload(ctx);
    // 3.插入数据到数据库
    let result = await musicModel.addMusicByObj(saveSingObj);
    // 4.响应结果给用户
    ctx.body = {
      code: '001',
      msg: result.message
    };
  },
  /**
   * 更新音乐
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  async updateMusic(ctx, next) {
    let saveSingObj = upload(ctx);
    let { id } = ctx.request.body;
    Object.assign(saveSingObj, { id });
    // 更新数据
    let result = await musicModel.updateMusic(saveSingObj);
    // update music set title=?, singer=?..
    // where id = ?
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: '002',
        msg: result.message
      };
      return;
    }
    ctx.body = {
      code: '001',
      msg: '更新成功'
    };
  },

  async deleteMusic(ctx, next) {
    // 接收id
    let id = ctx.request.query.id;
    let result = await musicModel.deleteMusicById(id);
    if (result.affectedRows === 0) {
      ctx.throw('删除失败：' + result.message);
      return;
    }
    ctx.body = {
      code: '001',
      msg: '删除成功'
    };
  },

  async showEdit(ctx, next) {
    let id = ctx.query.id;
    // 通过id查询音乐
    let musics = await musicModel.findMusicById(id);

    // 判断是否有音乐
    if (musics.length === 0) {
      // 异常 错误页面
      ctx.throw('歌曲不存在');
      return;
    }
    let music = musics[0];
    ctx.render('edit', {
      music,
      user: ctx.session.user
    });
  },

  // 首页
  async showIndex(ctx, next) {
    // 根据用户的 session 中ID查询
    let uid = ctx.session.user.id;
    // 根据id查询歌曲
    let musics = await musicModel.findMusicByUid(uid);

    ctx.render('index', {
      musics
    });
  },

  // 上传图片页面
  async showPicUpload(ctx, next) {
    ctx.render('upload');
  },
  // 上传图片地址
  async addPicture(ctx, next) {
    // 1.获取字符串数据
    let { picType } = ctx.request.body;
    let uid = ctx.session.user.id;
    // 2.获取文件->保存文件的网络路径（方便/public请求返回）
    let fileList = ctx.request.files;
    let fileLegth = Object.keys(fileList).length;
    let fileObjList = Object.values(fileList);

    if (fileLegth === 0) {
      ctx.throw('必须上传图片');
    }

    let dataLIst = []; //数据列表
    // 遍历文件列表
    fileObjList.forEach((item, index) => {
      dataLIst.push({
        picLink: '/public/files/' + path.parse(item.path).base,
        picType,
        uid,
        title: '1',
        content: '1',
        createTime: new Date().getTime()
      });
    });

    let data = await musicModel.addPicyByObj(dataLIst);
    console.log(data);
  }
};
