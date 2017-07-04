/* global url: true */
import axios from 'axios'
// import * as baseURL from '../services'   // 管理配置的 URL( 包括测试接口 )
import _products from './products.json'     // 商品返回值结果
const qs = require('qs')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = 'http://192.168.0.114:18082/'
export const baseURL = 'http://192.168.0.114:18082/'
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

/**
* Mocking client-server processing
* _products 在顶部引入
*/

const TIMEOUT = 100     // 等待时间为100毫秒

export default {
    // 获取产品: 接收参数: 回调事件(获取返回res数据), 等待时间(100毫秒)
    getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
    // 购买产品: 装载的商品, 回调事件, 等待时间, 等待时间(100毫秒)
    buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
