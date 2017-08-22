import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeRentChart extends React.Component {
    getOtion= () => {
        const option = {
            title: {
                text: '本年度 (2016-12 ~ 2017-11） 收租汇总',
                top: '10px'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['应收租金', '实收租金'],
                orient: 'vertical',
                right: '20px',
                top: '30px'
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    data: ['12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            color: ['#41B9F0', '#828DC2'],
            series: [
                {
                    name: '应收租金',
                    smooth: true,
                    showSymbol: false,
                    type: 'line',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210, 234, 290, 330, 310, 220]
                },
                {
                    name: '实收租金',
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                }
            ]
        }
        return option
    }
    render () {
        return (
            <ReactEcharts
                option={this.getOtion()}
                style={{height: '350px',
                    width: '750',
                    marginLeft: '20px'}}
            />
        )
    }
}
export default HomeRentChart
