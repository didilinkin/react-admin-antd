// getters
import * as fromCount from '../reducers/count'
import * as fromPanes from '../reducers/panes'

// 计数器
const getCount = state => fromCount.getCount(state.count)
export const getCountState = state =>
    getCount(state)

// Tabs 标签管理
const getPanes = state => fromPanes.getPanes(state.panes)
export const getPanesState = state =>
    getPanes(state)
