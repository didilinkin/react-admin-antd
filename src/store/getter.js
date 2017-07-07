// 测试: 将reducers 全部状态 收集起来 暴露get方法
import * as fromAuth from './reducers/auth'

const getAuth = state => fromAuth.getAuth(state.auth)

export const getAuthState = state =>
    getAuth(state)
