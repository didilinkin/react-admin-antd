// 首页内容
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {Row, Col, DatePicker, Radio} from 'antd'
import '../../common/style/test.less'
import HomeRentChart from '../components/HomeRentChart'
import HomeCollectFeeChart from '../components/HomeCollectFeeChart'
import rentLogo from '../../assets/images/rent.png'
import newPowerLogo from '../../assets/images/newPower.png'
import newSeatLogo from '../../assets/images/newSeat.png'
import fitmentLogo from '../../assets/images/fitment.png'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
class HomeContainers extends React.Component {
    state = {
        showAppraise: true
    }
    getOtion= () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color: ['#EF877F', '#FDD67D', '#9CD685', '#5BBBF9'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 335,
                            name: '自用'
                        }, {
                            value: 310,
                            name: '已租'
                        }, {
                            value: 234,
                            name: '出售'
                        }, {
                            value: 135,
                            name: '空置'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }
    getOtion4 = () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#EF877F', '#FDD67D', '#9CD685', '#5BBBF9', '#D7D7D7'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    data: [
                        {
                            value: 335,
                            name: '作废工单'
                        }, {
                            value: 310,
                            name: '取消工单'
                        }, {
                            value: 234,
                            name: '未派单'
                        }, {
                            value: 135,
                            name: '已完工'
                        }, {
                            value: 148,
                            name: '进行中'
                        }
                    ]
                }
            ]
        }
        return option
    }
    getOtion3= () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color: ['#D7D7D7', '#FDD67D', '#9CD685', '#5BBBF9', '#EF877F', '#8B9AE1'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 335,
                            name: '1星'
                        }, {
                            value: 310,
                            name: '2星'
                        }, {
                            value: 234,
                            name: '3星'
                        }, {
                            value: 135,
                            name: '4星'
                        }, {
                            value: 265,
                            name: '5星'
                        }, {
                            value: 210,
                            name: '未评价'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return option
    }
    chooes = (e) => {
        this.setState({showAppraise: (e.target.value === 'a')})
        return ''
    }
    render () {
        return (
            <div className="examples"style={{backgroundColor: '#F2F2F2'}} >
                <div style={{height: '1200px',
                    width: '1220px',
                    margin: '0 auto'}}
                >
                    <div className="charts-box" >
                        <HomeRentChart />
                    </div>
                    <div className="charts-box-right" >
                        <div style={{height: '40px',
                            borderBottom: '1px solid #EBEBEB'}}
                        >
                            <span className="chart-title">房屋现状</span>
                        </div>
                        <div>
                            <ReactEcharts
                                option={this.getOtion()}
                                style={{height: '310px',
                                    width: '400',
                                    marginLeft: '20px'}}
                                className="react_for_echarts"
                            />
                        </div>

                    </div>
                    <div className="charts-box" >
                        <HomeCollectFeeChart />
                    </div>
                    <div className="charts-box-right" >
                        <div style={{height: '40px',
                            borderBottom: '1px solid #EBEBEB'}}
                        >
                            <span className="chart-title">客户报修汇总</span>
                        </div>
                        <div style={{marginTop: '20px',
                            height: '20px'}}
                        >
                            <div style={{float: 'left',
                                marginLeft: '10px'}}
                            >
                                <RadioGroup defaultValue="a" onChange={this.chooes}>
                                    <RadioButton value="a">报修统计</RadioButton>
                                    <RadioButton value="b">客户评价</RadioButton>
                                </RadioGroup>
                            </div>
                            <div style={{float: 'right',
                                width: '170px',
                                marginRight: '10px'}}
                            >
                                <RangePicker />
                            </div>
                        </div>
                        <div>
                            {this.state.showAppraise ? (
                                <ReactEcharts
                                    option={this.getOtion4()}
                                    style={{height: '270px',
                                        width: '400',
                                        marginLeft: '20px'}}
                                    className="react_for_echarts"
                                />) : (
                                <ReactEcharts
                                    option={this.getOtion3()}
                                    style={{height: '270px',
                                        width: '400',
                                        marginLeft: '20px'}}
                                    className="react_for_echarts"
                                />
                            )}
                        </div>
                    </div>
                    <div style={{backgroundColor: '#FFF',
                        height: '170px',
                        border: '1px solid #EBEBEB',
                        borderRadius: '4',
                        width: '1220px',
                        float: 'left',
                        marginTop: '20px'}}
                    >
                        <div style={{
                            marginTop: '20px',
                            marginBottom: '10px'}}
                        >
                            <div style={{
                                float: 'left',
                                marginLeft: '20px',
                                fontSize: '14px',
                                fontFamily: '\'Impact Normal\', \'Impact\''}}
                            >
                                其他费用
                            </div>
                            <div style={{
                                float: 'right',
                                marginRight: '20px'}}
                            >
                                选择月份：<DatePicker />
                            </div>
                        </div>
                        <hr style={{width: '100%'}} />
                        <div style={{width: '100%'}} >
                            <Row gutter={16}>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div style={{
                        height: '120px',
                        width: '1220px',
                        float: 'left',
                        margin: '20px 0'}}
                    >
                        <Row gutter={24}>
                            <Col className="gutter-row" span={6}>
                                <CashDepositSurplus color="#1A9BFC" logo={rentLogo} title="租金保证金结余" number="177,486" />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CashDepositSurplus color="#6ACA25" logo={newSeatLogo} title="欢乐颂保证金结余" number="177,486" />
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <CashDepositSurplus color="#FECB2F" logo={newPowerLogo} title="能源管理押金结余" number="166,654" />
                            </Col>
                            <Col className="gutter-row" span={6}>
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
        <div className="home-bottom-cord-div" style={{backgroundColor: props.color,
            borderRadius: '4px'}}
        >
            <div>
                <img style={{width: '55px',
                    height: '55px',
                    marginLeft: '25px',
                    marginTop: '27.5px'}} src={props.logo}
                />
            </div>
            <div style={{marginLeft: '100px',
                marginTop: '-55px'}}
            >
                <div style={{fontSize: '12px',
                    color: '#FFF'}}
                >{props.title}</div>
                <div style={{fontSize: '28px',
                    fontWeight: '500',
                    color: '#FFF',
                    marginTop: '-5px'}}
                >{props.number}</div>
            </div>
        </div>
    )
}
