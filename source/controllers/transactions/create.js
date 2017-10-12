import {validate, presence} from 'property-validator';
import {isEmpty} from '../../../libs/validationRules/';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create new transaction
 * @param {Object} ctx
 */
const createTransactionController = async (ctx) => {
	const transaction = ctx.request.body;

	transaction.cardId = Number(ctx.params.id);
	transaction.time = transaction.time ? transaction.time : (new Date()).toISOString();

	const data = validate(transaction, [
		presence('cardId'),
		isEmpty('cardId'),
		presence('type'),
		isEmpty('type'),
		presence('data'),
		isEmpty('data'),
		presence('time'),
		isEmpty('time'),
		presence('sum'),
		isEmpty('sum'),
	]);

	if (!data.valid) {
		throw new ApplicationError('Transaction data is invalid', 400);
	}

	const newTransaction = await ctx.TransactionsModel.create(transaction);

	ctx.status = 201;
	ctx.body = newTransaction;
};

export default createTransactionController;
