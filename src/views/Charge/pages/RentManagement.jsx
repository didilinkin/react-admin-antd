// 收费管理 - 租金管理
import React from 'react'
import AfterAudit from  './components/AfterAudit'
import InReview from './components/InReview'
import PaymentSuccess from './components/PaymentSuccess'

class RentManagement extends React.Component {
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
export default RentManagement
