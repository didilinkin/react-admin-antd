/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 03:37:55
 * @modify date 2017-09-04 03:03:53
 * @desc 空调 控制板 - 运行模式
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card, Button } from 'antd' // Button
import styled from 'styled-components'
import elf from '../../../elf'

class Mode extends React.Component {
    constructor (props) {
        super(props)

        let onState = (stateType) => {
            let stateObj = {
                refrigeration: false, // 制冷
                heating: false, // 制热
                auto: false // 自动
            }

            stateObj[stateType] = true
            this.state = stateObj
        }

        switch (props.modeState) {
            case 'refrigeration':
                onState('refrigeration')
                break
            case 'heating':
                onState('heating')
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
                    height: 200,
                    textAlign: 'center'
                }}
            >
                <TitleBox> 运行模式 </TitleBox>

                <RefrigerationBtn refrigeration={ this.state.refrigeration }>
                    <Button> 制冷 </Button>
                </RefrigerationBtn>

                <HeatingBtn heating={ this.state.heating }>
                    <Button> 制热 </Button>
                </HeatingBtn>

                <AutoBtn auto={ this.state.auto }>
                    <Button> 自动 </Button>
                </AutoBtn>
            </Card>
        )
    }
}

Mode.propTypes = {
    modeState: PropTypes.string
}

// style
const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const ModeBtn = styled.div ` // 三个按钮通用样式, 下面三个继承这个样式
    margin: ${elf.d.autoMargin / 2}px 0;
`

const RefrigerationBtn = ModeBtn.extend `
    >button {
        background-color: ${props => props.refrigeration ? `${elf.c.theme}` : `${elf.c.base}`};
        color: ${props => props.refrigeration ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

const HeatingBtn = ModeBtn.extend `
    >button {
        background: ${props => props.heating ? `${elf.c.danger}` : `${elf.c.base}`};
        color: ${props => props.heating ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

const AutoBtn = ModeBtn.extend `
    >button {
        background: ${props => props.auto ? `${elf.c.success}` : `${elf.c.base}`};
        color: ${props => props.auto ? `${elf.c.base}` : `${elf.c.font}`};
    }
`

export default Mode
