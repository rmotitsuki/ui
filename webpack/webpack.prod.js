const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

var webpack = require('webpack')

module.exports = merge(common,{
  mode: 'production',
  devtool: 'inline-source-map',
  // http://vue-loader.vuejs.org/en/workflow/production.html
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CleanWebpackPlugin(),
  ]
});
