/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-08-31 11:32:31
 * @modify date 2017-08-31 05:40:31
 * @desc '温度计' 组件
*/
import React from 'react'

import { Card } from 'antd'
import styled from 'styled-components'
import elf from '../../elf'

const thermometersImg = require('../../assets/images/Thermometers.png')

class Thermometers extends React.Component {
    render () {
        return (
            <Card>
                <h1> 当前室温 </h1>
                <ImgBox />
            </Card>
        )
    }
}

// style
const ImgBox = styled.img.attrs({
    src={ thermometersImg },
    alt: ''
}) `
    ${elf.m.imgCover('100%')}
`

export default Thermometers
