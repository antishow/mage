const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let dist = path.resolve(__dirname, '../dist');

module.exports = {
	entry: {
		'main': [
			'./src/scripts/main.js',
			'./src/styles/main.scss',
		]
	},
	output: {
		path: dist,
		filename: '[name].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: process.env.NODE_ENV === 'development' },
					},
					'css-loader',
					// 'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, '../src/scripts'),
			'node_modules'
		]
	}
};
