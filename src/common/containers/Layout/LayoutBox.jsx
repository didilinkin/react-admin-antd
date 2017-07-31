// 测试 获取顶级 state
import React from 'react'
import { connect } from 'react-redux'

import LayoutContainers from './LayoutContainers'

const LayoutBox = ({ route, rootState }) => (
    <LayoutContainers
        rootState={ rootState }
        route={ route }
    />
)

const mapStateToProps = (state) => ({
    rootState: state // 获取顶级 state
})

export default connect(
    mapStateToProps
)(LayoutBox)
