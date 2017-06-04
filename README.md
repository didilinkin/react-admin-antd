# 长江中心 - 物业管理系统 - V2.0版本

> 脚手架模型来自 [backend-by-react](https://github.com/sundaypig/backend-by-react)

* 使用 `TypeScript` 超集语言辅助
* 使用 `TSLint` 进行代码检测
* 使用 `Jest` 与 `Enzyme` 进行代码测试
* 使用 `Redux` 进行状态管理。

## 使用技术:
| 技术名称                                               | 作用                |  版本   |
| --------                                              | -----:              | :----:  |
| [React](https://facebook.github.io/react/)            | 视图库              | 15.5.4  |
| [AntDesign](https://ant.design/index-cn)              | UI框架              | 2.10.4  |
| [Redux](http://cn.redux.js.org/)                      | 状态管理             | 3.6.0  |
| [React-router](https://reacttraining.cn/)             | 路由管理            |  4.1.1  |
| [Axios](https://github.com/mzabriskie/axios)          | 交互处理            |  0.16.1  |
| [Less](http://www.bootcss.com/p/lesscss/)             | 样式预处理器(AntD)  |  2.7.2  |
| [Sass](https://www.sass.hk/)                          | 样式预处理器        |  4.5.2  |
| [webpack](https://doc.webpack-china.org/)             | 模块打包            | 2.4.1  |
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

# 目录结构
```bash
├── README.md
├── package.json
├── dist /                          # 打包输出文件
├── config /                        # webpack配置
├── public /                        # 静态文件
│   ├── favicon.ico
│   └── index.html
├── src /                           # 开发目录
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── logo.svg
├── .editorconfig                   # 编辑器统一配置
├── .eslintrc.js                    # ES( js / jsx ) 语法纠错
├── .eslintignore                   # 纠错忽略 配置
├── .gitignore                      # git忽略 配置
├── .postcssrc.js                   # Postcss 配置
├── webpack.config.js               # webpack 基本配置
├── webpack.config.prod.js          # webpack 上线配置
└── yarn.lock                       # Yarn 依赖包版本锁
```

***

# 说明: [`dev`开发模式 / 打包输出 的操作方法](./docs/打包输出&开发模式.md)

***

## **ToDoList**
- [ ]  `webpack` 优化配置- 需要升级 2.x !!!
- [ ]  `webpack` report打包的体积分析报告( 类似 Vue的 `npm run build --report` )
- [ ]  `src` 目录 功能划分的调整
- [ ]  `TS` 配置引入
- [ ]  `Postcss` 配置
- [ ]  `standard` 语法配置( 或使用 `TSlint` )
