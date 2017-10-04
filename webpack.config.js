const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('./webpack/devserver');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const ignoreCss = require('./webpack/css.ignore');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const babel = require('./webpack/js.babel');

const PATHS = {
	source: path.join(__dirname, 'source', 'client'),
	build: path.join(__dirname, 'public'),
};

const common = merge([
	{
		entry: `${PATHS.source}/index.js`,
		output: {
			path: PATHS.build,
			filename: 'js/bundle.js'
		},
		devtool: 'source-map',
		plugins: [
			new HtmlWebpackPlugin({
				inject: false,
				template: './source/client/index.ejs'
			})
		]
	},
	images(),
	babel()
]);

const server = merge([
	{
		entry: `${PATHS.source}/components/App/index.js`,
		output: {
			library: 'umd',
			libraryTarget: 'umd',
			path: PATHS.build,
			filename: 'js/server.js'
		}
	},
	babel()
]);

module.exports = function (env) {
	if (env === 'production') {
		return merge([
			common,
			extractCss(),
			uglifyJS()
		]);
	}

	if (env === 'development') {
		return merge([
			common,
			devServer(),
			css()
		]);
	}

	if (env === 'server') {
		return merge([
			server,
			uglifyJS(),
			ignoreCss()
		]);
	}
};
