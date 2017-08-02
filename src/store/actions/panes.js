// panes - actions
import * as types from '../constants/ActionTypes'

// 增加
export const addPane = addObj => ({
    type: types.ADD_PANE,
    addObj
})

// 删减 (参数: 当前激活 tabs面板的 Key, 目标 tabs面板的 Key)
export const removePane = (activeKey, targetKey) => ({
    type: types.REMOVE_PANE,
    activeKey,
    targetKey
})

// 获取
export const getPane = pane => (dispatch, getState) => {
    dispatch({
        type: types.GET_PANE
    })
}
