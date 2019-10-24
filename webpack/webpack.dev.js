const merge = require('webpack-merge');
const common = require('./webpack.common');

const path = require('path');
let dist = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		writeToDisk: true,
		contentBase: dist,
		compress: true,
		port: 9000
	}
});
