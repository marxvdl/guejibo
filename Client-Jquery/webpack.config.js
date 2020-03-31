module.exports = {
    entry: {
        main: './src/main.js',
        student: './src/student.js'
    },
    mode: 'development',
    output: {
        library: ["client", "[name]"],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.',
    }
};
