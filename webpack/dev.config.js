/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

const pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
const version = pkg.version;
const name = pkg.name;

var config = {

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    path.join(__dirname, '../src/client/main.js'),
    path.join(__dirname, '../src/client/less/main.less'),
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: `${name}-v${version}.js`,
    publicPath: 'http://0.0.0.0:8080/dist/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader'] },
      { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
    ]
  },

  devServer: {
    hot: true,
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }

};

module.exports = config;
