/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 12:31:47
 * @modify date 2017-09-01 12:49:39
 * @desc 测试向下传递数据
*/
import React from 'react'

import { Row, Col } from 'antd'

import Thermometers from './Thermometers'
import Control from './Control'
import Mode from './Mode'

class The extends React.Component {
    render () {
        return (
            <Row style={{ padding: '1rem' }} type="flex" justify="space-around">
                <Col span={ 4 }> <Thermometers value={ 123 } /> </Col> {/* 向下传递 温度(数值类型) */}
                <Col span={ 4 }> <Control controlState={ false } /> </Col> {/* 向下传递 开关状态(布尔类型) */}
                <Col span={ 4 }> <Mode modeState={ '1' } /> </Col> {/* 向下传递 模式类型(数值类型) */}
            </Row>
        )
    }
}

export default The
