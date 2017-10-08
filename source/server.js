import app from './app';

const logger = require('../libs/logger')('wallet-app');

app.listen(3000, () => {
	logger.info('YM Node School App listening on port 3000!');
});
