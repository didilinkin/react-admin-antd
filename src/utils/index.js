// 常用方法
import { isString, findIndex } from 'lodash'

// 深拷贝(简单实现)
const stateCopy = (stateObj) => {
    return JSON.parse(JSON.stringify(stateObj))
}

// 中级 深拷贝
const cloneObj = function (obj) {
    let str
    let newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
        return newobj
    } else if (window.JSON) {
        str = JSON.stringify(obj) // 系列化对象
        newobj = JSON.parse(str) // 还原
    } else {
        for (let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) :
                obj[i]
        }
    }
    return newobj
}

const hasString = (array, property, findString) => { // 检索数组, 检索属性, 检索值
    if (isString(findString)) {
        return findIndex(array, (o) => o[property] === findString) // True: 无 url; False: 有 url
    }
}

export {
    stateCopy,
    cloneObj,
    hasString
}
