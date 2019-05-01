const userModel = require('../models/user');
const captchapng = require('captchapng2'); // 验证码

/**
 * 处理 请求及业务*/

module.exports = {
  showRegister: async (ctx, next) => {
    // let users =await userModel.getUsers();
    ctx.render('register')
  },
  /**
   * 检查用户名是否存在
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  checkUsername: async (ctx, next) => {
    let {username} = ctx.request.body;
    // 查询 username 是否存在
    let user = await userModel.findUsername(username);
    // 判断 user 数组长度是否为0
    if (user.length === 0) {
      ctx.body = {
        code: '001',
        msg: '可以注册'
      }
    } else {
      // 已存在用户情况
      ctx.body = {
        code: '002',
        msg: '用户名已存在'
      }
    }
  },
  /**
   * 注册用户
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  doRegister: async (ctx, next) => {
    let {username, password, email, v_code} = ctx.request.body;
    // 比较v_code
    if(v_code!==ctx.session.v_code) {
      ctx.body = {
        code: '002',
        msg: '验证码不正确'
      }
      return;
    }

    // 判断用户名是否存在
    let user = await userModel.findUsername(username);
    // 如果没有创建用户名
    if (user.length !== 0) {
      ctx.body = {
        code: '002',
        msg: '用户名已存在'
      };
      return;
    }

    try {
      // 开始注册
      let result = await userModel.registerUser(username, password, email);
      // 成功的返回值
      // OkPacket {
      //     fieldCount: 0,
      //     affectedRows: 1,
      //     insertId: 3,
      //     serverStatus: 2,
      //     warningCount: 0,
      //     message: '',
      //     protocol41: true,
      //     changedRows: 0
      // }
      if (result.affectedRows === 1) {
        ctx.body = {code: '001', msg: '注册成功'};
        return;
      }
      ctx.body = {code: '002', msg: result.message}
    } catch (err) {
      // 判断e的类型  传给app.js 异常处理
      ctx.throw('002')
    }
  },

  /**
   * 登陆 */
  async doLogin(ctx, next) {
    // 接受参数
    let {username, password} = ctx.request.body;
    // 2 查询用户名
    let users = await userModel.findUserDataByUsername(username);
    if(users.length===0) {
      // 没有用户
      ctx.body = {
        // 返回模糊词，防止暴力试探用户名
        code: '002', msg: '用户名或者密码不正确'
      };
      return;
    }
    // 3.对比密码
    let user = users[0]; // 注册控制不能存在相同的用户数据
    if(user.password === password) {
      ctx.body = {
        // 返回模糊词，防止暴力试探用户名
        code: '001', msg: '登陆成功'
      };
      ctx.session.user = user;
      // 挂载session,登陆认证

      return;
    }
    // 3.1如果密码正确,认证用户 session 放属性区分是否登录
    // 3.2如果密码错误。响应json code: "002"
    ctx.body = {
      // 返回模糊词，防止暴力试探用户名
      code: '002', msg: '用户名或者密码不正确'
    };
  },

  /**
   *
   * @param ctx
   * @param next
   * @returns {Promise<void>}
   */
  getPic(ctx, next) {
    let rand = parseInt(Math.random() * 9000 + 1000);// 生成随机四位数，作为验证码
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha
    // 区分不同用户的答案，并分配session，响应cookie
    ctx.session.v_code = rand+'';

    ctx.body = png.getBuffer()
  },
  /** 退出
   * 1.清除session上的user
   * 2. 重定向页面到login页面*/
  logout(ctx, next) {
    ctx.session.user = null;
    ctx.redirect('/user/login')
  }
}