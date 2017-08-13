# 长江中心 - 物业管理系统 - V2.0版本

> 脚手架模型来自 [react-admin](https://github.com/yezihaohao/react-admin)
>
> *NPM* 版本请 升级到 `5.0.3` 以上
>
> *Nodejs* 版本 尽量使用 `7.9.0` 版本(可能在 node v8 版本有错误; 不推荐使用 v8以上)
>
> 开发环境, 请务必使用 *chrome* 作为调试浏览器; 并且安装 *react-devtools* 与 *redux-devtools* 调试插件;

* [**React** v15.5.0更新说明 & v16.0.0更新预告](https://zhuanlan.zhihu.com/p/26250968)
* 使用 [ESlint](http://eslint.cn/) 进行代码检测
* 使用 [Redux](http://cn.redux.js.org/) 进行状态管理

## 使用技术:
| 全家桶                                                 | 作用                |  版本   |
| --------                                              | -----:              | :----:  |
| [react](https://facebook.github.io/react/)            | 视图库              | 15.6.1  |
| [redux](http://cn.redux.js.org/)                      | 状态管理             | 3.7.1  |
| [react-redux](http://cn.redux.js.org/docs/react-redux/index.html)                      | Redux的 React 绑定库             | 5.0.5  |
| [react-router](https://reacttraining.cn/)             | 路由管理            |  4.1.1 |
| [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)       | 路由状态            |  5.0.0-alpha.6 |
| [react-router-config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config)     | 静态路由配置            |  1.0.0-beta.3 |


| 开发依赖                                               | 作用                |  版本   |
| --------                                              | -----:              | :----:  |
| [ant-design](https://ant.design/index-cn)              | UI框架              | 2.10.4  |
| [axios](https://github.com/mzabriskie/axios)          | 交互处理            |  0.16.1  |
| [less](http://www.bootcss.com/p/lesscss/)             | 样式预处理器(AntD)  |  2.7.2  |
| [history](https://github.com/reacttraining/history)   | 路由历史  |  4.6.3  |
| [webpack](https://doc.webpack-china.org/)             | 模块打包            | 1.14.0  |
| [babel](http://babeljs.cn/)                           | ES6转译ES5          |  6.24.1  |
| [mockjs](http://mockjs.com/)                          | 模拟接口            |  1.0.1-beta3  |
| [Elf-ES]()                                            | ES版本Elf(管理样式) | 2.2.1 |
| [lodash](https://wizardforcel.gitbooks.io/lodash-doc-45/content/)   | 实用工具库  |  4.17.4  |
| [styled-components](https://www.styled-components.com/)   | CSS in JS实现方法  |  2.0.0  |
| [polished](https://polished.js.org/)   | JS风格的轻量样式工具集  |  1.1.3  |
| [store.js](https://github.com/marcuswestin/store.js)   | 操作local storage  |  2.0.12  |

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
| [animate.css](https://daneden.github.io/animate.css/)                        | CSS3 动画功能                                  | 3.5.2  |
| [qs](https://github.com/ljharb/qs)                                           | 字符串解析库(配合axios)                         | 6.4.0  |
| [moment](https://momentjs.com/)                                              | JS处理 / 操作 / 转换 时间日期                   | 2.18.1  |
| [hotcss](https://github.com/imochen/hotcss)                                  | 移动端布局终极解决方案                          | 2.2.1 |

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
- [ ] 关于: 首次运行 `yarn start` 开发模式, 只进入首页 无法登录的问题解决方案;(因 目前登录服务是在局域网内进行, 所以需要手动配置一下 localStore本地数据), 会尽快完善 这个测试功能;
- [ ] 在 `redux` 中使用 异步`thunk`
- [ ] 在 `redux` 中使用 [redux-saga](https://github.com/redux-saga/redux-saga); [中文文档](http://leonshi.com/redux-saga-in-chinese/)

