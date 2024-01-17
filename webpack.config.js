const path = require('path');

const isProduction = process.env.NODE_ENV.toString() === 'production';

const config = {
    entry: './src/index.js', output: {
        filename: "main.js", path: path.resolve(__dirname, 'build'),
    }, devServer: {
        liveReload: true, open: true, host: 'localhost', static: [{
            directory: path.resolve(__dirname, 'build')
        }, {
            directory: path.resolve(__dirname, 'test')
        }]
    }, plugins: [], module: {},
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
