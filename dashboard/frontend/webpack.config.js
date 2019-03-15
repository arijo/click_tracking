const path = require('path');

module.exports = (env = {}) => {
    return {
        entry: './src/dashboard.js',
        devtool: env.production ? false : 'eval-source-map',
        output: {
            path: path.join(__dirname, './public/js'),
            filename: 'dashboard.js'
        },
        externals: {
            'h337': 'h337'
        }
    }
};