/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 03:37:55
 * @modify date 2017-09-01 05:59:10
 * @desc 运行模式
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card, Button } from 'antd'
import styled from 'styled-components'
import elf from '../../elf'

class Mode extends React.Component {
    state = {
        refrigeration: false, // 制冷
        heating: false, // 制热
        auto: true // 自动
    }
    render () {
        const { modeState } = this.props

        return (
            <Card
                style={{
                    width: 200,
                    height: 200,
                    textAlign: 'center'
                }}
            >
                <TitleBox> 运行模式 </TitleBox>
                <ButtonBox> <Button mode="1" modeState={modeState} > 制冷 </Button> </ButtonBox>
                <ButtonBox> <Button mode="2" modeState={modeState} > 制热 </Button> </ButtonBox>
                <ButtonBox> <Button mode="success" modeState={modeState} > 自动 </Button> </ButtonBox>
            </Card>
        )
    }
}

Mode.prototype = {
    modeState: PropTypes.number.isRequired
}

// style
const TitleBox = styled.h1 `
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const ButtonBox = styled.div `
`

export default Mode
