// 计算器 reducers
import { combineReducers } from 'redux'

import { INCREMENT, DECREMENT } from '../constants/ActionTypes'

const count = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1
        case DECREMENT:
            return state - 1
        default:
            return state
    }
}

export default combineReducers({ count })

export const getCount = (state) =>
    state.count
