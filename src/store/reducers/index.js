// 全局 reducers 根文件
import { combineReducers } from 'redux'

// global
import auth from './auth'
import panes from './panes'

// module
import count from './count'

// 整合 全部版块的 状态管理
export default combineReducers({
    count
})

// 全局的 用户状态 => 单个输出
export { auth, panes }
