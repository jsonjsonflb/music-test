const Router = require('koa-router');
let musicRouter = new Router();
const musicController = require('../controllers/music')

  // 添加的请求行为在restful中，更好的请求规则
  // 要求添加 => post
musicRouter
.post('/music/add-music',musicController.addMusic)
.put('/music/update-music',musicController.updateMusic)
.delete('/music/del-music',musicController.deleteMusic)
.get('/music/index', musicController.showIndex)
.get('/music/add', async ctx => {
    ctx.render('add')
})
.get('/music/edit', musicController.showEdit)

module.exports = musicRouter;