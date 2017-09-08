/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-06 03:22:07
 * @modify date 2017-09-06 03:22:07
 * @desc Tabs - 获取顶级 State
*/

import React from 'react'
// import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as panesActions from '../../../store/actions/panes'

import { getPanesState } from '../../../store/getters'

import TabsContainers from './TabsContainers'

const TabsBox = ({
    route,
    tabsProps,
    rootState,
    panesState,
    actions
}) => (
    <TabsContainers
        route={ route }
        tabsProps={ tabsProps }
        rootState={ rootState }
        // panes State
        panesState={ panesState }
        // actions
        onAddPane={ actions.addPane }
        onActivePane={ actions.activePane }
        onRemovePane={ () => actions.removePane(panesState) }
    />
)

const mapStateToProps = (state) => ({
    rootState: state, // 获取顶级 state
    panesState: getPanesState(state) // 获取 Panes的 state
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(panesActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabsBox)
