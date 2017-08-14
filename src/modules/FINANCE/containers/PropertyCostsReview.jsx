// 收费管理 - 物业费审核
import React from 'react'
import { Tabs } from 'antd'
import PropertyFeeFinanceConduct from './PropertyFee/PropertyFeeFinanceConduct'
import PropertyFeeFinanceFail from './PropertyFee/PropertyFeeFinanceFail'
import PropertyFeeFinanceSuccess from './PropertyFee/PropertyFeeFinanceSuccess'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class PropertyCostsReview extends React.Component {
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
            <TabPane tab="待审核" key="1"><PropertyFeeFinanceConduct pro={this.props} /></TabPane>
            <TabPane tab="审核失败" key="2"><PropertyFeeFinanceFail pro={this.props} /></TabPane>
            <TabPane tab="审核成功" key="3"><PropertyFeeFinanceSuccess pro={this.props} /></TabPane>
        </Tabs>
        )
    }
}
export default PropertyCostsReview


