const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const package = require('../package.json');

module.exports = {
  /**
   * Here we declare and name our different Javascript chunks to control
   * what gets included in each page's bundle.
   */
  entry: {
    /** the vendor chunk is package deps */
    vendor: Object.keys(package.dependencies),
    /** these point to specific javascript files in views */
    home: './src/views/index.ts',
    page2: './src/views/page2/index.ts',
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
    /**
     * In the plugins, we specify different html pages that need to be exposed
     * as well ass all of the different named chunks that should be included in
     * that page's bundle.
     */
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'home'], // This page includes package deps and the home ts file
    }),
    new HtmlWebpackPlugin({
      template: './src/views/page2/index.html',
      filename: 'page2/index.html',
      chunks: ['page2'],
    }),
  ],
};
