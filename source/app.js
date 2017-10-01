import Koa from 'koa';
import router from './routes';
import serve from 'koa-static';

import logger from './middleware/logger';
import error from './middleware/error';
import initCardsModel from './middleware/initCardsModel';
import initTransactionsModel from './middleware/initTransactionsModel';

const bodyParser = require('koa-bodyparser')();

const app = new Koa();

// Middleware
app.use(logger);
app.use(error);
app.use(initCardsModel);
app.use(initTransactionsModel);
app.use(bodyParser);
app.use(router.routes());
app.use(serve('./public'));

export default app;
