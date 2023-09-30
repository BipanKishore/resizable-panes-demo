/* eslint-disable */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');
const autoprefixer = require('autoprefixer')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");

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
        index: './index.tsx'
    },
    mode: 'development',
    devtool: false,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
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
                        loader: miniCssExtractPlugin.loader
                    },'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                          postcssOptions: {
                            plugins: [
                              autoprefixer
                            ]
                          }
                        }
                      },
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i, 
                type: 'asset/resource'
            },
            {
                test: /\.(md)$/i, 
                type: 'asset/source'
            },
            {
                test: /\.(svg)$/i, 
                type: 'asset/inline'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../../../build/'),
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../public/index.html'),
            title: 'Resizable Panes Demo and Docs'
        }),
        new miniCssExtractPlugin(),
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true
        })
    ],
    resolve: {
        alias: {
            react:  path.join(__dirname,  '../../../node_modules/react')
        },
        extensions: ['.tsx', '.ts', '.js'],
    }
}