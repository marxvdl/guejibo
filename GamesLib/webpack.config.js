module.exports = {
    entry: './src/gameslib.js',
    mode: 'development',
    output: {
        library: 'gameslib',
        filename: 'gameslib.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: '.',
    }
};
