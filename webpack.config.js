'use strict';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client.js',
    output: {
        path: __dirname,
        filename: 'build/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.marko']
    },
    module: {
        rules: [
        {
            test: /\.marko$/,
            use: 'marko-loader'
        },
        {
        test: /\.(sa|sc|le|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ]
};