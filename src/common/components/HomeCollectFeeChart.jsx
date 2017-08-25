import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeCollectFeeChart extends React.Component {
    state = {
        option: {
            title: {
                text: '本年度物业收费汇总',
                top: '10px'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [{
                    name: '物业费',
                    icon: 'circle'
                }, {
                    name: '空调费',
                    icon: 'circle'
                }, {
                    name: '电梯费',
                    icon: 'circle'
                }, {
                    name: '水费',
                    icon: 'circle'
                }, {
                    name: '电费',
                    icon: 'circle'
                }],
                right: '20px',
                top: '20px'
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    data: ['第一季度', '第二季度', '第三季度', '第四季度']
                }
            ],
            gard: {
                top: '20px',
                left: '3%',
                right: '4%'
            },
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#F1F1F1'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            color: ['#6ACA25', '#4DBFF0', '#FC0D1B', '#FECB2F', '#996CFB'],
            series: [
                {
                    name: '物业费',
                    type: 'bar',
                    data: []
                }, {
                    name: '空调费',
                    type: 'bar',
                    data: []
                }, {
                    name: '电梯费',
                    type: 'bar',
                    data: []
                }, {
                    name: '水费',
                    type: 'bar',
                    data: []
                }, {
                    name: '电费',
                    type: 'bar',
                    data: []
                }
            ]
        }
    }
    componentWillReceiveProps (nextPorps) {
        let option = this.state.option
        option.series[0].data = nextPorps.collectFee.property
        option.series[1].data = nextPorps.collectFee.water
        option.series[2].data = nextPorps.collectFee.power
        option.series[3].data = nextPorps.collectFee.elevator
    }
    render () {
        return (
            <div className="charts-box-left" >
                <ReactEcharts
                    className="charts-left"
                    option={this.state.option}
                />
            </div>
        )
    }
}
export default HomeCollectFeeChart
