import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './basic-routes'

export const router = createRouter({
  history: $config.routerMode === 'history' ? createWebHistory() : createWebHashHistory(),
  routes: basicRoutes,
})

export async function setupRouter(app) {
  app.use(router)
}
export default router
