import axios from 'axios'
import localStore from '../utils/LocalStore' // LS操作统一使用此方法

const qs = require('qs')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'http://192.168.5.8:18082/'
export const baseURL = 'http://192.168.5.8:18082/'

// 查询
export const apiGet = (url) => {
    url = url + '?token=' + localStore.get('token')
    return new Promise(function (resolve, reject) {
        axios.get(url).then(
            response => {
                let resulData = response.data
                if (resulData.data !== null && resulData.data !== '') {
                    if (resulData.data.toString() === '登录过期') {
                        localStore.remove('token')
                        window.location.href = '/login'
                    } else {
                        resolve(resulData)
                    }
                }
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 获取资源
export const apiPost = (url, configObj) => {
    if (typeof (configObj) === 'undefined') {
        configObj = []
    }
    configObj['token'] = localStore.get('token')
    return new Promise(function (resolve, reject) {
        axios.post(url, qs.stringify({ ...configObj })).then(
            response => {
                let resulData = response.data
                if (resulData.data !== null && resulData.data !== '') {
                    if (resulData.data.toString() === '登录过期') {
                        localStore.remove('token')
                        window.location.href = '/login'
                    } else {
                        resolve(resulData)
                    }
                }
            }
        ).catch(error => {
            reject(error)
        })
    })
}
