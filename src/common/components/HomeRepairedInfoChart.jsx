import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {DatePicker, Radio} from 'antd'
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const {RangePicker } = DatePicker
class HomeRepairedInfoChart extends React.Component {
    state = {
        showAppraise: true,
        repair: {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            grid: {
                bottom: '20%',
                left: '10%',
                right: '10%',
                top: '0%'
            },
            color: ['#EF877F', '#FDD67D', '#5BBBF9', '#D7D7D7', '#9CD685'],
            series: [
                {
                    name: '报修统计',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    data: []
                }
            ]
        },
        appraise: {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            grid: {
                bottom: '20%',
                left: '10%',
                right: '10%',
                top: '0%'
            },
            color: ['#5BBBF9', '#D7D7D7', '#9CD685', '#FDD67D', '#EF877F', '#8B9AE1'],
            series: [
                {
                    name: '评价等级',
                    type: 'pie',
                    radius: '70%',
                    data: [],
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
    }
    componentWillReceiveProps (nextPorps) {
        let repair = this.state.repair
        let appraise = this.state.appraise
        repair.series[0].data = nextPorps.repairStatistics
        appraise.series[0].data = nextPorps.appraise
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
                            option={this.state.repair}
                            style={{height: '270px',
                                width: '400px'}}
                            className="echart"
                        />) : (
                        <ReactEcharts
                            option={this.state.appraise}
                            style={{height: '270px',
                                width: '400px'}}
                            className="echart"
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default HomeRepairedInfoChart
