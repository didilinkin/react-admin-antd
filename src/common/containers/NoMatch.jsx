/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-03 12:34:49
 * @modify date 2017-09-03 12:34:49
 * @desc 404页面
*/
import React from 'react'

import styled from 'styled-components'
import elf from '../../elf'

const NoMatch = () => (
    <NoMatchBox />
)

// style
const NoMatchImg = require('../../assets/images/404.png')

const NoMatchBox = styled.div `
    ${elf.m.bCimg(NoMatchImg)};
`

export default NoMatch
