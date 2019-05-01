const db = require('./db');

module.exports = {
  addMusicByObj: async (sing) =>await db.q(
    'insert into musics (title, singer, time, filelrc, file, uid) values (?,?,?,?,?,?)', Object.values(sing)
  ),
  updateMusic: async (music)=> await db.q('update musics set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?', Object.values(music)),
  deleteMusicById:async (id)=> await db.q('delete from musics where id = ?', [id]),
  findMusicById:async (id)=> await db.q('select * from musics where id = ?', [id]),
  findMusicByUid:async (id)=> await db.q('select * from musics where uid = ?', [id]),
}