const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'xpath2.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    // libraryExport: 'default',
    library: 'xpath2'
  }
};