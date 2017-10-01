import ApplicationError from '../../../libs/applicationError';

export default async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);

		ctx.status = err instanceof ApplicationError ? err.status : 500;
		ctx.body = `Error [${err.message}] :(`;
	}
};
