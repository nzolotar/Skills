const path = require('path');

module.exports = {
    context: __dirname + "/src",
    entry: "./app/app.js",
    mode : 'development',
    output: {
        filename: 'script.min.js',
        path: path.join(__dirname, 'dist/js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    }
};
