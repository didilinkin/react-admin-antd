// 收费管理 - 物业费管理
import React, {Component} from 'react'
import { Tabs  } from 'antd'
import PropertyFeeing from './PropertyFeeing'
import PropertyFeeConduct from './PropertyFeeConduct'
import PropertyFeeFail from './PropertyFeeFail'
import PropertyFeeSuccess from './PropertyFeeSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class ReceivableRent extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    callback = (key) => {
        console.log(key)
    }
    render () {
        return (<Tabs defaultActiveKey="1" onChange={() => this.callback}>
            <TabPane tab="待收费" key="1"><PropertyFeeing /></TabPane>
            <TabPane tab="审核中" key="2"><PropertyFeeConduct /></TabPane>
            <TabPane tab="审核失败" key="3"><PropertyFeeFail /></TabPane>
            <TabPane tab="审核成功" key="4"><PropertyFeeSuccess /></TabPane>
        </Tabs>
        )
    }
}
export default ReceivableRent


