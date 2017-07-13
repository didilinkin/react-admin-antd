// 收费管理 - 应收租金
import React, {Component} from 'react'
import { Tabs  } from 'antd'
import CollectRenting from './CollectRenting'
import CollectRentConduct from './CollectRentConduct'
import CollectRentFail from './CollectRentFail'
import CollectRentSuccess from './CollectRentSuccess'
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
            <TabPane tab="待收租" key="1"><CollectRenting /></TabPane>
            <TabPane tab="审核中" key="2"><CollectRentConduct /></TabPane>
            <TabPane tab="审核失败" key="3"><CollectRentFail /></TabPane>
            <TabPane tab="审核成功" key="4"><CollectRentSuccess /></TabPane>
        </Tabs>
        )
    }
}
export default ReceivableRent


