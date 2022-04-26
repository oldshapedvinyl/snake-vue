const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new VueLoaderPlugin(),
    ],
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        alias: {
           '@src': path.resolve(__dirname, 'src'),
        },
    }
};
