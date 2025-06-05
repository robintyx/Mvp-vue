<template>
  <div class="container">
    <div class="header">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="感动科技"
        sub-title="MICROVIDEO"
      />
    </div>
    <div class="body">
      <div class="sidebar">
        <a-menu
          id="mainMenu"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="width: 256px"
          mode="inline"
          :items="items"
          @click="handleClick"
        ></a-menu>
      </div>
      <div class="map-wrapper">
        <div class="map-container">
          <mv-map
            ref="mvMap"
            id="mv-map"
            class="mv-map"
            :mapConfig="mapConfig"
            :mapEventType="mapEventType"
            :businessConfig="businessConfig"
            @map-load="mapLoad"
            @map-load-event="mapLoadEvent"
            @point-click="pointClick"
          />
        </div>
      </div>
      <div class="act">
        <SelectCamera />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import SelectCamera from '@/components/business-components/SelectCamera.vue'

const router = useRouter()
const selectedKeys = ref(['2'])
const openKeys = ref(['sub1'])

let map = null

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = reactive([
  getItem('路线管理', 'sub1', null, [getItem('路线展示', '1'), getItem('摄像头展示', '2')]),
  {
    type: 'divider',
  },
  getItem('Navigation Two', 'sub2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')]),
])
const handleClick = (e) => {
  if (e.key === '1') {
    router.push('/line')
  }
}
watch(openKeys, (val) => {
  console.log('openKeys', val)
})

// 配置对象（不需要 ref 包裹，因为不打算修改或追踪）
const mapConfig = {
  zoom: 8,
  zooms: [7, 19],
  center: [120.002121, 32.691081],
}

const mapEventType = ['click', 'zoomend']

const businessConfig = {
  areaConfig: {
    code: '320000',
    provinceBorder: true,
  },
}

// 地图加载完成回调
function mapLoad(_map) {
  map = _map
  console.log('地图加载完成:', map)
}

// 地图绑定事件回调
function mapLoadEvent(event) {
  console.log('地图事件触发:', event.type)
}

// 点位点击事件
function pointClick(e, data, config) {
  console.log('点位点击:', e, data, config)
}
</script>

<style>
/* 全局设置 */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面容器：垂直布局 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 顶部区域：由内容自适应高度 */
.header {
  flex-shrink: 0;
}

/* 主体区域：占据 header 剩余的全部空间 */
.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 左侧导航区域：宽度由内容自适应（不设固定宽度） */
.sidebar {
  flex-shrink: 0;
  overflow-y: auto;
}

/* 地图区域：填满中间剩余空间 */
.map-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 地图组件 */
.mv-map,
.mv-map .amap-container {
  width: 100%;
  height: 100%;
}

/* 右侧操作栏：可以设为自动宽度，或 flex 占比 */
.act {
  flex-shrink: 0;
  width: 25%;
  overflow-y: auto;
}
</style>
