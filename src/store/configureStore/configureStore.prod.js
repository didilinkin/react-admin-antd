import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import * as rootReducer from '../reducers'

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

// 1. 配置 middleware 中间件
const middleware = [
    routerMiddleware(history),  // router-redux配置 history
    thunk  // 异步
]

// 2. 配置 combine: 组合 redux 与 router
const combine = combineReducers({
    ...rootReducer,
    router: routerReducer
})

// 配置 store
const configureStore = function (initialState) {
    const store = createStore(
        combine,
        initialState,
        applyMiddleware(...middleware)
    )

    return store
}

export { configureStore, history }
