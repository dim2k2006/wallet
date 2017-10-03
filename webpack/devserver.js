const path = require('path');

module.exports = function () {
	return {
		devServer: {
			stats: 'errors-only',
			host: '0.0.0.0',
			port: 9000,
			contentBase: path.join(__dirname, '../public'),
		}
	};
};
