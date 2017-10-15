/**
 * Reduce card balance
 * @param {Object} ctx
 */
const cardToCardController = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const target = Number(ctx.request.body.target);
	const sum = Number(ctx.request.body.sum);

	await ctx.CardsModel.reduce({
		cardId,
		amount: sum
	});

	await ctx.CardsModel.increase({
		cardId: target,
		amount: sum
	});

	const sourceCard = await ctx.CardsModel.get(cardId);
	const targetCard = await ctx.CardsModel.get(target);

	const transaction = await ctx.TransactionsModel.create({
		cardId: sourceCard.id,
		type: 'withdrawCard',
		data: targetCard.cardNumber,
		time: new Date().toISOString(),
		sum
	});

	ctx.status = 200;
	ctx.body = transaction;
};

export default cardToCardController;
