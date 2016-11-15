// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'app'; // the app root folder: src, src_users, etc
var path = require('path');
module.exports = {
    app_root: app_root, // the app root folder, needed by the other webpack configs
    entry: [
        // http://gaearon.github.io/react-hot-loader/getstarted/
        'webpack-dev-server/client?http://127.0.0.1:5000',
        'webpack/hot/only-dev-server',
        __dirname + '/' + app_root + '/app.js',
    ],
    output: {
        path: __dirname + '/public/js',
        publicPath: 'js/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                // https://github.com/jtangelder/sass-loader
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }
        ],
    },
    devServer: {
        contentBase:  __dirname + '/' + app_root + '/public',
    },
    devTool: "#source-map",
    plugins: []
};
