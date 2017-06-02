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
| [AntDesign](https://ant.design/index-cn)              | UI框架              | 2.10.2  |
| [Redux](http://cn.redux.js.org/)                      | 状态管理             | 3.6.0  |
| [React-router](https://reacttraining.cn/)             | 路由管理            |  4.1.1  |
| [Axios](https://github.com/mzabriskie/axios)          | 交互处理            |  0.16.1  |
| [Sass](https://www.sass.hk/)                          | 样式预处理器        |  4.5.2  |
| [webpack](https://doc.webpack-china.org/)             | 模块打包            | 2.4.1  |
| [Babel](http://babeljs.cn/)                           | ES6转译ES5          |  6.24.1  |
| [Mockjs](http://mockjs.com/)                          | 模拟接口            |  1.0.1-beta3  |



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
- [ ]  `webpack` 优化配置
- [ ]  `webpack` report打包的体积分析报告( 类似 Vue的 `npm run build --report` )
- [ ]  `src` 目录 功能划分的调整
- [ ]  `TS` 配置引入
- [ ]  `Postcss` 配置
- [ ]  `standard` 语法配置( 或使用 `TSlint` )