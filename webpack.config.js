/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const webpack = require('webpack')

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
        index: './src/index.js'
    },
    mode: 'development',
    devtool:'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [babelLoader,  'ts-loader'],
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
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '/dist')
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            title: 'CRA without CRA'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    watch: true

}