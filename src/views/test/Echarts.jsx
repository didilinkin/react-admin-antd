import React, { Component } from 'react'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import  'echarts/lib/chart/bar'
import  'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

class EchartsTest extends Component {
    componentDidMount () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
            title: { text: '客户报修情况' },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        })

        // 基于准备好的dom，初始化echarts实例
        let myChart1 = echarts.init(document.getElementById('main1'))
        // 绘制图表
        myChart1.setOption({
            title: { text: '设备故障情况' },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                show: true,
                orient: 'vertical',
                left: '10px',
                top: '50px',
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
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
                    ]
                }
            ]
        })
    }
    render () {
        return (
            <div>
                <div id="main1" style={{ width: 400,
                    height: 400 }}
                />
                <div id="main" style={{ width: 400,
                    height: 400 }}
                />
            </div>
        )
    }
}

export default EchartsTest
