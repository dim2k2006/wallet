const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');

const PATHS = {
	source: path.join(__dirname, 'source', 'client'),
	build: path.join(__dirname, 'build'),
};

const common = merge([
	{
		entry: `${PATHS.source}/index.js`,
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin(),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common'
			})
		]
	}
]);

module.exports = function(env) {
	if (env === 'production') {
		return merge([
			common,
			extractCss()
		]);
	}

	if (env === 'development') {
		return merge([
			common,
			devServer(),
			sass(),
			css()
		]);
	}
};
