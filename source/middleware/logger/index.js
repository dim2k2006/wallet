const logger = require('../../../libs/logger')('wallet-app');

export default async (ctx, next) => {
	const start = Date.now();

	await next();

	const ms = Date.now() - start;

	logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
};
