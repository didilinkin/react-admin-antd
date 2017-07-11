// 测试: 将reducers 全部状态 收集起来 暴露get方法
import * as fromAuth from './reducers/auth'
import * as fromCount from './reducers/count'

const getAuth = state => fromAuth.getAuth(state.auth)
const getCount = state => fromCount.getCount(state.count)

export const getAuthState = state =>
    getAuth(state)

export const getCountState = state =>
    getCount(state)
