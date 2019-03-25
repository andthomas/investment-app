const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.(?:le|c)ss$/,
                use: [
                    "style-loader", 
                    "css-loader",
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            importLoaders: 1,
                        }
                    },
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                }
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./build",
        port: 3000,
        publicPath: "http://localhost:3000/build/",
        hotOnly: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./public/index.html'),
        }),
    ]
};