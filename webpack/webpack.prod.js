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
      },
      // explicity vue3 options
      // https://vuejs.org/api/compile-time-flags.html
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new CleanWebpackPlugin(),
  ]
});
