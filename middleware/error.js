

module.exports = (options) => {
  return async (ctx, next) => {
    try {
      // 放行
      await next()
    }catch (e) {
      // 根据业务的代码 错误提示
      // e.code之类的状态
      ctx.render('error', {msg: '002状态'})
    }
  }
}


