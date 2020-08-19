const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './app/main.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        alias: {}
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, "./src/app")],
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
            ],
        },
        {
            test: /\.ttf$/,
            use: [
                {
                    loader: 'ttf-loader',
                    options: {
                        name: './assets/fonts/[name].[ext]',
                    },
                },
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: './assets/[name].[ext]',
                },
            }],
        }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './app/',
        writeToDisk: true
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
    ],
};
