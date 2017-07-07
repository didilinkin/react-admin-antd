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
