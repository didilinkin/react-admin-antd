import React from 'react'
import rentLogo from '../../assets/images/rent.png'
import newPowerLogo from '../../assets/images/newPower.png'
import newSeatLogo from '../../assets/images/newSeat.png'
import fitmentLogo from '../../assets/images/fitment.png'
import {Row, Col} from 'antd'
class HomeBottomCard extends React.Component {
    state = {
        cashDepositSurplus: {
            rentSurplus: 0,
            odeToJoySurplus: 0,
            energyManageSurplus: 0,
            fitmentSurplus: 0
        }
    }
    componentWillReceiveProps (nextPorps) {
        this.setState({cashDepositSurplus: nextPorps.cashDepositSurplus})
    }

    formatMoney = (number) => {
        if (number) {
            let negative = number < 0 ? '-' : ''
            let numberString = parseInt(number, 0)
            negative = negative + (numberString || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            return negative + '.' + number.toFixed(2).slice(-2)
        }
        return 0
    }
    render () {
        return (
            <div className="home-bottom">
                <Row gutter={24}>
                    <Col span={6}>
                        <CashDepositSurplus color="#1A9BFC" logo={rentLogo} title="租金保证金结余" number={this.formatMoney(this.state.cashDepositSurplus.rentSurplus)} />
                    </Col>
                    <Col span={6}>
                        <CashDepositSurplus color="#6ACA25" logo={newSeatLogo} title="欢乐颂保证金结余" number={this.formatMoney(this.state.cashDepositSurplus.odeToJoySurplus)} />
                    </Col>
                    <Col span={6}>
                        <CashDepositSurplus color="#FECB2F" logo={newPowerLogo} title="能源管理押金结余" number={this.formatMoney(this.state.cashDepositSurplus.energyManageSurplus)} />
                    </Col>
                    <Col span={6}>
                        <CashDepositSurplus color="#FC361D" logo={fitmentLogo} title="装修押金结余" number={this.formatMoney(this.state.cashDepositSurplus.fitmentSurplus)} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HomeBottomCard

function CashDepositSurplus (props) {
    return (
        <div className="home-bottom-cord-div" style={{backgroundColor: props.color}} >
            <div>
                <img className="home-bottom-cord-img" src={props.logo} alt="" />
            </div>
            <div className="home-bottom-cord-titles" >
                <div className="home-bottom-cord-titles-title" >{props.title}</div>
                <div className="home-bottom-cord-titles-subtitle" >{props.number}</div>
            </div>
        </div>
    )
}
