// 负责将: matchingRoutes 与 basicRoute 两个路由配置合并;
// 输出的 configRoutes 是 数组

import privateRoutes from './privateRoutes' // 验证登录信息
import matchingRoutes from './matchingRoutes' // 暂时取消 匹配 routes, 测试 '高阶参数保护' 路由
import basicRoutes from './basicRoutes'

const configRoutes = [
    ...privateRoutes, // 验证登录信息(暂不考虑 传入其他url, 必须跳入 '/')
    ...matchingRoutes, // 内容映射
    ...basicRoutes // 常用匹配
]

export default configRoutes
