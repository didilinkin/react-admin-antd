# 长江中心 - 物业管理系统 - V2.0版本

> 脚手架模型来自 [react-admin](https://github.com/yezihaohao/react-admin)
>
> *NPM* 版本请 升级到 `5.0.3` 以上
> 
> *Nodejs* 版本 尽量使用 `7.9.0` 版本以上

* [**React** v15.5.0更新说明 & v16.0.0更新预告](https://zhuanlan.zhihu.com/p/26250968)
* 使用 `TypeScript` 超集语言辅助
* 使用 `TSLint` 进行代码检测
* 使用 `Jest` 与 `Enzyme` 进行代码测试
* 使用 `Redux` 进行状态管理

## 使用技术:
| 技术名称                                               | 作用                |  版本   |
| --------                                              | -----:              | :----:  |
| [React](https://facebook.github.io/react/)            | 视图库              | 15.5.4  |
| [AntDesign](https://ant.design/index-cn)              | UI框架              | 2.10.4  |
| [Redux](http://cn.redux.js.org/)                      | 状态管理             | 3.6.0  |
| [React-router](https://reacttraining.cn/)             | 路由管理            |  3.0.2  |
| [Axios](https://github.com/mzabriskie/axios)          | 交互处理            |  0.16.1  |
| [Less](http://www.bootcss.com/p/lesscss/)             | 样式预处理器(AntD)  |  2.7.2  |
| [Sass](https://www.sass.hk/)                          | 样式预处理器        |  4.5.2  |
| [webpack](https://doc.webpack-china.org/)             | 模块打包            | 1.14.0  |
| [Babel](http://babeljs.cn/)                           | ES6转译ES5          |  6.24.1  |
| [Mockjs](http://mockjs.com/)                          | 模拟接口            |  1.0.1-beta3  |

## 使用插件:
| 插件名称                                                                     | 作用                                           |   版本  |
| --------                                                                     | -----:                                        | :-----: |
| [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)     | AntD 加载组件模块                              | 1.2.1  |
| [echarts-for-react](https://github.com/hustcc/echarts-for-react)             | 基于React对echarts封装的可视化图表              | 1.4.1  |
| [nprogress](https://github.com/rstacruz/nprogress)                           | 顶部加载条                                     | 0.2.0  |
| [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)          | ReactJS和DraftJS库构建的Wysiwyg编辑器          | 1.10.0  |
| [react-draggable](https://github.com/mzabriskie/react-draggable)             | 拖拽模块(简单版)                               | 2.2.6  |
| [react-quill](https://github.com/zenoamaro/react-quill)                      | React的 Quill组件(富文本)                      | 1.0.0-rc.2  |
| [recharts](https://github.com/recharts/recharts)                             | 另一个基于React封装的echarts图表(备用)          | 1.0.0-alpha.0  |
| [screenfull](https://github.com/sindresorhus/screenfull.js)                  | 全屏插件                                       | 3.2.0  |
| [styled-components](https://github.com/styled-components/styled-components)  | 样式组件                                       | 2.0.0  |
| [polished](https://github.com/styled-components/polished)                    | CSS in JS功能插件(可以用js写CSS, 内部封装函数)   | 1.1.3  |
| [animate.css](https://daneden.github.io/animate.css/)                        | CSS3 动画功能                                  | 3.5.2  |
| [qs](https://github.com/ljharb/qs)                                           | 字符串解析库(配合axios)                         | 6.4.0  |
| [moment](https://momentjs.com/)                                              | JS处理 / 操作 / 转换 时间日期                   | 2.18.1  |

# 目录结构
> 借鉴: [Redux + React 应用程序架构的 3 条规范（内附实例）](https://zhuanlan.zhihu.com/p/21490605)
>
> 借鉴: [React + Redux 最佳实践](https://github.com/sorrycc/blog/issues/1)
>
> 借鉴: [Redux状态管理之痛点、分析与改良](https://segmentfault.com/a/1190000009540007)

```bash
├── build /                         # 打包的文件目录
├── config /                        # webpack配置
├—— node_modules /                  # npm安装依赖目录
├── public /                        # 静态文件
│   ├── favicon.ico                 |   # 网页图标
│   ├── index.html                  |   # 入口 HTML文件
│   ├── npm.json                    |   # echarts测试数据
│   └── weibo.json                  |   # echarts测试数据
├── scripts /                       # webpack 配置文件
│   ├── build.js                    |   # webpack - '打包'配置
│   ├── start.js                    |   # webpack - '开发'配置
│   └── test.js                     |   # webpack - '测试'配置
├── src /                           # 开发目录
│   ├── axios /                     |   # API 交互统一方法
│   |   └── index.js                |   |   # axios 封装配置
│   ├── components /                |   # React 组件文件夹( 即将删除!!! - 请及时处理 )
│   ├── stores /                    |   # Redux 全局状态管理
│   ├── style /                     |   # Less 样式配置
│   ├── utils /                     |   # 工具文件存放目录
│   ├── views /                     |   # ( 页面 + 组件 ) 统一管理 
│   |   |── common /                |   |   # 通用
|   │   |   |── components /        |   |   |   # 通用 组件
|   │   |   └── pages /             |   |   |   # 通用 页面
|   |   │   |   |── HomeRouter.jsx  |   |   |   |   # 主页 路由模版页( 开发中 )
|   |   │   |   |── Login.jsx       |   |   |   |   # 登录 页( 开发中 )
|   |   │   |   └── 404.jsx         |   |   |   |   # 404 页( 开发中 )
│   |   |── UpKeep /                |   |   # '维修' 版块
|   │   |   |── components /        |   |   |   # '维修' 组件
|   │   |   └── pages /             |   |   |   # '维修' 页面
|   |   │   |   └── Table2.jsx      |   |   |   |   # '维修' 测试 Redux( 测试中 )
│   |   └── Warehouse /             |   |   # '仓库管理' 版块
|   │   |   |── components /        |   |   |   # '仓库管理' 组件( 开发中 )
|   │   |   └── pages /             |   |   |   # '仓库管理' 页面( 开发中 )
│   └── index.js                    |   # 项目的整体js入口文件, 配置插件
├── .babelrc                        # Babel 配置
├── .editorconfig                   # 统一编辑器配置
├── .env                            # 启动项目自定义端口配置文件
├── .eslintrc.js                    # ES( js / jsx ) 语法纠错
├── .eslintignore                   # 纠错忽略 配置
├── .gitignore                      # git忽略 配置
├── LICENSE                         # GPL3.0
├── package-lock.json               # NPM 依赖包 版本锁
├── package.json                    # 项目 配置
├── README.md                       # 项目 说明
├── .postcssrc.js                   # Postcss 配置
├── tsconfig.json                   # TypeScript 配置(已配置好 - 未使用)
├── tslint.json                     # TSlint(TS) 语法纠错(已配置好 - 未使用)
└── yarn.lock                       # Yarn 依赖包版本锁
```

***

# 说明: [`dev`开发模式 / 打包输出 的操作方法](./docs/打包输出&开发模式.md)

***

## **ToDoList**
- [x]  `standard` 语法配置( 或使用 `TSlint` )
- [x]  `TS` 配置引入
- [x]  `webpack` 优化配置- 需要升级 2.x !!!
- [ ]  `webpack` report打包的体积分析报告( 类似 Vue的 `npm run build --report` )
- [ ]  `src` 目录 功能划分的调整( 参考`Redux` 推荐目录结构 )
- [ ]  `Postcss` 配置
- [ ]  `Antd` 的主题 Less 配置已完成; 如果需要配置主题 需要修改`src/theme` 文件夹( 线上环境的主题 / 按需加载 条件未配置; 如有需要 配置 `webpack.config.prod.js` )
- [ ] [**webpack 巧解环境配置问题**](https://segmentfault.com/a/1190000004053607)

