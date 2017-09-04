/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 12:31:47
 * @modify date 2017-09-01 12:49:39
 * @desc 测试向下传递数据
*/
import React from 'react'

import { Row, Col } from 'antd'

import {
    Thermometers,
    Control,
    Mode,
    WindSpeed,
    SetTemperature
} from './Hardware'

import styled from 'styled-components'
import elf from '../../elf'

class The extends React.Component {
    render () {
        return (
            <TheBox>
                <Row type="flex" justify="space-around">
                    <Col span={4}> <TitleBox> 机房明细 </TitleBox> </Col>
                    <Col span={4} />
                    <Col span={4} />
                    <Col span={4} />
                    <Col span={4} />
                </Row>

                <Row type="flex" justify="space-around">
                    <Col span={4}> <Thermometers value={23} /> </Col> {/* 向下传递 温度(数值类型) */}
                    <Col span={4}> <Control controlState={false} /> </Col> {/* 向下传递 开关状态(布尔类型) */}
                    <Col span={4}> <Mode modeState={'refrigeration'} /> </Col> {/* 向下传递 模式类型(字符串类型) */}
                    <Col span={4}> <SetTemperature temperature={28} /> </Col> {/* 向下传递 设置温度(数值类型) */}
                    <Col span={4}> <WindSpeed windSpeedState={'auto'} /> </Col> {/* 向下传递 风速(字符串类型) */}
                </Row>
            </TheBox>
        )
    }
}

// style
const TheBox = styled.div `
    padding: ${elf.d.autoPadding}px 0;
    border: 1px solid ${elf.c.line};
    border-radius: 5px;
`

const TitleBox = styled.h1 `
    margin: ${elf.d.autoMargin / 2}px 0;
    ${elf.m.fS(elf.f.title)};
    font-weight: bold;
`

export default The
