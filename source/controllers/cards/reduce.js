/**
 * Reduce card balance
 * @param {Object} ctx
 */
const reduceCardController = async (ctx) => {
	const cardId = Number(ctx.params.id);
	const amount = Number(ctx.request.body.amount);

	await ctx.CardsModel.reduce(cardId, amount);
	ctx.status = 200;
};

export default reduceCardController;
