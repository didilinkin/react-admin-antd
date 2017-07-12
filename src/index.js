// 根文件
import React from 'react'
import { render } from 'react-dom'

// import { createDevTools }                       from 'redux-devtools'
// import LogMonitor                               from 'redux-devtools-log-monitor'
// import DockMonitor                              from 'redux-devtools-dock-monitor'

// import { createStore, combineReducers }         from 'redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// router
// import { Router, BrowserRouter }                from 'react-router'
import createHistory                            from 'history/createBrowserHistory'
import { Route }                                from 'react-router-dom'

// router-redux
// import { syncHistoryWithStore, routerReducer }  from 'react-router-redux'
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
    // ,push
} from 'react-router-redux'

import rootReducer                              from './store/reducers'         // 根 reducers
// import Routes                                   from './router'                 // 根 路由配置

// 临时测试 子页面
import App from './container/App'
import Foo from './container/Foo'
import Bar from './container/Bar'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)


// react-router-redux 4.x
// const reducer = combineReducers({
//     ...rootReducer,
//     routing: routerReducer
// })
// redux
// const store = createStore(
//     reducer,
//     DevTools.instrument()
// )

// react-router-redux 5.x
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        ...rootReducer,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)

// redux-devtools
// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//         <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//     </DockMonitor>
// )

// router
// const history = syncHistoryWithStore(BrowserRouter, store)

const rootElement = document.getElementById('root')

render(
    <Provider store={ store }>
        {/*
            <Router history={ history }>
                <Routes />
            </Router>
        */}
        <ConnectedRouter history={ history }>
            <div>
                <Route exact path="/" component={ App } />
                <Route path="/about" component={ Foo } />
                <Route path="/topics" component={ Bar } />
            </div>
        </ConnectedRouter>
    </Provider>,
    rootElement
)
