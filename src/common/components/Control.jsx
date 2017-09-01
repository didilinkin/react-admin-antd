/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 01:16:20
 * @modify date 2017-09-01 03:25:19
 * @desc 开关控制
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card, Icon } from 'antd'
import styled from 'styled-components'
import elf from '../../elf'

const Control = ({ controlState }) => (
    <Card
        style={{
            width: 200,
            height: 200,
            textAlign: 'center'
        }}
    >
        <TitleBox> 开关控制 </TitleBox>

        <IconBox controlState={ controlState }>
            <Icon type="poweroff" />
        </IconBox>
    </Card>
)

Control.prototype = {
    state: PropTypes.bool.isRequired
}

// style
const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const IconBox = styled.div `
    >i {
        margin: ${elf.d.autoMargin / 2}px 0;
        ${elf.m.fS(elf.f.title * 2)}; // font-size: title * 2
        font-weight: bold;
        color: ${props => props.controlState ? `${elf.c.line}` : `${elf.c.success}`}; // 默认 灰, 开启(F): 绿
    }
`

export default Control
