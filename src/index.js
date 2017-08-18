// 根文件
import React from 'react'
import { render } from 'react-dom'

import { authenticate } from './utils/LocalStore'
import { myBrowser } from './utils'
import { configureStore, history } from './store/configureStore/index'
import Root from './common/containers/Root'

import 'babel-polyfill'

const store = configureStore()
const authState = authenticate()

const versions = myBrowser()

if (versions === 'IE55' || versions === 'IE6' || versions === 'IE7' || versions === 'IE8') {
    history.push('/navigator')
}

render(
    <Root
        store={ store }
        history={ history }
        isAuthenticate={ authState }
    />,
    document.getElementById('root')
)
