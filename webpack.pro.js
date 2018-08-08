const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let plugins = [];

//0. 定义环境
plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production') //定义编译环境
    }
  })
);

//1.独立css
plugins.push(
  new MiniCssExtractPlugin({
    filename:'[name].css'
  })
);

//2.动态嵌入静态资源
plugins.push(
  new HtmlWebpackPlugin({
    title : 'Saleen赛麟',
    filename: '../built/index.html',
    template: './src/Template/index.html',
    favicon: './src/Asset/img/favicon.png',
    hash: true
  })
);

//清除旧文件
plugins.push(
  new CleanWebpackPlugin(['./built'])
);

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output : { comments: false },
          compress : { warnings: false }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        priority: false,    // 缓存组优先级
        vendor: {           // key 为entry中定义的入口名称
          chunks: 'all',    // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: true,       // 要缓存的 分隔出来的 chunk 名称
          minSize: 20000,
          minChunks: 1,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  },
  entry: {
    app: './src/entry',
    vendor: [
      "react",
      "react-dom",
      "lodash",
    ]
  },
  output: {
    publicPath : './',
    path : __dirname + '/built',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules$/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,
        exclude: /^node_modules$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "file-loader",
            options: { name: '/font/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: '/image/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins
};