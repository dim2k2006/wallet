/**
 * Get all transactions for card
 * @param {Object} ctx
 */
const getTransactionsController = async (ctx) => {
	const cardId = Number(ctx.params.id);

	const cardTransactions = await ctx.TransactionsModel.get(cardId);

	ctx.status = 201;
	ctx.body = cardTransactions;
};

export default getTransactionsController;
