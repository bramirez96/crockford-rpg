const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package = require('../package.json');

module.exports = {
  entry: {
    main: './src/views/index.ts',
    vendor: Object.keys(package.dependencies),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../build'),
    compress: true,
    port: 3000,
    overlay: true,
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                { tag: 'img', attribute: 'src', type: 'src' },
                { attribute: 'data-src', type: 'src' },
                { attribute: 'data-srcset', type: 'srcset' },
              ],
            },
            minimize: true,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'main'],
    }),
    new HtmlWebpackPlugin({
      template: './src/views/page2.html',
      filename: 'page2.html',
      chunks: ['vendor'],
    }),
  ],
};
