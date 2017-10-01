const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const sass = require('./webpack/sass');

const PATHS = {
	source: path.join(__dirname, 'source', 'client'),
	build: path.join(__dirname, 'build'),
};

const common = merge([
	{
		entry: `${PATHS.source}/index.js`,
		output: {
			path: PATHS.build,
			filename: 'index.js'
		},
		plugins: [new HtmlWebpackPlugin()]
	}
]);

module.exports = function(env) {
	if (env === 'production') {
		return common;
	}

	if (env === 'development') {
		return merge([
			common,
			devServer(),
			sass()
		]);
	}
};
