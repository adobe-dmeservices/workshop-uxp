const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
require('dotenv').config(); // Load .env file for Webpack
const webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        //libraryTarget: "commonjs2"
    },
    devtool: 'eval-cheap-source-map', // won't work on XD due to lack of eval
    externals: {
        uxp: 'commonjs2 uxp',
        photoshop: 'commonjs2 photoshop',
        os: 'commonjs2 os',
        fs: 'commonjs2 fs',
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    plugins: [
                        "@babel/transform-react-jsx",
                        "@babel/proposal-object-rest-spread",
                        "@babel/plugin-syntax-class-properties",
                    ]
                }
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin(['plugin'], {
            copyUnmodified: true
        }),
        new webpack.DefinePlugin({
            'process.env.FIREFLY_CLIENT_ID': JSON.stringify(process.env.FIREFLY_CLIENT_ID),
            'process.env.FIREFLY_CLIENT_SECRET': JSON.stringify(process.env.FIREFLY_CLIENT_SECRET),
        })
    ]
};