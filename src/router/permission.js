// 进度条
import router from '@/router'
import NProgress from 'nprogress' // 导入 nprogress模块
import 'nprogress/nprogress.css' // 导入样式
NProgress.configure({ showSpinner: true }) // 显示右上角螺旋加载提示

/**
 * 全局前置守卫
 */
router.beforeEach(async () => {
  NProgress.start() // 开启进度条
})

// 全局后置钩子
router.afterEach(() => {
  NProgress.done() // 完成进度条
})
