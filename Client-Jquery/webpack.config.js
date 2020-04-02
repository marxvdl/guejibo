module.exports = {
    entry: {
        main: './src/main.js',
        student: './src/student.js'
    },
    mode: 'development',
    output: {
        library: ["client", "[name]"],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: '.',
    }
};
