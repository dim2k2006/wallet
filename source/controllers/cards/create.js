import {validate, presence, isNumeric} from 'property-validator';
import {isEmpty, isLuhn} from '../../../libs/validationRules';
import ApplicationError from '../../../libs/applicationError';

/**
 * Create new card
 * @param {Object} ctx
 */
const createCardController = async (ctx) => {
	const card = ctx.request.body;
	const data = validate(card, [
		presence('cardNumber'),
		isEmpty('cardNumber'),
		isLuhn('cardNumber'),
		presence('balance'),
		isEmpty('balance'),
		isNumeric('balance')
	]);

	if (!data.valid) {
		throw new ApplicationError('Card data is invalid', 400);
	}

	card.balance = Number(card.balance);

	const newCard = await ctx.CardsModel.create(card);

	ctx.status = 201;
	ctx.body = newCard;
};

export default createCardController;
