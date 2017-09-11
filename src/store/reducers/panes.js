// panes - reducers - Tabs 标签内容 管理
import { combineReducers } from 'redux'

import { ADD_PANE, REMOVE_PANE, ACTIVE_PANE } from '../constants/ActionTypes'

const initialState = {
    // activeKey: '1', // panes[0].key
    activePane: { // 展示的 pane标签
        closable: false,
        key: '/home/index',
        path: '/home/index',
        title: '首页'
    },
    panes: [{
        closable: false,
        key: '/home/index',
        path: '/home/index',
        title: '首页'
    }]
}

const setPanes = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PANE:
            let addState = Object.assign({}, state, {
                activePane: action.addObj.activePane,
                panes: action.addObj.panes
            })
            return addState

        case ACTIVE_PANE:
            let activeState = Object.assign({}, state, {
                activePane: action.activeObj
            })
            return activeState

        case REMOVE_PANE:
            let activeKey = action.activeKey
            let lastIndex

            state.panes.forEach((pane, i) => {
                // key为 pane中 route属性值中的path属性;
                if (pane.route.path === action.targetKey) {
                    lastIndex = i - 1
                }
            })

            const panes = state.filter(pane => pane.route.path !== action.targetKey)

            if (lastIndex >= 0 && activeKey === action.targetKey) {
                activeKey = panes[lastIndex].route.path
            }

            // 返回新的 removeState; 不需要拷贝, 直接返回新对象
            let removeState = {
                panes,
                activeKey
            }

            return removeState
        default:
            return state
    }
}

export default combineReducers({ setPanes })

export const getPanes = (state) =>
    state.setPanes
