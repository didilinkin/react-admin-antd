// 首页内容
import React from 'react'
import {Row, Col, DatePicker} from 'antd'
import '../../common/style/test.less'
import HomeRentChart from '../components/HomeRentChart'
import HomeCollectFeeChart from '../components/HomeCollectFeeChart'
import rentLogo from '../../assets/images/rent.png'
import newPowerLogo from '../../assets/images/newPower.png'
import newSeatLogo from '../../assets/images/newSeat.png'
import fitmentLogo from '../../assets/images/fitment.png'
import moneyLogo from '../../assets/images/money.png'
import HomeHouseNowChart from '../components/HomeHouseNowChart'
import HomeRepairedInfoChart from '../components/HomeRepairedInfoChart'
const { MonthPicker } = DatePicker
class HomeContainers extends React.Component {
    render () {
        return (
            <div className="home-main-div" >
                <div className="home-main-box" >
                    <div className="charts-row">
                        <div className="charts-box-left" >
                            <HomeRentChart />
                        </div>
                        <div className="charts-box-right-box" >
                            <div className="charts-box-right" >
                                <div style={{height: '40px',
                                    borderBottom: '1px solid #EBEBEB'}}
                                >
                                    <span className="chart-title">房屋现状</span>
                                </div>
                                <div>
                                    <HomeHouseNowChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="charts-row">
                        <div className="charts-box-left" >
                            <HomeCollectFeeChart />
                        </div>
                        <div className="charts-box-right-box">
                            <HomeRepairedInfoChart />
                        </div>
                    </div>

                    <div className="otherFee">
                        <div className="otherFee-top">
                            <div className="otherFee-top-title">
                                其他费用
                            </div>
                            <div className="otherFee-top-picker">
                                选择月份：<MonthPicker placeholder="请选择月份" />
                            </div>
                        </div>
                        <div className="otherFee-bottom" >
                            <div className="otherFee-bottom-left">
                                <div className="otherFee-bottom-left-box">
                                    <img className="otherFee-bottom-image" src={moneyLogo} />
                                </div>
                            </div>
                            <div className="otherFee-bottom-right">
                                <div className="otherFee-bottom-right-parent" >
                                    <div className="otherFee-bottom-right-child" >
                                        <div className="otherFee-bottom-right-child-title">租金违约金</div>
                                        <div className="otherFee-bottom-right-child-subtitle">124,345</div>
                                    </div>
                                    <div className="otherFee-bottom-right-child" >
                                        <div className="otherFee-bottom-right-child-title">电费违约金</div>
                                        <div className="otherFee-bottom-right-child-subtitle">124,345</div>
                                    </div>
                                    <div className="otherFee-bottom-right-child" >
                                        <div className="otherFee-bottom-right-child-title">水费违约金</div>
                                        <div className="otherFee-bottom-right-child-subtitle">124,345</div>
                                    </div>
                                    <div className="otherFee-bottom-right-child" >
                                        <div className="otherFee-bottom-right-child-title">物业费违约金</div>
                                        <div className="otherFee-bottom-right-child-subtitle">124,345</div>
                                    </div>
                                    <div className="otherFee-bottom-right-child" >
                                        <div className="otherFee-bottom-right-child-title">施工监管费</div>
                                        <div className="otherFee-bottom-right-child-subtitle">124,345</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-bottom">
                        <Row gutter={24}>
                            <Col span={6}>
                                <CashDepositSurplus color="#1A9BFC" logo={rentLogo} title="租金保证金结余" number="177,486" />
                            </Col>
                            <Col span={6}>
                                <CashDepositSurplus color="#6ACA25" logo={newSeatLogo} title="欢乐颂保证金结余" number="177,486" />
                            </Col>
                            <Col span={6}>
                                <CashDepositSurplus color="#FECB2F" logo={newPowerLogo} title="能源管理押金结余" number="166,654" />
                            </Col>
                            <Col span={6}>
                                <CashDepositSurplus color="#FC361D" logo={fitmentLogo} title="装修押金结余" number="124,413" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeContainers

function CashDepositSurplus (props) {
    return (
        <div className="home-bottom-cord-div" style={{backgroundColor: props.color}} >
            <div>
                <img className="home-bottom-cord-img" src={props.logo} />
            </div>
            <div className="home-bottom-cord-titles" >
                <div className="home-bottom-cord-titles-title" >{props.title}</div>
                <div className="home-bottom-cord-titles-subtitle" >{props.number}</div>
            </div>
        </div>
    )
}
