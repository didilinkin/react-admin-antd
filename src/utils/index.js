// 常用方法
import { isUndefined, isString } from 'lodash'

// 深拷贝
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

const hasString = (array, findString) => {
    if (isString(findString)) {
        return isUndefined(array.find((n) => n === findString)) // 无 => true; 有 => false
    }
}

export {
    stateCopy,
    cloneObj,
    hasString
}
