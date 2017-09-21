// 收费管理 - 物业费管理
import React from 'react'
import { Tabs } from 'antd'
import PropertyFeeing from './PropertyFee/PropertyFeeing'
import PropertyFeeConduct from './PropertyFee/PropertyFeeConduct'
import PropertyFeeFail from './PropertyFee/PropertyFeeFail'
import PropertyFeeSuccess from './PropertyFee/PropertyFeeSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class PropertyFee extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            key: 0
        }
    }
    callback = (key) => {
        this.setState({
            key: key
        })
    }
    render () {
        return (<Tabs onChange={this.callback}>
            <TabPane tab="待收费" key="1"><PropertyFeeing key={this.state.key} /></TabPane>
            <TabPane tab="审核中" key="2"><PropertyFeeConduct key={this.state.key} /></TabPane>
            <TabPane tab="审核失败" key="3"><PropertyFeeFail key={this.state.key} /></TabPane>
            <TabPane tab="审核成功" key="4"><PropertyFeeSuccess key={this.state.key} /></TabPane>
        </Tabs>
        )
    }
}
export default PropertyFee


