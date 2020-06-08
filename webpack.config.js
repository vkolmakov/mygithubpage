/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/main.js',
  },
  output: {
    path: path.resolve('dist'),
    // workaround for dev-server + html-plugin
    publicPath: isDev ? '/' : '/dist/',
    filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
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
        test: /\.s?css$/,
        use: isDev
          ? ['style-loader', 'css-loader', 'sass-loader']
          : [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { minimize: true } },
            'sass-loader',
          ],
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
    new VueLoaderPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: 'eval-source-map',
}

if (!isDev) {
  module.exports.mode = 'production'
  module.exports.optimization = {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  }
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
  ])
}
