const path = require('path');

module.exports = {
    mode: "development",
    entry: ["regenerator-runtime/runtime.js", './src/client.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',"@babel/preset-react"]
                    }
                }
            }
        ]
    },
    devServer: {
        static: './dist',
    },
};