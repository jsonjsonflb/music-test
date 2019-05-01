/**
 * 需求 1. 以/public开头，使用其他部分（正则）
 *      2.精确 / 或者 /abc 要替换成 /xxx
 *      3.模糊 /xxx开头 替换成 /aaa
 * @param rules
 * @returns {Function}
 */

module.exports = (rules) => { //每次请求调用
                                // 一个ctx.url 对应多条规则的匹配
  return async (ctx,next) => {

    for(let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      // 是否需要使用正则
      if(rule.regex) {
        let result = rule.regex.exec(ctx.url); // exec()执行一个搜索匹配。返回一个结果数组或 null
        // result  不匹配null 或者 匹配
        if(result) {
          // 判断是直接赋值，还是取分组的内容
          if(!rule.dist) {
            // console.log('分组正则字符串，最终改为:'+result[1]);
            ctx.url = result[1]
          }else{
            // console.log('精确匹配字符串，最终改为:'+rule.dist);
            ctx.url = rule.dist
          }
        }
      }
      // 字符串精确匹配的
      if(rule.src===ctx.url) {
        // 精确匹配
        // console.log('精确匹配字符串，最终改为:'+rule.dist);
        ctx.url = rule.dist
      }
    }
    // 为了给static重写URL
    // koa-static把public下的资源向外暴露，可以直接http://127.0.0.1:8888/img/a.png 访问，public路径多余。所以需要重写url
    // if(ctx.url.startsWith('/public')) {
    //   // 重写URL
    //   ctx.url = ctx.url.replace('/public', '')
    // }
    //
    // // 处理首页重定向
    // if(ctx.url==='/') {
    //   // 重写URL
    //   ctx.url = '/user/login'
    // }

    // 最终放行
    await next()
  }
}




