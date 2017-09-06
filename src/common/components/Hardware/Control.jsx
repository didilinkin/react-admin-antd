/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-01 01:16:20
 * @modify date 2017-09-04 03:04:16
 * @desc 空调 控制板 - 开关控制
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card, Icon } from 'antd'
import styled from 'styled-components'
import elf from '../../../elf'
import { apiPost } from '../../../api/index'

const Control = ({ controlState }) => (
    <Card
        style={{
            width: 200,
            textAlign: 'center'
        }}
    >
        <div style={{ height: 150 }} >
            <TitleBox> 开关控制 </TitleBox>

            <IconBox controlState={controlState}>
                <Icon type="poweroff" onClick={() => handleControl(controlState)} />
            </IconBox>
        </div>
    </Card>
)
Control.propTypes = {
    controlState: PropTypes.bool
}
function handleControl (controlState) {
    console.log({controlState} + '111111')
    apiPost(
    )
}
// style
const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const IconBox = styled.div `
    ${elf.m.flexCenter};
    height: 120px;
    >i {
        margin: ${elf.d.autoMargin / 2}px 0;
        ${elf.m.fS(elf.f.title * 2)}; // font-size: title * 2
        cursor: pointer;
        font-weight: bold;
        color: ${props => props.controlState ? `${elf.c.line}` : `${elf.c.success}`}; // 默认 灰, 开启(F): 绿
        &:hover {
            color: ${elf.c.base}
        }
    }
`

export default Control
