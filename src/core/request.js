import { setRequestConfig, setInterceptor } from 'microvideo-request'
/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case 400:
      $message.error(msg || `请求参数错误`)
      break
    case 401:
      $message.error(msg || `授权未通过`)
      break
    case 406:
      $message.error(msg || `权限认证未通过`)
      break
    case 500:
      $message.error(msg || `服务器意外错误`)
      break
    case 501:
      $message.error(msg || `服务器不支持该请求功能`)
      break
    default:
      $message.error(msg || `后端接口${code}异常`)
      break
  }
}
/**
 * 请求配置
 * 基本配置，多服务配置，拦截器配置
 **/
export const requestConfig = {
  /**
   * 基本配置
   */
  config: {
    // baseURL: import.meta.env.VITE_BASE_API,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    successStatus: $config.successStatus,
  },
  /**
   * 多服务配置
   * 若无多服务配置，config.baseURL 必传
   * 若有多服务配置，config.baseURL 可不传，第一个服务配置为默认服务
   */
  servers: [
    {
      // 基础服务
      name: 'BASE_SERVER',
      url: import.meta.env.VITE_APP_BASE_API,
    },
    {
      // DEMO！其他服务，不用时删掉
      name: 'OTHER_API',
      url: import.meta.env.VITE_APP_OTHER_API,
    },
  ],
  /**
   * 请求之前回调
   * @param {Object} res
   */
  before: ({ data }, resolve, reject) => {},
  /**
   * 请求成功回调
   * @param {Object} res
   */
  success: ({ data }, resolve, reject) => {
    const { code, message, detail } = data
    // 操作正常Code数组
    const codeVerificationArray = $radash.isArray($config.successCode)
      ? [...$config.successCode]
      : [...[$config.successCode]]
    // 是否操作正常，增加文件流格式
    if (codeVerificationArray.includes(code) || $config.responseType === 'blob') {
      resolve(data)
    } else {
      handleCode(code, message)
      reject('请求异常拦截:' + JSON.stringify({ detail, code, message }) || 'Error')
    }
  },

  /**
   * 请求失败回调
   * @param {Object} res
   */
  error: (res) => {
    if (res) {
      // 代码
    }
  },
}

/**
 * 初始化request请求配置
 * 配置默认的请求方式
 * */
setRequestConfig(requestConfig.config, requestConfig.servers)
// 请求之前拦截器
setInterceptor(requestConfig.before, 'BEFORE')
// 请求成功拦截器
setInterceptor(requestConfig.success, 'SUCCESS')
// 请求失败拦截器
setInterceptor(requestConfig.error, 'ERROR')
