<!--
 * @Description: 框架默认首页
 * @Author: smigoo(xsmigoo@gmail.com)
 * @Date: 2024-04-24 21:50:55
 * @LastEditors: smigoo(xsmigoo@gmail.com)
 * @LastEditTime: 2024-10-31 10:42:47
 * @Copyright: © 2024 Microvideo
-->
<template>
  <a-watermark
    :content="['Microvideo', 'Vue3 Vite Base']"
    :height="30"
    :width="130"
    class="home-container"
  >
    <div class="home-header">
      <img src="/favicon.png" alt="logo" />
      <h1>感动科技</h1>
      <h2>MICROVIDEO</h2>
      <button @click="goToMap">跳转页面</button>
    </div>

    <div class="home-title">
      <h3>Vue3 Vite Base</h3>
      <p class="">本基础模版基于 Vite + Vue3.5 + Pinia</p>
      <p class="small">环境要求 node 18+ & pnpm 包管理器</p>
    </div>
    <div class="card-group flex-center">
      <a-card class="cus-scroll">
        <h2>框架升级</h2>
        <div>
          <a-select ref="select" v-model:value="value1" style="width: 120px">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
          <a-calendar :fullscreen="false" />
          <p>
            <b>Vue3.5</b>
            响应式系统优化升级，重构后内存占用减少56%，大数组操将将快10倍速度
          </p>
          <p>
            搭配使用了
            <b>Vite</b>
            ，实现真正的按需编译，即时更新。并获得更小的打包体积。
          </p>
          <p>
            加上推荐使用的
            <b>pnpm</b>
            包管理器，可以使我们的优化我们安装依赖，加载，打包的速度。绝大多数情况 pnpm 速度会比 npm
            / yarn 快 2-3 倍。
          </p>
        </div>
      </a-card>
      <a-card class="cus-scroll">
        <h2>开发工具升级</h2>
        <div>
          <p>
            集成
            <b>VueDevTools</b>
          </p>
          <img src="./assets/images/devtool.png" />
          <p>
            美化
            <b>console</b>
          </p>
          <img src="./assets/images/log.png" />
          <p>
            集成
            <b>Radash</b>
            方法库
          </p>
          <img src="./assets/images/radash.png" />
        </div>
      </a-card>
      <a-card class="cus-scroll">
        <h2>自动引入功能升级</h2>
        <div>
          <p>
            优化了
            <b>unplugin-auto-imports</b>
            、
            <b>unplugin-vue-components</b>
            的自动引入、将基础方法库、pinia都自动引入，简化了部分开发功能，能够提高我们的开发效率。
          </p>
          <p>
            常用全局方法直接使用，无需引入
            <code>const { proxy } = getCurrentInstance()</code>
          </p>
          <p>
            pinia库无需
            <code>import { useUserStore } from '@/store'</code>
          </p>
        </div>
      </a-card>

      <a-card class="cus-scroll">
        <h2>配置项升级</h2>
        <div>
          <p>
            <b>Microvideo Request</b>
            升级，增加网络successStatus配置。
          </p>
          <p>
            集成
            <b>Pxtorem</b>
            插件，增加全局配置。
          </p>
        </div>
      </a-card>
      <a-card class="cus-scroll">
        <h2>Microvideo request示范</h2>
        <p class="">
          明日是{{ weatherData.date + weatherData.week }}，最低气温{{
            weatherData.tomorrowMinTemp
          }}，最高气温{{ weatherData.tomorrowMaxTemp }}摄氏度，{{
            weatherData.tomorrowWindContent
          }}。
        </p>
        <h2>Pinia示范</h2>
        <p class="">
          <b>state=></b>
          {{ store.userInfo }}
        </p>
        <p class="">
          <b>getters=></b>
          {{ store.username }}
        </p>
        <p class="flex-center">
          <b>actions=></b>
          <a-input
            v-model:value="actionsVal"
            size="small"
            style="width: 300px; margin-right: 10px"
          />
          <a-button @click="useAction" type="primary" size="small">点击更改</a-button>
        </p>
        <p>
          可以配置
          <code>persist: true</code>
          实现本地存储
        </p>
      </a-card>
    </div>
  </a-watermark>
</template>
<script setup>
const store = useUserStore()
import { getCaiYunWeatherData } from '@/api/test'

const router = useRouter()
const value1 = ref('lucy')
/**
 * @Author: smigoo(xsmigoo@gmail.com)
 * @description: pinia示范
 * @return {*}
 */
const actionsVal = ref(store.userInfo)
const useAction = () => {
  store.setUserInfo(actionsVal.value)
}
/**
 * @Author: smigoo(xsmigoo@gmail.com)
 * @description: Microvideo request示范
 * @return weatherData
 */
const weatherData = ref({})
const goToMap = () => {
  router.push('/line')
}
const getWeather = () => {
  getCaiYunWeatherData({ lon: '119.816989', lat: '31.686698' }).then((res) => {
    weatherData.value = res.data
  })
}
onMounted(() => {
  // 全局方法无需import直接使用
  console.log($dayjs().format('YYYY-MM-DD'), $proxy())
  getWeather()
  const employees = [
    { name: 'Alice', position: 'Developer', age: 30 },
    { name: 'Bob', position: 'Designer', age: 25 },
  ]
  log.table('组件信息', employees)
  // 打印标题
  log.title('开发日志')

  // 输出普通信息
  log.info('这是一个普通信息', '详细描述')

  // 输出警告信息
  log.warning('这是一个警告信息', '注意事项')

  // 输出成功信息
  log.success('这是一个成功信息', '操作成功')

  // 输出错误信息
  log.error('这是一个错误信息', '操作失败')
})
</script>
<style lang="less" scoped>
.home-container {
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(247, 232, 255, 0.54)),
    to(rgba(191, 223, 255, 0.35))
  );
  background-image: linear-gradient(180deg, rgba(247, 232, 255, 0.54), rgba(191, 223, 255, 0.35));
  height: 100vh;
  width: 100vw;

  .home-header {
    display: flex;
    padding: 20px 0 0 50px;
    color: #222;
    align-items: center;
    height: 80px;

    img {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }

    h1 {
      font-size: 22px;
      margin-right: 20px;
    }

    h2 {
      font-size: 18px;
      letter-spacing: 2px;
    }
  }

  .home-title {
    padding: 0 50px;
    height: 320px;

    h3 {
      font-size: 80px;
      line-height: 150px;
    }

    p {
      font-size: 30px;
      color: #666;
      line-height: 40px;
      font-weight: 300;

      &.small {
        font-size: 16px;
        font-style: italic;
        color: #888;
      }
    }
  }

  .card-group {
    height: calc(100vh - 400px);
    padding: 0 50px;
    justify-content: space-between;

    .ant-card {
      height: 80%;
      width: calc(20vw - 30px);

      h2 {
        font-size: 24px;
      }

      div {
        line-height: 30px;
        padding: 10px 0;

        p {
          margin: 30px 0;

          code {
            display: block;
            font-family: monospace;
            background: #eee;
            padding: 10px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}

.ant-card {
  font-size: 14px;
}
</style>
