import mongoose from 'mongoose';
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

mongoose.connect('mongodb://localhost/school-wallet', {useMongoClient: true});
mongoose.Promise = global.Promise;

async function getData(ctx) {
	const user = {
		login: 'samuel_johnson',
		name: 'Samuel Johnson'
	};
	const cards = await ctx.cardsModel.getAll();
	const transactions = await ctx.transactionsModel.getAll();

	return {
		user,
		cards,
		transactions
	};
}

// Save id param to ctx.params.id
router.param('id', (id, ctx, next) => next());

// Routes
router.get('/', async (ctx) => {
	const data = await getData(ctx);
	const indexView = getView('index');
	const indexViewHtml = renderToStaticMarkup(indexView(data));

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
