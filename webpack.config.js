require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackDevServerPort = parseInt(process.env.PORT || '3000', 10)
const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: production,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: [
                  require('autoprefixer')
                ]
              }
            }, {
              loader: 'resolve-url-loader'
            }, {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?cacheDirectory',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]',
              publicPath: '/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: production
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true,
      disable: !production
    }),
    new FriendlyErrorsPlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    compress: true,
    quiet: true,
    port: webpackDevServerPort
  }
}

let plugins = []

if (production) {
  plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, './node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}

module.exports.plugins.push(...plugins)
