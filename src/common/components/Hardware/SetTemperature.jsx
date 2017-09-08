/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-04 03:40:04
 * @modify date 2017-09-04 03:40:04
 * @desc 空调 控制板 - 设置温度
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card, Icon } from 'antd'
import styled from 'styled-components'
import elf from '../../../elf'

class SetTemperature extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            temperature: 0
        }
    }
    componentWillReceiveProps (next) {
        this.setState({
            temperature: next.setTemp
        })
    }
    temperatureUp = async () => {
        let temperature = this.props.temperature
        temperature = temperature + 1
        this.setState({
            temperature: temperature
        })
        this.props.refresh('setTemp', temperature)
    }
    temperatureDown = async () => {
        let temperature = this.props.temperature
        temperature = temperature - 1
        this.setState({
            temperature: temperature
        })
        this.props.refresh('setTemp', temperature)
    }
    render () {
        return (
            <Card
                style={{
                    width: 200,
                    textAlign: 'center'
                }}
            >
                <div style={{ height: 150 }}>
                    <TitleBox> 设定温度 </TitleBox>

                    <TemperatureBox>
                        <IconBox> <Icon type="up" onClick={this.temperatureUp} /> </IconBox>

                        <TemperatureTitle> { this.props.temperature }℃ </TemperatureTitle>

                        <IconBox> <Icon type="down" onClick={this.temperatureDown} /> </IconBox>
                    </TemperatureBox>

                </div>
            </Card>
        )
    }
}

SetTemperature.propTypes = {
    temperature: PropTypes.number
}

// style
const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const TemperatureBox = styled.div `
    height: 150px;
`

const TemperatureTitle = TitleBox.extend `
    margin: ${elf.d.autoMargin / 2}px 0;
`

const IconBox = styled.div`
    ${elf.m.flexCenter};
    margin: ${elf.d.autoMargin / 2}px 0;
    height: 30px;
    >i {
        ${elf.m.fS(elf.f.title * 2)}; // font-size: title * 2
        cursor: pointer;
        font-weight: bold;
        &:hover {
            color: ${elf.c.theme}
        }
    }
`

export default SetTemperature
