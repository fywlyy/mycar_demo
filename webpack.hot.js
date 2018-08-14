const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('develop-hot')
}));

plugins.push(new MiniCssExtractPlugin({
  filename:'app.css'
}));

plugins.push(new HtmlWebpackPlugin({
  title : 'OA',
  filename: '../index.html',
  template: './src/Template/index.html',
  favicon: './src/Asset/img/favicon.png',
  hash: true
}));

plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: 'jquery'
}));

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:12138/__webpack_hmr',
      'webpack/hot/only-dev-server',
      './src/entry'
    ],
  },
  output: {
    path : path.resolve(__dirname,"/build"),
    publicPath:"/build/",
    filename:"[name].js",
    chunkFilename: '[name].[chunkhash:5].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules$/,
        include: [APP_PATH],
        use: ["react-hot-loader", "babel-loader",
            //"eslint-loader"
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /^node_modules$/,
        use: ['style-loader', 'css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
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
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins,
  devServer:{
    contentBase:path.resolve(__dirname,"./"),
    host: '0.0.0.0',
    port: 12138,
    inline: true,
  }
};
