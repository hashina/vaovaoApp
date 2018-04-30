const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'bundle.js',
        publicPath: '/js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            disable: false,
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: [
                        ['react-transform', {
                            transforms: [
                                {
                                    transform: 'react-transform-hmr',
                                    imports: ['react'],
                                    locals: ['module']
                                }, {
                                    transform: 'react-transform-catch-errors',
                                    imports: ['react', 'redbox-react']
                                }
                            ]
                        }]
                    ]
                }
            }
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        })
    );
}

module.exports = config;
