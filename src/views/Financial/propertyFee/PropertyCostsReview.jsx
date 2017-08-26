// 收费管理 - 物业费审核
import React, {Component} from 'react'
import { Tabs  } from 'antd'
import PropertyFeeFinanceConduct from './PropertyFeeFinanceConduct'
import PropertyFeeFinanceFail from './PropertyFeeFinanceFail'
import PropertyFeeFinanceSuccess from './PropertyFeeFinanceSuccess'
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
            <TabPane tab="待审核" key="1"><PropertyFeeFinanceConduct /></TabPane>
            <TabPane tab="审核失败" key="2"><PropertyFeeFinanceFail /></TabPane>
            <TabPane tab="审核成功" key="3"><PropertyFeeFinanceSuccess /></TabPane>
        </Tabs>
        )
    }
}
export default ReceivableRent


