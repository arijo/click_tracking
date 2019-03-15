const path = require('path');

module.exports = (env = {}) => {
    return {
        entry: './src/tag.js',
        devtool: env.production ? false : 'eval-source-map',
        output: {
            path: path.join(__dirname, '../site/public/js'),
            filename: 'tag.js'
        }
    }
};