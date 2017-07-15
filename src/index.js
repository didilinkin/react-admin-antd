// 根文件
import React from 'react'
import { render } from 'react-dom'

import configureStore from './store/configureStore/index'
import Root from './containers/Root'

const store = configureStore()

render(
    <Root store={ store } />,
    document.getElementById('root')
)
