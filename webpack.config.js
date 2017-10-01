const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'source', 'client'),
	build: path.join(__dirname, 'build'),
};

const common = {
	entry: `${PATHS.source}/index.js`,
	output: {
		path: PATHS.build,
		filename: 'index.js'
	},
	plugins: [new HtmlWebpackPlugin()]
};

const developmentConfig = {
	devServer: {
		stats: 'errors-only',
		host: '0.0.0.0',
		port: 9000
	}
};

module.exports = function(env) {
	if (env === 'production') {
		return common;
	}

	if (env === 'development') {
		return Object.assign({}, common, developmentConfig);
	}
};
