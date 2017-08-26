//  保证金管理
import React, {Component} from 'react'
import { Tabs  } from 'antd'
import CashDepositRent from './CashDepositRent'
import CashDepositProperty from './CashDepositProperty'
import CashDepositSong from './CashDepositSong'
// 引入组件
const TabPane = Tabs.TabPane
// React component
class MarginManagement extends Component {
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
            <TabPane tab="租赁保证金" key="1"><CashDepositRent/></TabPane>
            <TabPane tab="能源管理押金" key="2"><CashDepositProperty/></TabPane>
            <TabPane tab="欢乐颂管理押金" key="3"><CashDepositSong/></TabPane>
        </Tabs>
        )
    }
}
export default MarginManagement


