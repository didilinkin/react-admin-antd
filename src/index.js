// 根文件
import React from 'react'
import { render } from 'react-dom'

import { authenticate } from './utils/LocalStore'
import { configureStore, history } from './store/configureStore/index'
import Root from './common/containers/Root'

import 'babel-polyfill'

const store = configureStore()
const authState = authenticate()

render(
    <Root
        store={ store }
        history={ history }
        isAuthenticate={ authState }
    />,
    document.getElementById('root')
)
