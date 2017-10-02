const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const babel = require('./webpack/js.babel');

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
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		]
	},
	images(),
	babel()
]);

module.exports = function(env) {
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
			sass(),
			css()
		]);
	}
};
