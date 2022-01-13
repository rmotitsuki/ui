var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
          // other vue-loader options go here
        }
      }, 
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax : true
              }
            },
          }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src'), 
          path.resolve(__dirname, 'node_modules/vue-awesome')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        exclude: /\.(s?(a?|c)ss|js|html)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            esModule: false
          }
        },
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, './src/components')
    }
  },
  
}
