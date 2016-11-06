var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
const version = pkg.version;
const name = pkg.name;

var config = {

  devtool: false,

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  entry: [
    path.join(__dirname, '../src/client/main.js'),
    path.join(__dirname, '../src/client/less/main.less')
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: `${name}-v${version}.js`
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['exports', 'require']
      },
      compressor: {
       warnings: false
     },
     output: {
       comments: false
     }
   }),
   new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: JSON.stringify('production')
     }
   }),
   new webpack.optimize.OccurenceOrderPlugin(),
   new ExtractTextPlugin(`${name}-v${version}.css`)
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') }
    ]
  }

};

module.exports = config;
