/*
 * @Author: smigoo(xsmigoo@gmail.com)
 * @Date: 2024-04-12 16:24:14
 * @LastEditors: smigoo(xsmigoo@gmail.com)
 * @LastEditTime: 2024-09-09 20:02:25
 * @Description:
 */
import '@/assets/styles/index.less'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import '@/utils/rem.js'
// 全引入局配置
import config from '@/config'
export default {
  install: async (app) => {
    // 工具类相关
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$config = config
  },
}
