import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers'

const middleware = [ thunk ]
middleware.push(createLogger())

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history) // 测试 改个名字
const middlewareHistory = routerMiddleware(history)

// 增强器(组成: 异步 + 调试插件 + redux日志) => 必须浏览器安装有 devtools插件, 否则不使用 这个增强器
const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(middlewareHistory),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// 再封装上 react-router-redux
const configureStore = function (initialState) {
    let store

    if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
        store = createStore(
            combineReducers({
                ...rootReducer,
                router: routerReducer
            }),
            initialState,
            applyMiddleware(thunk),
            applyMiddleware(middlewareHistory)
        ) // 不适用增强器
    } else {
        store = createStore(
            combineReducers({
                ...rootReducer,
                router: routerReducer
            }),
            initialState,
            enhancer
        )
    }

    return store
}

export { configureStore, history }

