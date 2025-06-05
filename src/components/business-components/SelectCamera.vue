<template>
  <div class="container">
    <div class="title">查询摄像头</div>
    <a-divider></a-divider>
    <div class="bottom">
      <a-select
        ref="select"
        style="width: 120px"
        v-model:value="value1"
        :options="options1"
        @change="handleChange"
      ></a-select>
      <a-button type="primary" :icon="h(SearchOutlined)" @click="selectCameraList">搜索</a-button>
      <a-switch v-model:checked="state.checkedAll" @change="showAll">
        <template #checkedChildren>
          <check-outlined />
        </template>
        <template #unCheckedChildren>
          <close-outlined />
        </template>
      </a-switch>
    </div>
    <div class="form">
      <a-table :dataSource="dataSource" :columns="columns" rowKey="line_id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="link" @click="createCamera(record)">查看</a-button>
            <a-button danger type="link" @click="deleteCamera(record)">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <a-drawer
    title="摄像头详细信息页"
    :width="640"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-checkbox
      :checked="componentDisabled"
      @change="(e) => (componentDisabled = e.target.checked)"
    >
      取消勾选修改摄像头信息
    </a-checkbox>
    <a-form
      :model="form"
      :rules="rules"
      layout="vertical"
      :disabled="componentDisabled"
      style="max-width: 600px"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="摄像头名称" name="cameraName">
            <a-input v-model:value="form.cameraName" placeholder="请输入摄像头名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="摄像头类型" name="type">
            <a-select
              ref="select"
              v-model:value="value2"
              style="width: 120px"
              :options="options2"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属路段" name="lineName">
            <a-select ref="select" v-model:value="value1" :options="options1"></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="方向" name="direction">
            <a-switch
              v-model:checked="checked1"
              checked-children="上行"
              un-checked-children="下行"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="状态" name="status">
            <a-switch v-model:checked="checked2" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="经度" name="longitude">
            <a-input v-model:value="form.longitude" placeholder="请输入经度" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="纬度" name="latitude">
            <a-input v-model:value="form.latitude" placeholder="请输入纬度" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="桩号" name="stake">
            <a-input v-model:value="form.stake" placeholder="请输入桩号" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="视频URL" name="videoUrl">
            <a-input v-model:value="form.videoUrl" placeholder="请输入Url" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="submit" :disabled="componentDisabled">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup>
import { getCurrentInstance, h, onMounted, ref } from 'vue'
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons-vue'
import {
  delCameraById,
  getAllCameraInfo,
  getCameraById,
  getCameraInfoByLineId,
  getCameraList,
  getCameraType,
  getSectionInfo,
  updateCameraInfo,
} from '@/api/test.js'

//eslint-disable-next-line no-unused-vars
let markers = null
let cameraId
let proxy = getCurrentInstance()
onMounted(() => {
  proxy = getCurrentInstance().proxy
})
// 抽屉栏状态
const open = ref(false)
const onClose = () => {
  open.value = false
  componentDisabled.value = true
}
const checked1 = ref()
const checked2 = ref()
// checkbox 默认状态
const componentDisabled = ref(true)
//表单属性
const form = reactive({})
const rules = {
  latitude: [
    {
      required: true,
      message: '请输入纬度',
      trigger: 'blur',
    },
    {
      validator: async (_, value) => {
        const num = Number(value)
        if (!value) throw new Error('请输入纬度')
        if (isNaN(num)) throw new Error('纬度必须是数字')
        if (num < -90 || num > 90) throw new Error('纬度必须在 -90 到 90 之间')
      },
      trigger: 'blur',
    },
  ],
  longitude: [
    {
      required: true,
      message: '请输入经度',
      trigger: 'blur',
    },
    {
      validator: async (_, value) => {
        const num = Number(value)
        if (!value) throw new Error('请输入经度')
        if (isNaN(num)) throw new Error('经度必须是数字')
        if (num < -180 || num > 180) throw new Error('纬度必须在 -180 到 180 之间')
      },
      trigger: 'blur',
    },
  ],
  stake: [
    {
      required: true,
      message: '请输入桩号',
      trigger: 'blur',
    },
  ],
}

// 路段选择器
const value1 = ref('未选择路段')
const options1 = ref([])
// 摄像头类型选择器
const value2 = ref('')
const options2 = ref([])

const state = reactive({
  checkedAll: false,
})

//表格配置
const dataSource = ref([])
const columns = [
  { title: 'ID', dataIndex: 'camera_id', key: 'camera_id' },
  { title: '摄像头名称', dataIndex: 'camera_name', key: 'camera_name' },
  { title: '所属路段', dataIndex: 'section_name', key: 'section_name' },
  { title: '操作', dataIndex: 'operation', key: 'operation' },
]

function selectCameraList() {
  getCameraList(1, 10).then((res) => {
    dataSource.value = res.map((item) => ({
      camera_id: item.id,
      camera_name: item.name,
      section_name: item.line_name,
    }))
  })
}

function showAll() {
  if (state.checkedAll === true) {
    selectCameraList()
    if (markers) {
      resetData()
    }
    createAddMarkers()
  } else {
    resetData()
  }
}

// 选择器获取路段信息
getSectionInfo().then((response) => {
  options1.value = response.data.map((item) => ({
    value: item.section_id,
    label: item.section_name,
  }))
})
// 选择器获取摄像头类型信息
getCameraType().then((response) => {
  options2.value = response.data.map((item) => ({
    value: item.type_id,
    label: item.type_name,
  }))
})

/**
 * 创建所有标记点
 */
const createAddMarkers = () => {
  getAllCameraInfo().then((res) => {
    let point = res.map((item) => {
      let iconStr = ''
      if (item.type === 1) {
        iconStr = 'icon-gs-sxt'
      }
      if (item.type === 2) {
        iconStr = 'icon-gl-sxt'
      }
      return {
        icon: iconStr,
        path: item.path,
        name: item.name,
      }
    })
    markers = proxy.$mapSdk().createMvMapMarkerLayer(point)
  })
}

/**
 * 重置数据值
 */
const resetData = () => {
  dataSource.value = []
  proxy.$mapSdk().removeMvMapMarkerLayer(markers)
  markers = null
  value1.value = '未选择路段'
}

/**
 * 选择路段查询摄像头信息
 */
function handleChange(value) {
  getCameraInfoByLineId(value, 1, 10).then((res) => {
    dataSource.value = res.map((item) => ({
      camera_id: item.id,
      camera_name: item.name,
      section_name: item.line_name,
    }))
  })
}

/**
 * 抽屉打开状态下修改摄像头信息
 */
function createCamera(record) {
  open.value = true
  getCameraById(record.camera_id).then((res) => {
    cameraId = record.camera_id
    form.cameraName = res.data.camera_name
    value1.value = res.data.line_id
    value2.value = res.data.type_id
    checked1.value = res.data.direction === 1
    checked2.value = res.data.status === 1
    form.latitude = res.data.latitude
    form.longitude = res.data.longitude
    form.stake = res.data.stake_id
    form.videoUrl = res.data.video_url
  })
}

/**
 * 删除摄像头信息
 */
function deleteCamera(record) {
  alert('确定要删除吗？')
  delCameraById(record.camera_id).then((res) => {
    if (res.code === 200) {
      if (markers) {
        resetData()
      }
      selectCameraList()
      alert('删除成功')
    }
  })
}

/**
 * 提交表单
 */
function submit() {
  const camera = {
    camera_id: cameraId,
    camera_name: form.cameraName,
    line_id: value1.value,
    type_id: value2.value,
    direction: checked1.value ? 1 : 0,
    status: checked2.value ? 1 : 0,
    latitude: form.latitude,
    longitude: form.longitude,
    stake_id: form.stake,
    video_url: form.videoUrl,
  }
  console.log(camera)
  updateCameraInfo(camera).then((res) => {
    if (res.code === 200) {
      alert('修改成功')
      onClose()
      if (markers) {
        resetData()
      }
      selectCameraList()
    }
  })
}
</script>

<style scoped>
.title {
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
