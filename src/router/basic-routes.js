export const basicRoutes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'Line',
    path: '/line',
    component: () => import('@/views/map/Line.vue'),
    meta: {
      title: '路线管理',
    },
  },
  {
    name: 'Camera',
    path: '/camera',
    component: () => import('@/views/map/Camera.vue'),
    meta: {
      title: '摄像头管理',
    },
  },
]
