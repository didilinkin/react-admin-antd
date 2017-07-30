// 常用方法

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

export {
    stateCopy,
    cloneObj
}
