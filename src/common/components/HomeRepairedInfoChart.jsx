import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {DatePicker, Radio} from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const {RangePicker } = DatePicker
class HomeRepairedInfoChart extends React.Component {
    state = {
        showAppraise: true
    }
    getOtion = () => {
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#EF877F', '#FDD67D', '#5BBBF9', '#D7D7D7', '#9CD685'],
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
            color: ['#5BBBF9', '#D7D7D7', '#9CD685', '#FDD67D', '#EF877F', '#8B9AE1'],
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
                            option={this.getOtion()}
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
        )
    }
}

export default HomeRepairedInfoChart
