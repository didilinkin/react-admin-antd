// reducers 根文件
import { combineReducers } from 'redux'

import count from './count'
import auth from './auth'

// 整合 大版块的 状态管理
export default combineReducers({
    count
})

// 全局的 用户状态
export { auth }
