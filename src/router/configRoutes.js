// 负责将: matchingRoutes 与 basicRoute 两个路由配置合并;
// 输出的 configRoutes 是 数组
import matchingRoutes from './matchingRoutes'
import basicRoutes from './basicRoutes'

const configRoutes = [
    ...matchingRoutes, // 内容映射
    ...basicRoutes // 常用匹配
]

export default configRoutes
