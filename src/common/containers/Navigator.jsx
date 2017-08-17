// 判断浏览器版本 => 如果是 IE9一下版本 展示此页面(引导用户安装 高版本浏览器)
import React from 'react'

import styled from 'styled-components'
import { size } from 'polished'
import elf from '../../elf'

const contentArr = [
    {
        href: 'http://www.googlechromer.cn/',
        imgObj: require('../../assets/images/chrome.png'),
        title: '谷歌浏览器(推荐)'
    }, {
        href: 'http://www.firefox.com.cn/',
        imgObj: require('../../assets/images/Firefox.png'),
        title: '火狐浏览器'
    }, {
        href: 'http://se.360.cn/',
        imgObj: require('../../assets/images/360.png'),
        title: '360浏览器'
    }, {
        href: 'http://browser.qq.com/',
        imgObj: require('../../assets/images/qq.png'),
        title: 'QQ浏览器'
    }, {
        href: 'https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads',
        imgObj: require('../../assets/images/IE.png'),
        title: 'IE9.0以上'
    }
]

class Navigator extends React.Component {
    // 目的: 根据 url参数下载浏览器
    toDownloadBrowser= (url) => {
        window.location.href = url
    }

    render () {
        return (
            <WrapBox>
                <ContentBox>
                    <TitleBox>您当前版本过低，无法正常使用，请升级后再试! </TitleBox>
                    <RemarksBox>建议使用以下浏览器，请点击以下浏览器升级</RemarksBox>

                    <UlBox>
                        { contentArr.map((item, i) => {
                            return (
                                <LiBox onClick={ this.toDownloadBrowser.bind(this, item.href) } key={ i }>
                                    <ImgBox src={ item.imgObj } alt={ item.title } />
                                    <SpanBox>{ item.title }</SpanBox>
                                </LiBox>
                            )
                        }) }
                    </UlBox>
                </ContentBox>
            </WrapBox>
        )
    }
}

// Style
const WrapBox = styled.div`
    ${size('100%', '100%')};
    ${elf.m.flexCenter};
    text-align: center;
`

const ContentBox = styled.div``

const TitleBox = styled.h2`
    font-size: ${elf.f.title}px;
    font-weight: bold;
`

const RemarksBox = styled.p`
    font-size: ${elf.f.text}px;
    color: ${elf.c.remarks}
`

const UlBox = styled.ul`
    display: flex;
    width: 600px;
    margin-top: 80px;
`

const LiBox = styled.li`
    flex: 1;
`

const ImgBox = styled.img`
    ${size('60px', '60px')};
    cursor: pointer;
`

const SpanBox = styled.span`
    display: block;
    font-size: ${elf.f.text}px;
`

export default Navigator
