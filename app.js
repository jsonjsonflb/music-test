const Koa = require('koa');
const convert = require('koa-convert');

// const bodyParser = require('koa-bodyparser')

// 引入router
const musicRouter = require('./routes/music');
const userRouter = require('./routes/user');

const formidable = require('koa-formidable');
// 引入session,登录状态
const session = require('koa-session');

// 创建服务器
let app = new Koa();

let {appPort, viewDir, staticDir, uploadDir } = require('./config');


// 开服务器
app.listen(appPort, ()=>{
    console.log(`端口 ${appPort}`)
});


// 模板渲染
const render = require('koa-art-template');
render(app, {
    // 开发的配置 debug: true ,不压缩混淆/实时读取文件(静态文件实时更新)
    root: viewDir,
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});


// 中间件使用列表
// 优雅的异常处理
let error = require('./middleware/error');
app.use(error())

// 重写URL
let rewriteUrl = require('./middleware/rewriteUrl');
app.use(rewriteUrl([
  {regex:/\/abc/,dist:'/index'},
  {regex:/\/public(.*)/,dist:null }, // dist:null 则使用.*  /public的内容
  {src:'/',dist:'/index'}
]));

// 验证token
let check = require('./middleware/checkToken')
app.use(check)

// 处理静态资源
// 只有public能对外响应文件
// 把public下的资源向外暴露，可以直接http://127.0.0.1:8888/img/a.png访问，public路径多余。所以需要重写url
app.use(require('koa-static')(staticDir));

// 处理session
let store = {
  storage: {},
  set(key, session) {
    this.storage[key] = session
  },
  get(key) {
    return this.storage[key]
  },
  destroy(key) {
    delete this.storage[key]
  }
}
app.keys = ['test'];// 基于test字符串进行签名的运算，为的是保证数据不被篡改，相当于传递数据的保镖
app.use(convert(session({store: store},app)));
// 必须在每次请求挂载新的数据与视图的桥梁 (在session之后)
app.use(async (ctx, next)=>{
  ctx.state.user = ctx.session.user;
  // 最终都放行
  await next()
})


// 处理请求,ctx.request.body
// app.use(bodyParser()); // 只能处理字符串
// 处理文件及字符串
app.use(convert(formidable({
  // 设置上传目录，否则在用户的temp目录下
  uploadDir:uploadDir,
  // 默认根据文件算法生成hash字符串（文件名），无后缀
  keepExtensions:true
})));

// 装载路由
app.use(musicRouter.routes());
app.use(userRouter.routes());
// 路由处理； 405方法不匹配  501方法未实现
app.use(userRouter.allowedMethods);
app.use(musicRouter.allowedMethods);


