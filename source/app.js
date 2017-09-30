import Koa from 'koa';
import serve from 'koa-static';

import getCardsController from './controllers/cards/get';
import createCardController from './controllers/cards/create';
import removeCardController from './controllers/cards/remove';

import getTransactionsController from './controllers/transactions/get';
import createTransactionController from './controllers/transactions/create';

import logger from './middleware/logger';
import error from './middleware/error';
import initCardsModel from './middleware/initCardsModel';
import initTransactionsModel from './middleware/initTransactionsModel';

const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')();

const app = new Koa();

// Save id param to ctx.params.id
router.param('id', (id, ctx, next) => next());

router.get('/cards', getCardsController);
router.post('/cards', createCardController);
router.delete('/cards/:id', removeCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

// Middleware
app.use(logger);
app.use(error);
app.use(initCardsModel);
app.use(initTransactionsModel);
app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

export default app;
