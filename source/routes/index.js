import {renderToStaticMarkup} from 'react-dom/server';
import getView from '../../libs/getView';

// Cards controllers
import getCardsController from '../controllers/cards/get';
import createCardController from '../controllers/cards/create';
import removeCardController from '../controllers/cards/remove';
import cardToMobileController from '../controllers/cards/card-to-mobile';
import cardToCardController from '../controllers/cards/card-to-card';

// Transactions controllers
import getTransactionsController from '../controllers/transactions/get';
import createTransactionController from '../controllers/transactions/create';

const router = require('koa-router')();

const DATA = {
	user: {
		login: 'samuel_johnson',
		name: 'Samuel Johnson'
	}
};

// Save id param to ctx.params.id
router.param('id', (id, ctx, next) => next());

// Routes
router.get('/', async (ctx) => {
	const indexView = getView('index');
	const indexViewHtml = renderToStaticMarkup(indexView(DATA));

	ctx.body = indexViewHtml;
});

router.get('/cards', getCardsController);
router.post('/cards', createCardController);
router.delete('/cards/:id', removeCardController);
router.post('/cards/:id/pay', cardToMobileController);
router.post('/cards/:id/transfer', cardToCardController);

router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

export default router;
