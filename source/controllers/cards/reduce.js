/**
 * Reduce card balance
 * @param {Object} ctx
 */
const reduceCardController = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const amount = Number(ctx.request.body.amount);
	const transaction = {
		cardId,
		type: 'paymentMobile',
		data: '+7(921)9999999',
		time: new Date().toISOString(),
		sum: amount
	};

	await ctx.CardsModel.reduce({cardId, amount});
	await ctx.TransactionsModel.create(transaction);
	ctx.status = 200;
};

export default reduceCardController;
