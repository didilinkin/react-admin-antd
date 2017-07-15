import React from 'react'
import { Provider } from 'react-redux'
// import DevTools from '../../utils/DevTools' // 页面内调试工具; 如果要将调试器放在页面中, 则 引用此组件, 并且解开下方的注释(方便未安装chrome 或 火狐浏览器插件的 调试) => 目前开发使用chrome环境, 所以不使用 页内调试器

// 路由
import Routes from '../../router'

class Root extends React.Component {
    render () {
        const { store } = this.props

        return (
            <Provider store={store}>
                <div>
                    <Routes />
                    {/* <DevTools /> */}
                </div>
            </Provider>
        )
    }
}

export default Root
