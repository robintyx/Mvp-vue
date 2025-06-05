/*
 * @Author: smigoo(xsmigoo@gmail.com)
 * @Date: 2024-04-24 21:50:55
 * @LastEditors: smigoo(xsmigoo@gmail.com)
 * @LastEditTime: 2024-09-01 14:20:32
 * @Description:入口文件
 * @Copyright: © 2024 Microvideo
 */
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
// 动态路由权限
import '@/router/permission.js'
// 按需引入配置
import lazyUse from '@/core/lazy-use'
// 兼容多服务请求配置Microvideo
import '@/core/request'
import MvMap from 'microvideo-map'

async function initApp() {
  const app = createApp(App)
  app.use(lazyUse)
  app.use(MvMap, {})
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

initApp()
