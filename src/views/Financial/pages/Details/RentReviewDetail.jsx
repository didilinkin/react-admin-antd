// [详情] - 财务管理 - 租金审核
// 报修明细
import React from 'react'
import '../../../../style/test.less'
import AfterAudit from  '../components/AfterAudit'
import InReview from '../components/InReview'
import PaymentSuccess from '../components/PaymentSuccess'


class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            none1: 'none',
            none2: 'none',
            none3: ''
        }
    }
    render () {
        return (
            <div>
                <InReview style={{display: this.state.none1}} />
                <AfterAudit style={{display: this.state.none2}} />
                <PaymentSuccess style={{display: this.state.none3}} />
            </div>
        )
    }
}

export default App


