// 用户 权限 reducers
import { combineReducers } from 'redux'

import { SIGN_IN, SIGN_OUT } from '../constants/ActionTypes'

import localStore from '../../utils/LocalStore'

const isAuthenticate = (state = false, action) => {
    switch (action.type) {
        case SIGN_IN:
            return (state = true)
        case SIGN_OUT:
            localStore.clearAll() // 清空本地状态
            return (state = false)
        default:
            return state
    }
}

export default combineReducers({ isAuthenticate })

export const getAuth = (state) =>
    state.isAuthenticate
