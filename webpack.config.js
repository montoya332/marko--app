'use strict';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: "./src/pages/home/client.js",
    output: {
        path: __dirname,
        filename: 'static/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.marko'],
        modules: ['./', 'node_modules']
    },
    module: {
        rules: [
        {
            test: /\.marko$/,
            use: 'marko-loader'
        },
         {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        }
      }
    },
        {
            test: /\.(sa|sc|c|le)ss$/,
            use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
            'sass-loader',
            ],
        }, 
        {
            test: /\.svg/,
            loader: 'svg-url-loader'
        },
        {
            test: /\.(jpg|jpeg|gif|png)$/,
            loader: 'file-loader',
            query: {
                name: 'static/images/[hash].[ext]',
                publicPath: '/'
            }
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'static/styles/[name].css' : 'static/styles/[name].[hash].css',
            chunkFilename: devMode ? 'static/styles/[id].css' : 'static/styles/[id].[hash].css',
        }),
    ]
};