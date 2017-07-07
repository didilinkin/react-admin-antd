// 测试: 将reducers 全部状态 收集起来 暴露get方法
import * as fromCommon from './reducers/common'

const getCommon = state => fromCommon.getCommon(state.auth)

export const getAuthState = state =>
    getCommon(state)
