const path = require("path")
const HTMLWebpackPlugin   = require('html-webpack-plugin')
const glob = require('glob')

module.exports = {
    watch: true,
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            title: 'CRA without CRA'
        })
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                }
            },
            {
                test: /\.css$/i,
                use: [
                  {
                    loader: 'style-loader',
                    options: { injectType: 'singletonStyleTag' }
                  }, "css-loader"],
            },
        ]
    },
    
}