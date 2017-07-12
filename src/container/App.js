import React from 'react'
// import { Link } from 'react-router-dom'
// import { push } from 'react-router-redux'

// 测试 react-router-redux-dom-link 依赖测试 <Link>
import Link from 'react-router-redux-dom-link'

const App = ({ children }) => (
    <div>
        <header>
            Links:
            {' '}
            <Link to="/">Home</Link>
            {' '}
            <Link to="/foo">Foo</Link>
            {' '}
            <Link to="/bar">Bar</Link>
        </header>
        <div>
            {/* 未完成 事件 改变 store */}
            {/* <button onClick={() => history.push('/foo')}>Go to /foo</button> */}
            {/* <button onClick={ () => store.dispatch(push('/foo')) }>Go to /foo</button> */}
        </div>
        <div style={{ marginTop: '1.5em' }}>
            {children}
        </div>
    </div>
)

export default App
