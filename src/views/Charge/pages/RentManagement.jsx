// 收费管理 - 租金管理
import React from 'react'
import AfterAudit from  '../components/AfterAudit'
import InReview from '../components/InReview'
import PaymentSuccess from '../components/PaymentSuccess'

class RentManagement extends React.Component {
    render () {
        return (
            <div>
                <InReview value={1} />
                <AfterAudit value={2} />
                <PaymentSuccess value={3}/>
            </div>
        )
    }
}
export default RentManagement
