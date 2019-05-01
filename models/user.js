const db = require('./db');

module.exports = {
    getUsers: async () => await db.q('select * from users',[]),
    findUsername: async username => await db.q('select 1 from users where username = ?', username),
    registerUser: async (...user) => await db.q(
          'insert into users (username,password,email) values (?,?,?)', user),
    findUserDataByUsername: async username => await db.q('select * from users where username = ?', username),
}