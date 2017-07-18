// 通过 store.js 操作 localStorage => 目前只是改变一下名称; 避免与 store 关键词冲突
const localStore = require('store')

// 验证本地 用户登录状态: function => boolean
const authenticate = () => {
    let authState
    localStore.get('isAuthenticate') ? authState = true : authState = false
    return authState
}

export default localStore

export { authenticate }
