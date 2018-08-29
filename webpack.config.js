require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const webpackDevServerPort = parseInt(process.env.PORT || '3000', 10)
const prerender = process.env.NODE_ENV === 'prerender'
const production = process.env.NODE_ENV === 'production' || prerender

let cssLoaders = [
  production ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
      minimize: production,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: true,
      plugins: [
        require('autoprefixer')()
      ]
    }
  }
]

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.scss$/,
        use: cssLoaders.concat([
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ])
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]?[hash]',
              limit: 4096
            }
          }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]',
          limit: 4096
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin(['APP_LOCALE']),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new FriendlyErrorsWebpackPlugin(),
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
      'sweetalert2$': 'sweetalert2/dist/sweetalert2.js',
      '@': path.join(__dirname, 'src')
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

if (production) {
  module.exports.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

if (prerender) {
  module.exports.plugins.push(
    new PrerenderSPAPlugin({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: ['/', '/about', '/contact'],

      renderer: new Renderer({
        headless: false
      })
    })
  )
}
