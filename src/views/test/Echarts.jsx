// echarts-react 测试组件
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { PieChart, Pie, Cell } from 'recharts'
const data = [
    {
        name: 'Group A',
        value: 400
    }, {
        name: 'Group B',
        value: 300
    }, {
        name: 'Group C',
        value: 300
    }, {
        name: 'Group D',
        value: 200
    }
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

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
                <div style={{'float': 'left'}}>
                    <h2 style={{ 'lineHeight': 'normal',
                        'fontSize': '18px',
                        'color': '#333'}}>test</h2>
                    <PieChart width={ 400 } height={ 400 } onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={ data }
                            cx={ 130 }
                            cy={ 190 }
                            labelLine={ false }
                            label={ renderCustomizedLabel }
                            outerRadius={ 100 }
                            fill="#8884d8"
                        >
                            {
                                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                </div>
                <div className="parent" style={{'float': 'left'}}>
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
