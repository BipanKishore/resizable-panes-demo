/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ]
                    }
                }
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
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            title: 'CRA without CRA'
        })
    ],

    watch: true

}