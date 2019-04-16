module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/dist',
        publicPath: '/public/',
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    }
};
