// 库存管理
import React from 'react'

import styled       from 'styled-components'
// import { rem }      from 'polished'

import elf          from '../../../elf/main'
import { apiPost }  from '../../../api'

// 测试API
const asyncTest = async function () {
    try {
        // 内网测试
        let result = await apiPost(
            'http://192.168.1.250:18082/upkeep/list',
            { 'entryName': '灯泡2' }
        )

        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

const BigTitle = styled.h1`
    ${elf.m.px2rem(elf.f.bigTitle)};
`

class InventoryManage extends React.Component {
    componentWillMount () {
        asyncTest()
    }

    render () {
        return (
            <div>
                <BigTitle> 库存管理 </BigTitle>
            </div>
        )
    }
}

export default InventoryManage
