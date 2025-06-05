/*
 * @Description:系统配置文件
 * @Author: smigoo(xsmigoo@gmail.com)
 * @Date: 2024-04-27 20:11:02
 * @LastEditors: smigoo(xsmigoo@gmail.com)
 * @LastEditTime: 2024-10-30 13:36:39
 * @Copyright: © 2024 Microvideo
 */
const network = {
  /**
   * 操作正常code，支持String、Array、int多种类型
   * 暂时按公司后端2.0框架：200表示请求成功 | 201请求成功，并创建新的资源 | 204请求成功，并删除资源
   */
  successCode: [200, 201, 204, '200', 0, '0'],
  successStatus: [301, 302], // 非必传 请求成功状态码，默认 2xx 都为成功状态码，可额外配置
}
const setting = {
  // 开发以及部署时的URL
  // hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"
  // history模式默认使用"/"或者"/二级目录/"
  publicPath: './',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 开发环境端口号
  devPort: '9999',
  // 路由模式，可选值为 history 或 hash
  routerMode: 'hash',
  // 标题分隔符
  titleSeparator: ' | ',
  // 标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: true,
}
const theme = {
  pxtorem: {
    open: true, // 是否开启px转rem功能
    baseSize: 100, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
    uiSize: 1920, // 当前页面宽度相对于1920px屏幕宽的缩放比例，可根据自己需要修改。
    uiHSize: 1080, //用户处理非正常比例
  },
}
export { network, setting, theme }
