// echarts-react 测试组件
import React from 'react'
import ReactEcharts from 'echarts-for-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'
// 今日 数据
const dateA = [
    {
        name: '电器系统',
        '故障台数': 10
    }, {
        name: '电梯系统',
        '故障台数': 12
    }, {
        name: '空调系统',
        '故障台数': 8
    }, {
        name: '水暖系统',
        '故障台数': 1
    }, {
        name: '消防监控系统',
        '故障台数': 14
    }
]

// 本周 数据
const dateB = [
    {
        name: '电器系统',
        '故障台数': 20
    }, {
        name: '电梯系统',
        '故障台数': 25
    }, {
        name: '空调系统',
        '故障台数': 22
    }, {
        name: '水暖系统',
        '故障台数': 11
    }, {
        name: '消防监控系统',
        '故障台数': 12
    }
]

// 某个时间段 数据
const dateC = [
    {
        name: '电器系统',
        '故障台数': 30
    }, {
        name: '电梯系统',
        '故障台数': 40
    }, {
        name: '空调系统',
        '故障台数': 32
    }, {
        name: '水暖系统',
        '故障台数': 6
    }, {
        name: '消防监控系统',
        '故障台数': 22
    }
]
class Echarts extends React.Component {
    constructor (props) {
        super(props)

        this.todayData = this.todayData.bind(this)
        this.yesterdayData = this.yesterdayData.bind(this)
        this.intervalData = this.intervalData.bind(this)
        this.state = {
            data1: dateA,
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
    }
    todayData () {
        this.setState({data1: dateA})
    }

    yesterdayData () {
        this.setState({data1: dateB})
    }

    intervalData () {
        this.setState({data1: dateC})
    }
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
                    data: this.state.data,
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
            <div className="examples">
                <div>
                    <div style={{'float': 'left',
                        'width': '350px',
                        'height': '350px'}}>
                        <h2 style={{ 'lineHeight': 'normal',
                            'fontSize': '18px',
                            'color': '#333'}}>客户报修情况</h2>
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
                    <p className="clearfix" />
                </div>

                <div>
                    <h2 style={{ 'lineHeight': 'normal',
                        'fontSize': '18px',
                        'color': '#333'}}>设备故障情况</h2>
                    <div>
                        <p style={{'padding': '15px 0'}}>
                            <a style={{ marginRight: '1rem' }} onClick={ this.todayData }> 今日 </a>
                            <a style={{ marginRight: '1rem' }} onClick={ this.yesterdayData }> 本周 </a>
                            <a style={{ marginRight: '1rem' }} onClick={ this.intervalData }> 某个区间(可以用日期选择器选择出时间区间) </a>
                        </p>
                        <BarChart width={ 600 } height={ 400 } data={ this.state.data1 }
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="故障台数" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        )
    }
}

export default Echarts
