const path = require('path')
const webpack = require('webpack') // eslint-disable-line
const HtmlWebpackPlugin = require('html-webpack-plugin') // eslint-disable-line

const isDev = process.env.NODE_ENV !== 'production'

const VENDOR_LIBS = [
  'vue',
  'vue-router',
]

module.exports = {
  entry: {
    bundle: './src/main.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve('dist'),
    // workaround for dev-server + html-plugin
    publicPath: isDev ? '/' : '/dist/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      // required to include both runtime and template compiler for lazy-loading
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|svg|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      // workaround for dev-server + html-plugin
      filename: isDev ? 'index.html' : path.resolve('index.html'),
      inject: 'body',
    }),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: 'eval-source-map',
}

if (!isDev) {
  module.exports.devtool = 'source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ])
}
