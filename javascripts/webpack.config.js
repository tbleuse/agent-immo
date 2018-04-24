require('babel-polyfill');

var packageJSON = require('./package.json');
const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const sourcePath = resolve(__dirname, 'src');

const devPlugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
        '__DEV__': true,
        'process.env': { NODE_ENV: JSON.stringify('dev') }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
];
const prodPlugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
        },
        output: {
            comments: false,
        }
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
];

const PATHS = {
    build: resolve(__dirname, './../target/classes/public/javascripts/bundle')
};

console.log(PATHS.build);


const config = {
    devtool: 'cheap-module-source-map',
    context: sourcePath,
    entry: {
        map: ['babel-polyfill', './map.js'],
        clients: ['babel-polyfill', './clients.js'],
        houses: ['babel-polyfill', './houses.js'],
    },
    output: {
        filename: '[name].js',
        path: PATHS.build,
        publicPath: '/assets/javascripts/bundle/',
        library: 'AgentImmo',
        libraryTarget: 'umd'
    },
    devServer: {
        hot: true,
        port: process.env.DEV_SERVER_PORT || 3000,
        contentBase: resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css|\.less/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            },
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=15000' },
            { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    plugins: devPlugins,
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },
};

module.exports = config;