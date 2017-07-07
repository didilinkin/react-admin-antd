// 简单的柱状图 案例 - 来自 recharts
import React from 'react'
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
        name: '电梯系统',
        '故障台数': 100,
        amt: 600
    }, {
        name: '电器系统',
        '故障台数': 121,
        amt: 121
    }, {
        name: '空调系统',
        '故障台数': 88,
        amt: 88
    }
]

// 本周 数据
const dateB = [
    {
        name: '电梯系统',
        '故障台数': 200,
        amt: 200
    }, {
        name: '电器系统',
        '故障台数': 250,
        amt: 250
    }, {
        name: '空调系统',
        '故障台数': 220,
        amt: 220
    }
]

// 某个时间段 数据
const dateC = [
    {
        name: '电梯系统',
        '故障台数': 300,
        amt: 300
    }, {
        name: '电器系统',
        '故障台数': 350,
        amt: 350
    }, {
        name: '空调系统',
        '故障台数': 320,
        amt: 320
    }
]

class SimpleBarChart extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data: dateA
        }

        this.todayData = this.todayData.bind(this)
        this.yesterdayData = this.yesterdayData.bind(this)
        this.intervalData = this.intervalData.bind(this)
    }

    todayData () {
        this.setState({data: dateA})
    }

    yesterdayData () {
        this.setState({data: dateB})
    }

    intervalData () {
        this.setState({data: dateC})
    }

    render () {
        return (
            <div>
                <button style={{ marginRight: '1rem' }} onClick={ this.todayData }> 今日 </button>

                <button style={{ marginRight: '1rem' }} onClick={ this.yesterdayData }> 本周 </button>

                <button style={{ marginRight: '1rem' }} onClick={ this.intervalData }> 某个区间(可以用日期选择器选择出时间区间) </button>

                <BarChart width={ 600 } height={ 300 } data={ this.state.data }
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
        )
    }
}

export default SimpleBarChart
