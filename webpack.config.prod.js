const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const themeConfig = require('./src/theme')

module.exports = {
  entry: {
    main: './src/index.js',//入口文件
    vendor: [
      'react',
      'react-dom'
    ]//分离第三方库
  },
  output: {
    filename: '[name].[chunkhash:5].js',//打包后的文件名
    chunkFilename: '[name].[chunkhash:5].js',
    path: path.join(__dirname, 'dist'),//打包后的文件存储位置
    publicPath: '/'
  },

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],//优化webpack文件搜索范围
    mainFields: ['jsnext:main', 'main'],//优化支持tree-shaking的库
    extensions: ['.web.js', '.jsx', '.js', '.json']
  },

  //devtool: 'cheap-module-eval-source-map',//生产环境需关闭该功能,否则打包后体积会变大

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',//编译js文件的loader,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', `less-loader?{"modifyVars":${JSON.stringify(themeConfig)}}`]
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|mp4|webm|woff|otf|webp|svg)$/,
        use: 'url-loader'
      }
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,//最紧凑的输出
      comments: false,//删除注释
      compress: {
        warnings: false,//在UglifyJs删除没有用到的代码时不输出警告
        drop_console: true,//删除所有console语句
        collapse_vars: true,//内嵌定义了但是只用到一次的变量
        reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),
    new HtmlWebpackPlugin({//自动生成html
      template: './src/views/index.html'
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('[name].css').replace('dist/js', 'css')
      },
      allChunks: true
    }),//提取css文件
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],//css前缀补全以及兼容
        url: { limit: 10240 }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // 指定公共 bundle 的名字,加manifest防止vendor的hash值改变。
    })
  ],
}