const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const extractCss = require('./webpack/css.extract');
const ignoreCss = require('./webpack/css.ignore');
const uglifyJS = require('./webpack/js.uglify');
const babel = require('./webpack/js.babel');
const envProduction = require('./webpack/env.production');
const envDevelopment = require('./webpack/env.development');

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
		watch: true
	},
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
		},
		watch: true
	},
	babel()
]);

module.exports = function (env) {
	if (env === 'production') {
		return merge([
			common,
			envProduction(),
			extractCss(),
			uglifyJS()
		]);
	}

	if (env === 'development') {
		return merge([
			common,
			envDevelopment(),
			extractCss()
		]);
	}

	if (env === 'server') {
		return merge([
			server,
			envProduction(),
			uglifyJS(),
			ignoreCss()
		]);
	}
};
