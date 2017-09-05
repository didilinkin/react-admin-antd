/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-03 12:34:49
 * @modify date 2017-09-05 03:09:10
 * @desc 404页面
*/
import React from 'react'
import Link from 'react-router-redux-dom-link'

import styled from 'styled-components'
import elf from '../../elf'

const NoMatch = () => (
    <NoMatchBox>
        <ContentBox>
            <NumImgBox />
            <Content>
                <TitleBox> 哎呀……页面找不到了…… </TitleBox>
                <PBox> 无法找到您访问的页面, 请检查网址是否输入正确; 或者刷新重试 </PBox>
                <BackBtn>
                    <BackTitle>
                        <Link to={ '/' }>
                            返回首页
                        </Link>
                    </BackTitle>
                </BackBtn>
            </Content>
        </ContentBox>
    </NoMatchBox>
)

// style
const noMatchImg = require('../../assets/images/404@2x.png')
const numImg = require('../../assets/images/numImg.png')

const NoMatchBox = styled.div `
    ${elf.m.flexCenter};
    height: 100%;
    ${elf.m.bCimg(noMatchImg, 'cover')};
`

const ContentBox = styled.div `
    ${elf.m.flexCenter};
    ${elf.m.size('1000px', '300px')};
`

const NumImgBox = styled.div `
    ${elf.m.size('40%', '100%')};
    ${elf.m.bCimg(numImg, 'contain')};
    background-repeat: no-repeat;
`

const Content = styled.div `
    padding-left: ${elf.d.autoPadding}px;
    ${elf.m.size('60%', 'auto')};
`

const TitleBox = styled.h1`
    ${elf.m.fS(elf.f.bigTitle)}; // font-size: title
    font-weight: bold;
`

const PBox = styled.p `
    margin: ${elf.d.autoMargin}px 0;
    ${elf.m.fS(elf.f.title)};
    color: ${elf.c.remarks};
`

const BackBtn = styled.div `
    ${elf.m.flexCenter};
    padding: ${elf.d.autoPadding}px 0;
    ${elf.m.size('220px', '50px')};
    background-color: ${elf.c.button};
    color: ${elf.c.font};
    border-radius: ${elf.d.autoPadding}px;
    cursor: pointer;

    &:hover {
        background-color: ${elf.c.theme};
        color: ${elf.c.base};
    }
`

const BackTitle = styled.h3 `
    ${elf.m.fS(elf.f.title)}; // font-size: title
    color: inherit;
    a {
        color: inherit;
    }
`

export default NoMatch
