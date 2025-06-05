/**********************************
 * @Author: smigoo
 * @LastEditor: smigoo
 * @LastEditTime: 2024/04/24 21:31:02
 * @Email: xsmigoo@gmail.com
 * Copyright © 2024 Microvideo
 **********************************/

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import requireTransform from 'vite-plugin-require-transform'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import simpleHtmlPlugin from 'vite-plugin-simple-html'
import removeNoMatch from 'vite-plugin-router-warn'
import eslintPlugin from 'vite-plugin-eslint' //导入包
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pxtorem from 'postcss-pxtorem'
import config from './src/config'
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const viteEnv = loadEnv(mode, process.cwd())
  const { VITE_TITLE, VITE_APP_BASE_API, VITE_APP_BASE_API_PROXY } = viteEnv
  return {
    base: config.publicPath,
    plugins: [
      Vue(),
      // 配置svg
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
      requireTransform({
        //fileRegex: /.js$/.vue$/,
        fileRegex: /^(?!.*node_modules).*\.(js|jsx|ts|tsx|vue)$/,
      }),
      VueDevTools(),
      AutoImport({
        imports: ['vue', 'pinia', 'vue-router'],
        eslintrc: {
          enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
          globalsPropValue: true,
          filepath: 'scaffold-config/.eslint-global-variables.json',
        },
        dirs: ['src/store/modules/**', 'src/utils/auto-import/**'],
        dts: 'scaffold-config/auto-imports.d.ts',
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
        extensions: ['vue'],
        dirs: ['src/components'],
        deep: true,
        dts: 'scaffold-config/components.d.ts',
      }),
      simpleHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: VITE_TITLE,
            versions: new Date().getTime(),
          },
        },
      }),
      // 自定义插件，用于生成页面文件的path，并添加到虚拟模块
      // pluginPagePathes(),
      // 自定义插件，用于生成自定义icon，并添加到虚拟模块
      // pluginIcons(),
      // 移除非必要的vue-router动态路由警告: No match found for location with path
      removeNoMatch(),
    ],
    css: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: config.pxtorem.baseSize, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: config.pxtorem.open ? ['*'] : [], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            unitPrecision: 5, // 保留rem小数点多少位
            minPixelValue: 0, // 设置要替换的最小像素值 px小于x的不会被转换
            selectorBlackList: ['.norem'], // 过滤掉.norem开头的class，不进行rem转换
            exclude: /node_modules/i, // 这里表示不处理node_modules文件下的css
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '~': path.resolve(process.cwd()),
      },
    },
    server: {
      host: '0.0.0.0',
      port: config.devPort,
      open: false,
      proxy: {
        [VITE_APP_BASE_API]: {
          target: VITE_APP_BASE_API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_APP_BASE_API}`), ''),
          secure: false,
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on('proxyRes', (proxyRes, req) => {
              proxyRes.headers['x-real-url'] = new URL(req.url || '', options.target)?.href || ''
            })
          },
        },
      },
    },
    build: {
      // 生产环境构建文件的目录名
      assetsDir: config.assetsDir,
      // 打包生成文件名
      outDir: VITE_TITLE + '-' + viteEnv.VITE_MODE + '-dist',
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
  }
})
