/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-08-31 11:32:31
 * @modify date 2017-09-01 11:32:59
 * @desc '温度计' 组件
*/
import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'antd'
import styled from 'styled-components'
import elf from '../../elf'

const thermometersImg = require('../../assets/images/Thermometers.png')

// 无状态函数
const Thermometers = ({ value }) => (
    <Card
        style={{
            width: 200,
            height: 200,
            textAlign: 'center'
        }}
    >
        <TitleBox> 当前室温 </TitleBox>
        <ImgBox src={ thermometersImg } />
        <TitleBox> { value }℃ </TitleBox>
    </Card>
)

Thermometers.prototype = {
    value: PropTypes.number.isRequired
}

// style
const TitleBox = styled.h1 `
    ${elf.m.fS(elf.f.title)}; // font-size: title
`

const ImgBox = styled.img.attrs({ alt: '' }) `
    margin: ${elf.d.autoMargin / 2}px 0;
    ${elf.m.imgCover('40%')};
`

export default Thermometers
