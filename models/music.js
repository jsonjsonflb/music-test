const db = require('./db');

module.exports = {
  addMusicByObj: async sing =>
    await db.q(
      'insert into musics (title, singer, time, filelrc, file, uid) values (?,?,?,?,?,?)',
      Object.values(sing)
    ),
  updateMusic: async music =>
    await db.q(
      'update musics set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?',
      Object.values(music)
    ),
  deleteMusicById: async id =>
    await db.q('delete from musics where id = ?', [id]),
  findMusicById: async id =>
    await db.q('select * from musics where id = ?', [id]),
  findMusicByUid: async id =>
    await db.q('select * from musics where uid = ?', [id]),
  addPicyByObj: async list => {
    var sql = '';
    let flag = '';
    for (let i = 0; i < list.length; i++) {
      flag = await db.q(
        'insert into photo (picLink, picType, uid, title, content, createTime) values (?,?,?,?,?,?)',
        Object.values(list[i])
      );
    }
    return flag;
  },
  findPictureById: async (obj) =>{
    let sql='select * from photo where uid = ? '
    if(obj['picType']) {
      sql+='and picType = ?'
    }
    return await db.q(sql,Object.values(obj))
  }
};
