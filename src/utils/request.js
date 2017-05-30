import axios from 'axios'
import qs from 'qs'
import { API_PATH } from '../constants'
import appStore from '../stores/appStore'

axios.defaults.timeout = 5000
axios.defaults.baseURL = API_PATH
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//请求拦截
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' && config.data) {
      config.data = qs.stringify(config.data)
    }
    //config.withCredentials = true  // 需要跨域打开此配置
    appStore.showLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
axios.interceptors.response.use(
  response => {
    appStore.hideLoading()
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios