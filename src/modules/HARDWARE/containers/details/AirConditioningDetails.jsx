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
            json: [],
            data: {}
        }
    }
    async initialRemarks () {
        let resulData = await apiPost(
            '/hardware/getAirStatusList',
            {numCode: this.props.match.params.id.toString()}
        )
        console.log(resulData.data)
        let json = this.state.json
        json['setTemp'] = resulData.data.setTemp
        if (resulData.data.onOff === '关机') {
            json['controlState'] = true
        } else {
            json['controlState'] = false
        }
        if (resulData.data.model === '制冷') {
            json['modeState'] = 'refrigeration'
        } else if (resulData.data.model === '制热') {
            json['modeState'] = 'heating'
        } else if (resulData.data.model === '自动') {
            json['modeState'] = 'auto'
        }
        if (resulData.data.windSpeed === '高速') {
            json['windSpeedState'] = 'high'
        } else if (resulData.data.windSpeed === '低速') {
            json['windSpeedState'] = 'low'
        } else if (resulData.data.windSpeed === '自动') {
            json['windSpeedState'] = 'auto'
        }
        this.setState({
            data: resulData.data,
            json: json
        })
    }
    componentDidMount () {
        this.initialRemarks()
    }
    refresh = async (key, value) => {
        let json = this.state.json
        let json1 = []
        json1['numCode'] = this.props.match.params.id.toString()
        if (value === 'refrigeration') {
            json1[key] = '制冷'
            json['modeState'] = value
            json1['onOff'] = '开机'
        } else if (value === 'heating') {
            json1[key] = '制热'
            json['modeState'] = value
            json1['onOff'] = '开机'
        }
        if (value === 'high') {
            json1[key] = '高速'
            json['windSpeedState'] = value
            json1['onOff'] = '开机'
        } else if (value === 'low') {
            json1[key] = '低速'
            json['windSpeedState'] = value
            json1['onOff'] = '开机'
        } else if (value === 'auto') {
            json1[key] = '自动'
            json['windSpeedState'] = value
            json1['onOff'] = '开机'
        }
        if (value === true) {
            json1[key] = '开机'
            json['controlState'] = false
        } else if (value === false) {
            json1[key] = '关机'
            json['controlState'] = true
        }
        if (key === 'setTemp') {
            json1['onOff'] = '开机'
            json1['setTemp'] = value
            json['setTemp'] = value
        }
        let result = await apiPost(
            '/hardware/setAirStatusList',
            json1
        )
        if (result.code === 1) {
            this.setState({
                json: json
            })
            // console.log(this.state.json)
        }
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
                    <Col span={4}>
                        <Control
                            numCode={this.props.match.params.id.toString()}
                            controlState={this.state.json.controlState}
                            refresh={this.refresh}
                        />
                    </Col> {/* 向下传递 开关状态(布尔类型) */}
                    <Col span={4}>
                        <Mode
                            numCode={this.props.match.params.id.toString()}
                            modeState={this.state.json.modeState}
                            refresh={this.refresh}
                        />
                        {
                            // console.log(this.state.json.modeState)
                        }
                    </Col> {/* 向下传递 模式类型(字符串类型) */}
                    <Col span={4}>
                        <SetTemperature
                            numCode={this.props.match.params.id.toString()}
                            temperature={this.state.json.setTemp}
                            refresh={this.refresh}
                        />
                    </Col> {/* 向下传递 设置温度(数值类型) */}
                    <Col span={4}>
                        <WindSpeed
                            numCode={this.props.match.params.id.toString()}
                            windSpeedState={this.state.json.windSpeedState}
                            refresh={this.refresh}
                        />
                    </Col> {/* 向下传递 风速(字符串类型) */}
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
