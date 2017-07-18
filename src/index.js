// 根文件
import React from 'react'
import { render } from 'react-dom'

// 验证 localStorage 状态
import { authenticate } from './utils/LocalStore'

import { configureStore, history } from './store/configureStore/index'
import Root from './common/containers/Root'
const store = configureStore()

let auth = () => {
    let authState = authenticate()
    console.log(authState)
}

auth()

render(
    <Root
        store={ store }
        history={ history }
    />,
    document.getElementById('root')
)
