const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        filename: 'gameslib.min.js',
    },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            WSURL: "'wss://guejibo.herokuapp.com/'"
        })
    ]
});
