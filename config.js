const path = require('path'); // 核心对象

module.exports = {
    secretToken: 'secretToken',
    staticDir: path.resolve('./public'),
    viewDir: path.join(__dirname, 'views'),
    uploadDir: path.resolve('./public/files'),
    appPort: 8888,
    dbConfig: {
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : 'Js123456.',
        database        : 'node_music'
    }
}
