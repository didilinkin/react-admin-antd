// 根文件
import React from 'react'
import { render } from 'react-dom'

import { createDevTools }                       from 'redux-devtools'
import LogMonitor                               from 'redux-devtools-log-monitor'
import DockMonitor                              from 'redux-devtools-dock-monitor'

import { createStore, combineReducers }         from 'redux'
import { Provider }                             from 'react-redux'

import { syncHistoryWithStore, routerReducer }  from 'react-router-redux'

import { Router, BrowserRouter }                from 'react-router-dom'

import rootReducer                              from './store/reducers'      // 根reducers
import Routes                                   from './router'

// react-router-redux
const reducer = combineReducers({
    ...rootReducer,
    routing: routerReducer
})

// redux-devtools
const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)

// redux
const store = createStore(
    reducer,
    DevTools.instrument()
)

// router
const history = syncHistoryWithStore(BrowserRouter, store)

const rootElement = document.getElementById('root')

render(
    <Provider store={ store }>
        <Router history={ history }>
            <Routes />
        </Router>
        <DevTools />
    </Provider>,
    rootElement
)
