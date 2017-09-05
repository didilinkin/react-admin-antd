import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeHouseNowChart extends React.Component {
    state = {
        option: {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.data.name + '统计<br/>' + params.data.rooms + '间(' + params.data.value + 'm²)'
                }
            },
            grid: {
                bottom: '20%',
                left: '10%',
                right: '10%',
                top: '0%'
            },
            color: ['#EF877F', '#53ABE8', '#FDD67D', '#9CD685'],
            series: [
                {
                    name: '访问来源',
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
        let option = this.state.option
        console.log(nextPorps.buildingNow)
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
