import { Modal, message, notification } from 'ant-design-vue'
import { getCurrentInstance } from 'vue'
export const $proxy = () => {
  const { proxy } = getCurrentInstance()
  return proxy
}
import dayjs from 'dayjs'
import config from '@/config'

export const $config = config
export const $dayjs = dayjs
export const $message = message
export const $notification = notification
export const $confirm = Modal.confirm
export const $info = Modal.info
export const $success = Modal.success
export const $error = Modal.error
export const $warning = Modal.warning
