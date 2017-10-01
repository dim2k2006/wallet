export default async (ctx, next) => {
	const start = Date.now();

	await next();

	const ms = Date.now() - start;

	// eslint-disable-next-line
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};
