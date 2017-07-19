import * as types from '../constants/ActionTypes'

export cosnt signIn = auth => (dispatch, getState) => {
    dispatch({
        type: types.SIGN_IN
    })
}

export const signOut = auth => (dispatch, getState) => {
    dispatch({
        type: types.SIGN_OUT
    })
}
