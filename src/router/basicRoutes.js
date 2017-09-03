/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-03 12:54:47
 * @modify date 2017-09-03 12:54:47
 * @desc 基础常用 路由配置表(404 / Login 等页面)
*/

import { Login, Navigator, NoMatch } from '../common/containers'

const basicRoutes = [
    {
        path: '/login',
        component: Login
    }, {
        path: '/navigator',
        component: Navigator
    }, {
        component: NoMatch
    }
]

export default basicRoutes
