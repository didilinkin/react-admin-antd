import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeCollectFeeChart extends React.Component {
    getOtion = () => {
        const option = {
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
                    data: [20000, 49000, 70000, 67000]
                }, {
                    name: '空调费',
                    type: 'bar',
                    data: [30000, 43000, 73000, 43000]
                }, {
                    name: '电梯费',
                    type: 'bar',
                    data: [34000, 43900, 45000, 52000]
                }, {
                    name: '水费',
                    type: 'bar',
                    data: [26000, 46900, 60000, 60000]
                }, {
                    name: '电费',
                    type: 'bar',
                    data: [23600, 59000, 40000, 54300]
                }
            ]
        }
        return option
    }
    render () {
        return (
            <ReactEcharts
                className="echart"
                option={this.getOtion()}
                style={{height: '350px',
                    marginLeft: '20px'}}
            />
        )
    }
}
export default HomeCollectFeeChart
