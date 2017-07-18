// 判断环境, 输出配置好的 <Root /> 组件
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod')
} else {
    module.exports = require('./Root.dev')
}
