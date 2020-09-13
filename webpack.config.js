const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let dist = path.resolve(__dirname, './dist');

module.exports = {
	mode: 'development',
	watch: true,
	entry: {
		main: ['./src/scripts/main.js', './src/styles/main.scss'],
	},
	output: {
		path: dist,
		filename: '[name].js',
	},
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['dist'] },
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, './src/scripts'), 'node_modules'],
	},
};
