import Koa from 'koa';
import serve from 'koa-static';

import getCardsController from './controllers/cards/get';
import createCardController from './controllers/cards/create';
import removeCardController from './controllers/cards/remove';

import getTransactionsController from './controllers/transactions/get';
import createTransactionController from './controllers/transactions/create';

import ApplicationError from '../libs/applicationError';
import CardsModel from './models/cards';
import TransactionsModel from './models/transactions';

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const app = new Koa();

// Save id param to ctx.params.id
router.param('id', (id, ctx, next) => {
	ctx.params.id = Number(id);

	next();
});

router.get('/cards', getCardsController);
router.post('/cards', createCardController);
router.delete('/cards/:id', removeCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

// Logger
app.use(async (ctx, next) => {
	const start = Date.now();

	await next();

	const ms = Date.now() - start;

	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// Error handler
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		console.log('Error detected', err);

		ctx.status = err instanceof ApplicationError ? err.status : 500;
		ctx.body = `Error [${err.message}] :(`;
	}
});

// Init CardsModel
app.use(async (ctx, next) => {
	ctx.CardsModel = new CardsModel();
	await ctx.CardsModel.loadFile();
	await next();
});

// Init TransactionsModel
app.use(async (ctx, next) => {
	ctx.TransactionsModel = new TransactionsModel();
	await ctx.TransactionsModel.loadFile();
	await next();
});

app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

export default app;
