import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeHouseNowChart extends React.Component {
    state = {
        option: {
            tooltip: {
                trigger: 'item',
                formatter: '{b}统计 <br/>{c}间 ({d}%)'
            },
            color: ['#EF877F', '#53ABE8', '#FDD67D', '#9CD685'],
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
    }
    componentWillReceiveProps (nextPorps) {
        let option = this.state.option
        option.series[0].data = nextPorps.buildingNow
    }
    render () {
        return (
            <div className="charts-box-right" >
                <div style={{height: '40px',
                    borderBottom: '1px solid #EBEBEB'}}
                >
                    <span className="chart-title">房屋现状</span>
                </div>
                <div>
                    <ReactEcharts
                        option={this.state.option}
                        className="echart"
                    />
                </div>
            </div>
        )
    }
}
export default HomeHouseNowChart
