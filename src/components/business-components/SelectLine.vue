<template>
  <div class="container">
    <div class="title">查询路线</div>
    <a-divider></a-divider>
    <div class="bottom">
      <a-select
        ref="select"
        style="width: 120px"
        v-model:value="value1"
        :options="options1"
        @change="handleChange"
      ></a-select>
      <a-button type="primary" :icon="h(SearchOutlined)" @click="selectLineList">搜索</a-button>
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
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :rowKey="'line_id'"
        :pagination="{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
        }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="link" @click="createLine(record)">查看</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <a-drawer
    title="路线详细信息页"
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
      取消勾选修改路线信息
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
          <a-form-item label="路线名称" name="lineName">
            <a-input v-model:value="form.lineName" placeholder="请输入路线名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="所属路段" name="sectionName">
            <a-select
              ref="select"
              v-model:value="value1"
              style="width: 120px"
              :options="options1"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属公司" name="company">
            <a-select ref="select" v-model:value="value2" :options="options2"></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="状态" name="status">
            <a-switch v-model:checked="checked" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="路线空间数据" name="lineSpatialData">
            <a-textarea
              v-model:value="form.lineSpatialData"
              :rows="15"
              placeholder="输入路线空间数据"
            />
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
  getAllCameraInfoByLineId,
  getAllLineInfo,
  getCompanyInfo,
  getLineInfo,
  getLineInfoById,
  getLineInfoBySectionId,
  getSectionInfo,
  updateLineInfo,
} from '@/api/test.js'

//eslint-disable-next-line no-unused-vars
let markers = null
// 页数配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
})

// 抽屉栏状态
const open = ref(false)
const checked = ref(false)
const onClose = () => {
  open.value = false
  componentDisabled.value = true
}
// checkbox 默认状态
const componentDisabled = ref(true)
//表单属性
const form = reactive({})
const rules = {
  lineName: [
    {
      required: true,
      message: '请输入路线名称',
    },
  ],
  lineSpatialData: [
    {
      required: true,
      message: '请输入路线空间数据',
    },
  ],
}
let lineList = null
let point = null
let line_id = null
let proxy = getCurrentInstance()
//section_id
const value1 = ref('未选择路段')
const options1 = ref([])
//company_id
const value2 = ref('')
const options2 = ref([])
const lineSpatialDataStr = ref()

const state = reactive({
  checkedAll: false,
})

const dataSource = ref([])
const columns = [
  { title: 'ID', dataIndex: 'line_id', key: 'line_id' },
  { title: '路线名称', dataIndex: 'line_name', key: 'line_name' },
  { title: '所属路段', dataIndex: 'section_name', key: 'section_name' },
  { title: '操作', dataIndex: 'operation', key: 'operation' },
]

onMounted(() => {
  proxy = getCurrentInstance().proxy
})

// 查询路线列表
function selectLineList(page = pagination.current, pageSize = pagination.pageSize) {
  if (page instanceof PointerEvent || typeof page === 'object') {
    page = pagination.current
    pageSize = pagination.pageSize
  }
  getLineInfo(page, pageSize).then((res) => {
    dataSource.value = res.data.list.map((item) => ({
      line_id: item.line_id,
      line_name: item.line_name,
      section_name: item.section_name,
    }))
    pagination.total = res.data.total // 假设接口返回 total 总条数
    pagination.current = page
  })
}

function handleTableChange(pag) {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  selectLineList(pag.current, pag.pageSize)
}

function checkStatus() {
  let status = 0
  if (checked.value === true) {
    status = 1
  } else {
    status = 0
  }
  return status
}

function submit() {
  const line = {
    line_id: line_id,
    line_name: form.lineName,
    section_id: value1.value,
    company_id: value2.value,
    status: checkStatus(),
    line_spatial_data: JSON.parse(lineSpatialDataStr.value),
  }

  updateLineInfo(line).then((res) => {
    if (res.code === 200) {
      alert('修改成功')
      onClose()
      selectLineList()
      if (lineList) {
        proxy.$mapSdk().removeMvMapLineLayer(lineList)
        lineList = null
      }
    }
  })
}

const createLine = (record) => {
  state.checkedAll = false
  // 如果已有线路图层，先移除
  if (lineList) {
    proxy.$mapSdk().removeMvMapLineLayer(lineList)
    proxy.$mapSdk().removeMvMapMarkerLayer(markers)
    lineList = null
    markers = null
  }

  const lineConfig = {
    lineWidth: 8,
    selectWidth: 10,
    lineColor: '#FFEA00',
    selectColor: '#ed8c25',
    openMouseoverCallback: true,
  }

  getLineInfoById(record.line_id).then((res) => {
    const data = [
      {
        name: res.data.line_name,
        path: res.data.line_spatial_data,
      },
    ]

    lineSpatialDataStr.value = JSON.stringify(res.data.line_spatial_data, null, 2)

    lineList = proxy.$mapSdk().createMvMapLineLayer(data, lineConfig, (e) => {
      if (e.type === 'click') {
        open.value = true
        line_id = res.data.line_id
        form.lineName = res.data.line_name
        value1.value = res.data.section_id
        value2.value = res.data.company_id
        checked.value = res.data.status === 1
        form.lineSpatialData = lineSpatialDataStr
        getSectionInfo().then((response) => {
          options1.value = response.data.map((item) => ({
            value: item.section_id,
            label: item.section_name,
          }))
        })
        getCompanyInfo().then((response) => {
          options2.value = response.data.map((item) => ({
            value: item.company_id,
            label: item.company_name,
          }))
        })
      }
    })
  })

  getAllCameraInfoByLineId(record.line_id).then((res) => {
    point = res.map((item) => {
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

const showAll = () => {
  if (state.checkedAll === true) {
    selectLineList()
    // 判断是否已经绘制折线
    if (lineList) {
      proxy.$mapSdk().removeMvMapLineLayer(lineList)
      proxy.$mapSdk().removeMvMapMarkerLayer(markers)
      lineList = null
      markers = null
    }

    //  请求所有数据线路
    getAllLineInfo().then((res) => {
      const data = res.data.map((item) => {
        return {
          name: item.line_name,
          path: item.line_spatial_data,
        }
      })
      // 线图层的默认配置
      const lineConfig = {
        lineWidth: 8,
        selectWidth: 10,
        lineColor: '#FFEA00',
        selectColor: '#ed8c25',
      }
      // 创建折线图层（放在异步成功回调里）
      lineList = proxy.$mapSdk().createMvMapLineLayer(data, lineConfig, (e, data) => {
        if (e.type === 'click') {
          alert('你点击了折线：' + data.name)
        }
      })
    })
  } else {
    if (lineList) {
      proxy.$mapSdk().removeMvMapLineLayer(lineList)
      lineList = null
      markers = null
    }
  }
}

/**
 * 选择路段查询摄像头信息
 */
function handleChange(value) {
  getLineInfoBySectionId(value).then((res) => {
    dataSource.value = res.data.map((item) => ({
      line_id: item.line_id,
      line_name: item.line_name,
      section_name: item.section_name,
    }))
  })
}

// 选择器获取路段信息
getSectionInfo().then((response) => {
  options1.value = response.data.map((item) => ({
    value: item.section_id,
    label: item.section_name,
  }))
})
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
