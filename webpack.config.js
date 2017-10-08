const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const devServer = require('./webpack/devserver');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const ignoreCss = require('./webpack/css.ignore');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const babel = require('./webpack/js.babel');

function getExternals() {
	return fs.readdirSync('node_modules')
		.concat(['react-dom/server'])
		.filter((mod) => mod !== '.bin')
		.reduce((externals, mod) => {
			externals[mod] = `commonjs ${mod}`;
			return externals;
		}, {});
}

const PATHS = {
	source: path.join(__dirname, 'source', 'views'),
	build: path.join(__dirname, 'public'),
};

const common = merge([
	{
		entry: `${PATHS.source}/index.js`,
		output: {
			path: PATHS.build,
			filename: 'js/index.js'
		},
		devtool: 'source-map',
	},
	images(),
	babel()
]);

const server = merge([
	{
		entry: `${PATHS.source}/index.server.js`,
		target: 'node',
		externals: getExternals(),
		output: {
			library: 'umd',
			libraryTarget: 'umd',
			path: PATHS.build,
			filename: 'js/index.server.js'
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
			// uglifyJS(),
			ignoreCss()
		]);
	}
};
