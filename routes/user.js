const Router = require('koa-router');
let userRouter = new Router();
let userControllers = require('../controllers/user')


userRouter.get('/user/register', userControllers.showRegister)
    .post('/user/check-username', userControllers.checkUsername)
    .post('/user/do-register', userControllers.doRegister)
    .post('/user/do-login', userControllers.doLogin)
    .get('/user/get-pic', userControllers.getPic)
    .get('/user/logout', userControllers.logout)
    .get('/login', async ctx => {
        ctx.render('login')
    })
    .get('/index', async ctx => {
        ctx.render('index')
    })
    .get('/register', async ctx => {
        ctx.render('register')
    })
    .get('/home', async ctx => {
        ctx.render('home')
    });

module.exports = userRouter;
