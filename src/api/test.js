import { createRequest } from 'microvideo-request'

/**
 * 测试接口：获取天气：彩云天气119.816989, 31.686698
 * @param  data
 * @returns
 */
export const getCaiYunWeatherData = (params) => {
  return createRequest().setParameters(params).get('/nhu-dp-show/api/fuwuyun/getCaiYunWeatherData')
}

export const getLineInfoById = (id) => {
  return createRequest().get(`/line/${id}`)
}

export const getLineInfo = (page, limit) => {
  return createRequest().get(`/line/list/${page}/${limit}`)
}

export const getAllLineInfo = () => {
  return createRequest().get(`/line/all`)
}

export const getSectionInfo = () => {
  return createRequest().get(`/section/all`)
}

export const getCompanyInfo = () => {
  return createRequest().get(`/company/all`)
}

export const updateLineInfo = (Line) => {
  return createRequest().setParameters(Line).post(`/line/update`)
}

export const getCameraById = (id) => {
  return createRequest()
    .get(`/camera/${id}`)
    .catch((err) => {
      console.log(err)
      return Promise.reject(err)
    })
}

export const getCameraList = (page, limit) => {
  return createRequest()
    .get(`/camera/list/${page}/${limit}`)
    .then((res) => {
      return res.data.list.map((item) => {
        const path = [item.longitude, item.latitude]
        const name = item.camera_name
        const type = item.type_id
        const id = item.camera_id
        const line_id = item.line_id
        const line_name = item.line_name
        return { path, name, type, id, line_id, line_name }
      })
    })
}

export const getAllCameraInfo = () => {
  return createRequest()
    .get(`/camera/all`)
    .then((res) => {
      return res.data.map((item) => {
        const path = [item.longitude, item.latitude]
        const name = item.camera_name
        const type = item.type_id
        return { path, name, type }
      })
    })
}

export const getCameraInfoByLineId = (line_id, page, limit) => {
  return createRequest()
    .get(`/camera/line/${line_id}/${page}/${limit}`)
    .then((response) => {
      return response.data.list.map((item) => {
        const path = [item.longitude, item.latitude]
        const name = item.camera_name
        const type = item.type_id
        const id = item.camera_id
        const line_id = item.line_id
        const line_name = item.line_name
        return { path, name, type, id, line_id, line_name }
      })
    })
}

export const getAllCameraInfoByLineId = (line_id) => {
  return createRequest()
    .get(`/camera/lineAll/${line_id}`)
    .then((response) => {
      return response.data.map((item) => {
        const path = [item.longitude, item.latitude]
        const name = item.camera_name
        const type = item.type_id
        const id = item.camera_id
        const line_id = item.line_id
        const line_name = item.line
        return { path, name, type, id, line_id, line_name }
      })
    })
}

export const delCameraById = (id) => {
  return createRequest().get(`/camera/del/${id}`)
}

export const getCameraType = () => {
  return createRequest().get(`/camera/type`)
}

export const updateCameraInfo = (camera) => {
  return createRequest().setParameters(camera).post(`/camera/update`)
}

export const getLineInfoBySectionId = (section_id) => {
  return createRequest().get(`/line/section/${section_id}`)
}
