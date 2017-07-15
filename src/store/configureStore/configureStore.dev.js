import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const middleware = [ thunk ]
middleware.push(createLogger())

// 增强器(组成: 异步 + 调试插件 + redux日志) => 必须浏览器安装有 devtools插件, 否则不使用 这个增强器
const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default function configureStore (initialState) {
    let store

    if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
        store = createStore(rootReducer, initialState, applyMiddleware(thunk)) // 不适用增强器
    } else {
        store = createStore(rootReducer, initialState, enhancer)
    }

    return store
}
