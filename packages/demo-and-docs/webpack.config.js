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
// const PurgeCss = require('purgecss-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const purgePath = {
    src: path.join(__dirname, "src")
}

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
        index: './src/index.tsx'
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: "all"
        }
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
        filename: '[name]-[contenthash].js',
        path: path.join(__dirname, '../../build/'),
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            title: 'CRA without CRA'
        }),
        new miniCssExtractPlugin(),
        new WebpackNotifierPlugin({
            title: 'Webpack',
            emoji: true
        }),
    //  new PurgeCSSPlugin({
    //     paths: glob.sync(`${purgePath.src}/**/*`, {nodir: true})
    // })
    ],
    resolve: {
        alias: {
            react:  path.join(__dirname,  '../../node_modules/react')
        },
        extensions: ['.tsx', '.ts', '.js'],
    }
}