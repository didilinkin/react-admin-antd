/* global url: true */
import axios from 'axios'
// import * as baseURL from '../services'   // 管理配置的 URL( 包括测试接口 )
const qs = require('qs')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'http://192.168.5.110:18082/'
export const baseURL = 'http://192.168.5.110:18082/'
// 查询
export const apiGet = (url) => {
    return new Promise(function (resolve, reject) {
        axios.get(url).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 获取资源
export const apiPost = (url, configObj) => {
    return new Promise(function (resolve, reject) {
        axios.post(url, qs.stringify({...configObj})).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 删除
export const apiDel = (configObj) => {
    return new Promise(function (resolve, reject) {
        axios.delete(url, qs.stringify({...configObj})).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
}

// 更新
export const apiPut = (configObj) => {
    return new Promise(function (resolve, reject) {
        axios.put(url, qs.stringify({
            ...configObj
        })).then(
            response => {
                let resulData = response.data
                resolve(resulData)
            }
        ).catch(error => {
            reject(error)
        })
    })
}
