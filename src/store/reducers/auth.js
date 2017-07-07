// 负责login登录处理
import { combineReducers } from 'redux'
import {
    SIGN_IN,
    SIGN_OUT
} from '../constants/ActionTypes'

// 用户权限信息
// const initialState = {
//     isAuthenticated: false,     // 是否登录
//     authType: 'user'            // 用户类型
// }
const initialState = false          // 是否登录( 返回对象方法失败 )

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            // return (state.isAuthenticated = true)
            return true
        case SIGN_OUT:
            // return (state.isAuthenticated = false)
            return false
        default:
            return initialState
    }
}

export default combineReducers({ auth })

export const getAuth = (state) =>
    state.auth
