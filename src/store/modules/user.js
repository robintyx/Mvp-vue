/**********************************
 * @Author: smigoo
 * @LastEditor: smigoo
 * @LastEditTime: 2024/04/24 21:25:59
 * @Email: xsmigoo@gmail.com
 * Copyright © 2024 Microvideo
 **********************************/

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: 'Microvideo Base',
  }),
  getters: {
    username() {
      return `getters数据${this.userInfo}`
    },
  },
  actions: {
    setUserInfo(user) {
      this.userInfo = user
    },
  },
  // persist: true,
  persist: {
    key: 'piniaStore', // 设置存储名称
    storage: sessionStorage, // 存储方式
    paths: ['userInfo'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
  },
})
