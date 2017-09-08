import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeRentChart extends React.Component {
    state = {
        option: {
            title: {
                text: '本年度 (2016-12 ~ 2017-11） 收租汇总',
                top: '10px',
                left: '20px'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                bottom: '40px'
            },
            legend: {
                data: [{
                    name: '应收租金',
                    icon: 'circle'
                }, {
                    name: '实收租金',
                    icon: 'circle'
                }],
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
                    data: []
                },
                {
                    name: '实收租金',
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    areaStyle: {normal: {}},
                    data: []
                }
            ]
        }
    }
    componentWillReceiveProps (nextPorps) {
        console.log(nextPorps.rent.year)
        let option = this.state.option
        let yearNumber = nextPorps.rent.year ? nextPorps.rent.year.substring(0, 4) : 0
        option.title.text = '本年度 (' + yearNumber + '-12 ~ ' + (parseInt(yearNumber, 0) + 1) + '-11） 收租汇总'
        option.series[0].data = nextPorps.rent.receivable
        option.series[1].data = nextPorps.rent.actualReceipt
    }
    render () {
        return (
            <div className="charts-box-left" >
                <ReactEcharts
                    className="charts-left"
                    style={{height: '350px'}}
                    option={this.state.option}
                />
            </div>
        )
    }
}
export default HomeRentChart
