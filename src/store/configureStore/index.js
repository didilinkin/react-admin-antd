import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import rootReducer  from '../reducers' // 根 reducers

import thunk from 'redux-thunk'

// 创建你选择的 history (在这种情况下, 我们需要 browser history模式)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key; 在“路由器”键上将 reducer添加到您的 store
// 还应用我们的中间件进行导航
// 使用插件首先要导入compose，然后再使用compose将Middleware和插件调用组合起来

// 配置 store
let store

if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
        combineReducers({
            ...rootReducer,
            router: routerReducer
        }),
        compose(
            applyMiddleware(thunk),
            applyMiddleware(middleware)
        )
    )
} else {
    store = createStore(
        combineReducers(rootReducer),
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ) // 插件调试，未安装会报错
    )
}

export default store
