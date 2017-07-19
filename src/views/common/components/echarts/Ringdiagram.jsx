// 环形图(测试案例, 应用于首页)

import React from 'react'
import ReactEcharts from 'echarts-for-react'

import styled       from 'styled-components'

const ParentBox = styled.div `
    position: relative;
`

const ParentEmphasis = styled.div `
    position: absolute;
    top: 52%;
    width: 100%;
    text-align: center;
`

const EmphasisTitle = styled.h2 `
    font-size: 1rem;
`

const EmphasisTitleP = styled.p `
    color: #989898;
`

const Ringdiagram = React.createClass({
    propTypes: {},
    getOtion: function () {
        const option = {
            title: {
                text: '客户报修情况',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            color: [
                '#49a9ee', '#d7d7d7', '#98d87d', '#ffd86e', '#f3857b'
            ],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 335,
                            name: '未派单'
                        }, {
                            value: 310,
                            name: '已完工'
                        }, {
                            value: 234,
                            name: '进行中'
                        }, {
                            value: 135,
                            name: '取消工单'
                        }, {
                            value: 548,
                            name: '作废工单'
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
    },
    onChartClick: function (param, echart) {
        console.log(param, echart)
        alert('chart click')
    },
    onChartLegendselectchanged: function (param, echart) {
        console.log(param, echart)
        alert('chart legendselectchanged')
    },
    onChartReady: function (echart) {
        console.log('echart is ready', echart)
    },
    render: function () {
        let onEvents = {
            'click': this.onChartClick,
            'legendselectchanged': this.onChartLegendselectchanged
        }

        return (
            <div className="examples" style={{
                width: '50%',
                float: 'left'}}
            >
                <ParentBox className="parent">
                    <ReactEcharts
                        option={this.getOtion()}
                        style={{ height: 300 }}
                        onChartReady={this.onChartReady}
                        onEvents={onEvents}
                    />

                    <ParentEmphasis>
                        <EmphasisTitle> 200 </EmphasisTitle>
                        <EmphasisTitleP> 报修总数 </EmphasisTitleP>
                    </ParentEmphasis>
                </ParentBox>
            </div>
        )
    }
})

export default Ringdiagram
