/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-04 03:07:21
 * @modify date 2017-09-04 03:07:21
 * @desc 空调 控制板 - 设定风速
*/

import React from 'react'
import PropTypes from 'prop-types'

import { Card, Button } from 'antd'
import styled from 'styled-components'
import elf from '../../../elf'

class WindSpeed extends React.Component {
    constructor (props) {
        super(props)

        let onState = (stateType) => {
            let stateObj = {
                high: false, // 高速
                low: false, // 低速
                auto: false // 自动
            }

            stateObj[stateType] = true
            console.dir(stateObj)
            this.state = stateObj
        }

        switch (props.windSpeedState) {
            case 'high':
                onState('high')
                break
            case 'low':
                onState('low')
                break
            case 'auto':
                onState('auto')
                break
            default:
                onState('auto')
                break
        }
    }

    render () {
        return (
            <Card
                style={{
                    width: 200,
                    textAlign: 'center'
                }}
            >
                <div style={{ height: '150px' }}>
                    <TitleBox> 设定风速 </TitleBox>

                    <HighBtn high={this.state.high}>
                        <Button> 高速 </Button>
                    </HighBtn>

                    <LowBtn low={this.state.low}>
                        <Button> 低速 </Button>
                    </LowBtn>

                    <AutoBtn auto={this.state.auto}>
                        <Button> 自动 </Button>
                    </AutoBtn>
                </div>
            </Card>
        )
    }
}

WindSpeed.propTypes = {
    windSpeedState: PropTypes.string
}

// style
const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const WindSpeedBtn = styled.div` // 三个按钮通用样式, 下面三个继承这个样式
    margin: ${elf.d.autoMargin / 2}px 0;
`

const HighBtn = WindSpeedBtn.extend`
    >button {
        background-color: ${props => props.high ? `${elf.c.theme}` : `${elf.c.base}`};
        color: ${props => props.high ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

const LowBtn = WindSpeedBtn.extend`
    >button {
        background: ${props => props.low ? `${elf.c.danger}` : `${elf.c.base}`};
        color: ${props => props.low ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

const AutoBtn = WindSpeedBtn.extend`
    >button {
        background: ${props => props.auto ? `${elf.c.success}` : `${elf.c.base}`};
        color: ${props => props.auto ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

export default WindSpeed
