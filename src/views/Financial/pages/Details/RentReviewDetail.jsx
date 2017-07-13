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
            mode: '1'
        }
    }
    render () {
        return (
            <div>
                <InReview value={1} />
                <AfterAudit value={2} />
                <PaymentSuccess value={3} />
            </div>
        )
    }
}

export default App


