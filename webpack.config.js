const path = require('path');
const webpack = require('webpack');
const HtmlWebapckPlugin = require("html-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");


module.exports = {
    entry: {
        index: './src/index',
        vendor: ['react', 'react-dom', 'moment']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].js',
        // path: path.resolve(__dirname ,'dist')
    },
    // devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"] // 后缀名自动补全
    },
    plugins: [
        
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebapckPlugin({
            template: './src/index.html'
        }),
        new OpenBrowserPlugin({
            url: "http://localhost:8080"
        })

    ],
    devServer: {
        port: 8080,
        hot: true,
        // 让其他用户可以访问
        disableHostCheck: true
    }

}