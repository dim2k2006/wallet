// Cards controllers
import getCardsController from '../controllers/cards/get';
import createCardController from '../controllers/cards/create';
import removeCardController from '../controllers/cards/remove';

// Transactions controllers
import getTransactionsController from '../controllers/transactions/get';
import createTransactionController from '../controllers/transactions/create';

const router = require('koa-router')();

// Save id param to ctx.params.id
router.param('id', (id, ctx, next) => next());

// Routes
router.get('/cards', getCardsController);
router.post('/cards', createCardController);
router.delete('/cards/:id', removeCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

export default router;
