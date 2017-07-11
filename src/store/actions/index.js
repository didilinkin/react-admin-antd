// common actions文件

// API 接口

// 常量
import * as types from '../constants/ActionTypes'

export const signIn = auth => (dispatch, getState) => {
    dispatch({
        type: types.SIGN_IN
    })
}

export const signOut = auth => (dispatch, getState) => {
    dispatch({
        type: types.SIGN_OUT
    })
}

// react-router-redex 测试用 计算器
export function increase (n) {
    return {
        type: types.INCREASE,
        amount: n
    }
}

export function decrease (n) {
    return {
        type: types.DECREASE,
        amount: n
    }
}
