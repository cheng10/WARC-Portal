var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = require('./webpack.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = __dirname + '/' + module.exports.app_root + '/app.js';

// compress the js file
module.exports.plugins = [
    // https://webpack.github.io/docs/list-of-plugins.html
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compressor: {
            warnings: false
        }
    })
];

// export css to a separate file
module.exports.module.loaders[1] = {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css!sass'),
};

module.exports.plugins.push(new ExtractTextPlugin('../css/main.css'));