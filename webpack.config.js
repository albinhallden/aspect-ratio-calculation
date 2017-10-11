const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
 
const outputFolder = path.join(__dirname, 'docs');

module.exports = {
  entry: './main.js',
  output: { 
    path: outputFolder, 
    filename: 'bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'style.css'),
        to: outputFolder,
      }
    ])
  ]
};