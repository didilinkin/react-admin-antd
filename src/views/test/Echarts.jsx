// echarts-react 测试组件
import React from 'react'
import ReactEcharts from 'echarts-for-react'

class Echarts extends React.Component {
    getOtion = () => {
        const option = {
            title: {
                text: '客户评价情况',
                subtext: ' ',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: 335,
                            name: '直接访问'},
                        {value: 310,
                            name: '邮件营销'},
                        {value: 234,
                            name: '联盟广告'},
                        {value: 135,
                            name: '视频广告'},
                        {value: 1548,
                            name: '搜索引擎'}
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
    onChartClick = () => function (param, echart) {
        console.log(param, echart)
        alert('chart click')
    }
    onChartLegendselectchanged = () => function (param, echart) {
        console.log(param, echart)
        alert('chart legendselectchanged')
    }
    onChartReady = () => function (echart) {
        console.log('echart is ready', echart)
    }

    render () {
        return (
            <div className="examples">
                <div className="parent">
                    <ReactEcharts
                        option={ this.getOtion() }
                        style={{
                            height: '350px',
                            width: '350px'
                        }}
                        className="react_for_echarts"
                    />
                </div>
            </div>
        )
    }
}

export default Echarts
