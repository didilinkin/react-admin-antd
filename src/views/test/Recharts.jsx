// Recharts 测试组件 - 测试饼状图
import React from 'react'
import {
    PieChart,
    Pie,
    // Sector,
    Cell
} from 'recharts'

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

class PieChartWithCustomizedLabel extends React.Component {
    render () {
        return (
            <div>
                <h1> 使用 recharts组件 创建一个饼状图 案例( recharts组件可用 ) </h1>
                <PieChart width={ 800 } height={ 400 } onMouseEnter={this.onPieEnter}>
                    <Pie
                        data={ data }
                        cx={ 300 }
                        cy={ 200 }
                        labelLine={ false }
                        label={ renderCustomizedLabel }
                        outerRadius={ 80 }
                        fill="#8884d8"
                    >
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                </PieChart>
            </div>
        )
    }
}

export default PieChartWithCustomizedLabel
