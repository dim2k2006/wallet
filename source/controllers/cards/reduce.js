import {validate, presence, isNumeric} from 'property-validator';
import {isEmpty} from '../../../libs/validationRules';
import ApplicationError from '../../../libs/applicationError';

/**
 * Reduce card balance
 * @param {Object} ctx
 */
const reduceCardController = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const amount = Number(ctx.request.body.amount);
	const cardData = {
		cardId,
		amount
	};

	const data = validate(cardData, [
		presence('cardId'),
		isEmpty('cardId'),
		presence('amount'),
		isEmpty('amount'),
		isNumeric('amount')
	]);

	if (!data.valid) {
		throw new ApplicationError('Card data is invalid', 400);
	}

	const transaction = {
		cardId,
		type: 'paymentMobile',
		data: '+7(921)9999999',
		sum: amount
	};

	await ctx.CardsModel.reduce(cardData);
	await ctx.TransactionsModel.create(transaction);
	ctx.status = 200;
};

export default reduceCardController;
