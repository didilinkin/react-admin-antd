// 收费管理 - 应收租金
import React, {Component} from 'react'
import { Tabs  } from 'antd'
import CollectRentFinanceConduct from './CollectRentFinanceConduct'
import CollectRentFinanceFail from './CollectRentFinanceFail'
import CollectRentFinanceSuccess from './CollectRentFinanceSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class RentReview extends Component {
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
            <TabPane tab="待审核" key="1"><CollectRentFinanceConduct /></TabPane>
            <TabPane tab="审核失败" key="2"><CollectRentFinanceFail /></TabPane>
            <TabPane tab="审核成功" key="3"><CollectRentFinanceSuccess /></TabPane>
        </Tabs>
        )
    }
}
export default RentReview


