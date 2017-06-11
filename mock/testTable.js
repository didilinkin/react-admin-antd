// 模拟接口 - 测试表格
/* global require module: true */
const Mock = require('mockjs')
const Random = Mock.Random

// 生成数据
const mockData = {
    title: Random.ctitle(10, 15)
}

module.exports = {
    api: '/mock/testTable',
    response: function (_req, res) {
        res.json({
            rlt: 'true',
            msg: 'success',
            data: mockData
        })
    }
}
