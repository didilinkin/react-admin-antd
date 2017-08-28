<<<<<<< HEAD
// 根文件
import React from 'react'
import { render } from 'react-dom'
=======
import React from 'react'
import ReactDOM from 'react-dom'
import SetRouter from './router/index'
import 'animate.css'
>>>>>>> cd084c6aa42d6ffc4aa871e42ae8952a3a7d3c7a

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
