/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 12:31:47
 * @modify date 2017-09-01 12:49:39
 * @desc 测试向下传递数据
 */
import React from 'react'

import { Row, Col } from 'antd'
import { apiPost } from '../../../../api'

import {
    Thermometers,
    Control,
    Mode,
    WindSpeed,
    SetTemperature
} from '../../../../common/components/Hardware'

import styled from 'styled-components'
import elf from '../../../../elf'

class The extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            controlState: null,
            modeState: null,
            windSpeedState: null,
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            '/hardware/getAirStatusList',
            {numCode: this.props.match.params.id.toString()}
        )
        console.log(resulData.data)
        if (resulData.data.onOff === '关机') {
            this.setState({
                controlState: true
            })
        } else {
            this.setState({
                controlState: false
            })
        }
        if (resulData.data.model === '制冷') {
            this.setState({
                modeState: 'refrigeration'
            })
        } else if (resulData.data.modal === '制热') {
            this.setState({
                modeState: 'heating'
            })
        } else if (resulData.data.modal === '自动') {
            this.setState({
                modeState: 'auto'
            })
        }
        if (resulData.data.windSpeed === '高速') {
            this.setState({
                windSpeedState: 'high'
            })
        } else if (resulData.data.windSpeed === '低速') {
            this.setState({
                windSpeedState: 'windSpeed'
            })
        } else if (resulData.data.windSpeed === '自动') {
            this.setState({
                windSpeedState: 'auto'
            })
        }
        this.setState({
            data: resulData.data
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    render () {
        return (
            <TheBox>
                <Row type="flex" justify="space-around">
                    <Col span={4}> <TitleBox> 空调信息 </TitleBox> </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={4}>空调编号：{this.state.data.numCode}</Col>
                    <Col span={4}>控制区域:{this.state.data.controlArea}</Col>
                    <Col span={4}>所属楼宇：{this.state.data.buildCode}</Col>
                    <Col span={4}>当前客户：{this.state.data.numCode}</Col>
                    <Col span={4}>采集时间：{this.state.data.createdAt}</Col>
                </Row>

                <Row type="flex" justify="space-around">
                    <Col span={4}> <TitleBox> 空调控制 </TitleBox> </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={4}> <Thermometers value={this.state.data.roomTemp} /> </Col> {/* 向下传递 温度(数值类型) */}
                    <Col span={4}> <Control controlState={this.state.controlState} /> </Col> {/* 向下传递 开关状态(布尔类型) */}
                    <Col span={4}> <Mode modeState={this.state.modeState} /> </Col> {/* 向下传递 模式类型(字符串类型) */}
                    <Col span={4}> <SetTemperature temperature={this.state.data.setTemp} /> </Col> {/* 向下传递 设置温度(数值类型) */}
                    <Col span={4}> <WindSpeed windSpeedState={this.state.windSpeedState} /> </Col> {/* 向下传递 风速(字符串类型) */}
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
