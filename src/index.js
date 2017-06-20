import React        from 'react'
import ReactDOM     from 'react-dom'
import SetRouter    from './router/index'
import 'animate.css'

// alert(process.env.BABEL_ENV)

ReactDOM.render(
    <SetRouter />,
    document.getElementById('root')
)
