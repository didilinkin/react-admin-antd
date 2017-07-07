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
        name: 'Page A',
        pv: 100,
        amt: 600
    }, {
        name: 'Page B',
        pv: 121,
        amt: 121
    }, {
        name: 'Page C',
        pv: 88,
        amt: 88
    }
]

// 本周 数据
// const dateB = [
//     {
//         name: 'Page A',
//         pv: 200,
//         amt: 200
//     }, {
//         name: 'Page B',
//         pv: 250,
//         amt: 250
//     }, {
//         name: 'Page C',
//         pv: 220,
//         amt: 250
//     }
// ]

// 某个时间段 数据
// const dateC = [
//     {
//         name: 'Page A',
//         pv: 300,
//         amt: 300
//     }, {
//         name: 'Page B',
//         pv: 350,
//         amt: 350
//     }, {
//         name: 'Page C',
//         pv: 320,
//         amt: 350
//     }
// ]

class SimpleBarChart extends React.Component {
    render () {
        return (
            <div>
                <BarChart width={ 600 } height={ 300 } data={ dateA }
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
                    <Bar dataKey="pv" fill="#8884d8" />
                </BarChart>
            </div>
        )
    }
}

export default SimpleBarChart
