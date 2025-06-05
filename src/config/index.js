// 默认配置
import { network, setting, theme } from './default-config'
// 自定义配置
import { custom } from './custom-config'
const config = Object.assign({}, network, setting, theme, custom)
export default config
