// 收费管理 - 物业费管理
import React, {Component} from 'react'
import { Tabs } from 'antd'
import PropertyFeeing from './PropertyFee/PropertyFeeing'
import PropertyFeeConduct from './PropertyFee/PropertyFeeConduct'
import PropertyFeeFail from './PropertyFee/PropertyFeeFail'
import PropertyFeeSuccess from './PropertyFee/PropertyFeeSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class PropertyFee extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    callback = (key) => {
        console.log(key)
    }
    render () {
        return (<Tabs onChange={() => this.callback}>
            <TabPane tab="待收费" key="1"><PropertyFeeing /></TabPane>
            <TabPane tab="审核中" key="2"><PropertyFeeConduct /></TabPane>
            <TabPane tab="审核失败" key="3"><PropertyFeeFail /></TabPane>
            <TabPane tab="审核成功" key="4"><PropertyFeeSuccess /></TabPane>
        </Tabs>
        )
    }
}
export default PropertyFee


