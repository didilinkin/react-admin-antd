// 收费管理 - 物业费管理
import React, {Component} from 'react'
import { Tabs  } from 'antd'
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
            <TabPane tab="待收费" key="1"></TabPane>
            <TabPane tab="审核中" key="2"></TabPane>
            <TabPane tab="审核失败" key="3"></TabPane>
            <TabPane tab="审核成功" key="4"></TabPane>
        </Tabs>
        )
    }
}
export default ReceivableRent


