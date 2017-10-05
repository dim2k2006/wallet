import Koa from 'koa';
import serve from 'koa-static';
import views from 'koa-views';
import router from './routes';

import logger from './middleware/logger';
import error from './middleware/error';
import initCardsModel from './middleware/initCardsModel';
import initTransactionsModel from './middleware/initTransactionsModel';

const bodyParser = require('koa-bodyparser')();

// const logger = require('../libs/logger')('wallet-app');

const app = new Koa();

// Middleware
app.use(views(`${__dirname}/client`, {extension: 'ejs'}));
app.use(logger);
app.use(error);
app.use(initCardsModel);
app.use(initTransactionsModel);
app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

export default app;
