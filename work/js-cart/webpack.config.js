const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/shop.js',
    devtool: 'source-map',
    output: {
        filename: 'shop.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] },
                }
            }
        ],
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 5000
       },
};
