// '物业管理系统' 内容 - 首页( 测试页 )
import React from 'react'

import styled       from 'styled-components'

const Tilte = styled.h2`
    font-size: 1rem
    color: red
`

class HomeTest extends React.Component {
    render () {
        return (
            <Tilte>
                这是测试内容( 模版内的 )
            </Tilte>
        )
    }
}

export default HomeTest