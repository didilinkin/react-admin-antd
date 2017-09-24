// panes - actions
import * as types from '../constants/ActionTypes'

// 增加
export const addPane = addObj => ({
    type: types.ADD_PANE,
    addObj
})

// 更改 activeKey
export const activePane = activeObj => ({
    type: types.ACTIVE_PANE,
    activeObj // stringKey
})

// 删减 (参数: 留下的 activePane; 其余标签删除)
export const removePane = activePane => ({
    type: types.REMOVE_PANE,
    activePane
})
