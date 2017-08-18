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

// 判断浏览器 版本
const myBrowser = () => {
    let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器

    if (isIE) {
        let IE55 = false
        let IE6 = false
        let IE7 = false
        let IE8 = false

        let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        let fIEVersion = parseFloat(RegExp['$1'])
        IE55 = fIEVersion === 5.5
        IE6 = fIEVersion === 6.0
        IE7 = fIEVersion === 7.0
        IE8 = fIEVersion === 8.0
        if (IE55) {
            return 'IE55'
        }
        if (IE6) {
            return 'IE6'
        }
        if (IE7) {
            return 'IE7'
        }
        if (IE8) {
            return 'IE8'
        }
    } // isIE end
}

export {
    stateCopy,
    cloneObj,
    hasString,
    myBrowser
}
