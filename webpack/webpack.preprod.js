const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

var webpack = require('webpack')

module.exports = merge(
  common,{
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        },
        // explicity vue3 options
        // https://vuejs.org/api/compile-time-flags.html
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'true',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true
      }),
      new CleanWebpackPlugin(),
    ],
  },
);
