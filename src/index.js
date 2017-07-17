// 根文件
import React from 'react'
import { render } from 'react-dom'

import { configureStore, history } from './store/configureStore/index'
import Root from './containers/Root/index'

const store = configureStore()

render(
    <Root
        store={ store }
        history={ history }
    />,
    document.getElementById('root')
)
