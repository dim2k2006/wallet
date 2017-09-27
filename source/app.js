import Koa from 'koa';
import serve from 'koa-static';
import getCardsController from './controllers/cards/get';
import addCardController from './controllers/cards/add';
import deleteCardController from './controllers/cards/delete';

import ApplicationError from '../libs/applicationError';
import Cards from './models/cards';

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const app = new Koa();

router.get('/cards', getCardsController);
router.post('/cards', addCardController);
router.delete('/cards/:id', deleteCardController);

// logger
app.use(async (ctx, next) => {
	const start = Date.now();

	await next();

	const ms = Date.now() - start;

	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);

		ctx.status = err instanceof ApplicationError ? err.status : 500;
		ctx.body = `Error [${err.message}] :(`;
	}
});

// init model
app.use(async (ctx, next) => {
	ctx.Cards = Cards;
	await next();
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

export default app;
