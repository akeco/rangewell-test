const path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        javascript: "./src/app.js"
    },
    output: {
        filename: "app.js",
        path: __dirname + "/dist",
    },
    devServer: {
        hot: true,
        contentBase: '/dist',
        publicPath: '/'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/index.html',
                to: 'index.html'
            },
            {
                from: './public/',
                to: './assets/',
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "node_modules/flexboxgrid")],
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader"}
                ]
            },
            {
                test: /\.(jpg|png|eot|ttf|woff|woff2)$/, loader: 'url-loader?file-loader?name=public/fonts/[name].[ext]'
            },
            {
                test: /\.svg$/, loader: 'babel-loader!svg-react-loader'
            },
            {
                test: /\.html$/, loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    devtool: "source-map", // enum
};