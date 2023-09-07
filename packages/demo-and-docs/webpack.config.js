/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            '@babel/preset-env', '@babel/preset-react'
        ]
    }
}

module.exports = {
    entry: {
        index: './index.js'
    },
    mode: 'development',
    devtool:'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /.js$/,
                use: babelLoader
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    }, 'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/dist')
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            title: 'CRA without CRA'
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ForkTsCheckerNotifierWebpackPlugin({
          title: 'TypeScript',
          excludeWarnings: false,
        }),
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true,
            alwaysNotify: true
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    watch: true
}