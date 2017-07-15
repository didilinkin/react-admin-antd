// count - actions
import * as types from '../constants/ActionTypes'

export const increment = count => (dispatch, getState) => {
    dispatch({
        type: types.INCREMENT
    })
}

export const decrement = count => (dispatch, getState) => {
    dispatch({
        type: types.DECREMENT
    })
}
