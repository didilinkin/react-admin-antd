// 计算器 reducers
import { combineReducers } from 'redux'

import * as types from '../constants/ActionTypes'

const count = (state = 0, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return state + 1
        case types.DECREMENT:
            return state - 1
        default:
            return state
    }
}

export default combineReducers({ count })

export const getCount = (state) =>
    state.count
