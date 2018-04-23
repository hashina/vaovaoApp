var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './app/main'
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
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: 'css-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
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
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    );
}

module.exports = config;
