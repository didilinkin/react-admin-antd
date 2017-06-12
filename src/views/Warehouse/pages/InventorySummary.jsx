// 库存汇总
import React from 'react'
// import axios from 'axios'
import { apiPost } from '../../../api'

// 测试
const asyncTest = async function() {
    try {
        // 内网测试
        let result = await apiPost(
            'http://192.168.1.108:18082/upkeep/list',
            { 'entryName': '灯泡2' }
        )

        // 外网测试
        // let result = await apiPost(
        //     'http://app.aplusoffice.cn/api/map/getRegionPointList',
        //     { 'cityCode': '3702' }
        // )

        console.log(result)
    } catch(err) {
        console.log(err)
    }
}

class InventorySummary extends React.Component {
    componentWillMount() {
        asyncTest()
    }

    render () {
        return (
            <div>
                <h1> 库存汇总 </h1>
            </div>
        )
    }
}

export default InventorySummary
