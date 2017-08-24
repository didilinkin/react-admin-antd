import React from 'react'
import ReactEcharts from 'echarts-for-react'
class HomeHouseNowChart extends React.Component {
    getOtion= () => {
        const option = {
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
        return option
    }
    render () {
        return (
            <ReactEcharts
                option={this.getOtion()}
                style={{height: '310px',
                    width: '400',
                    marginLeft: '20px'}}
                className="react_for_echarts"
            />
        )
    }
}
export default HomeHouseNowChart
