import {validate, presence, isNumeric} from 'property-validator';
import {isEmpty} from '../../../libs/validationRules';
import ApplicationError from '../../../libs/applicationError';

const commission = 3;

/**
 * Reduce card balance
 * @param {Object} ctx
 */
const cardToMobileController = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const amount = Number(ctx.request.body.amount);
	const data = ctx.request.body.data;
	const cardData = {
		cardId,
		amount,
		data
	};

	const validationData = validate(cardData, [
		presence('cardId'),
		isEmpty('cardId'),
		presence('amount'),
		isEmpty('amount'),
		isNumeric('amount'),
		presence('data'),
		isEmpty('data')
	]);

	if (!validationData.valid) {
		throw new ApplicationError('Card data is invalid', 400);
	}

	const transaction = {
		cardId,
		type: 'paymentMobile',
		data,
		time: (new Date()).toISOString(),
		sum: (amount + commission) * (-1)
	};

	await ctx.CardsModel.reduce(cardData);
	await ctx.TransactionsModel.create(transaction);
	ctx.status = 200;
};

export default cardToMobileController;
