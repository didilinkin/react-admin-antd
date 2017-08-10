// 根文件
import React from 'react'
import { render } from 'react-dom'

import localStore, { authenticate } from './utils/LocalStore'
import { configureStore, history } from './store/configureStore/index'
import Root from './common/containers/Root'

import 'babel-polyfill'

const store = configureStore()
const authState = authenticate()

// 清空 LS 中 Tabs数组
localStore.remove('arrayPreviousTabs')
localStore.remove('numTabsKey')

render(
    <Root
        store={ store }
        history={ history }
        isAuthenticate={ authState }
    />,
    document.getElementById('root')
)
