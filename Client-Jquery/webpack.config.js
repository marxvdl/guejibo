module.exports = {
    entry: {
        main: './src/main.js',
        student: './src/student.js',
        completereg: './src/completereg.js',
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
