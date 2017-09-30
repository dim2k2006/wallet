/**
 * Create new transaction
 * @param {Object} ctx
 */
const createTransactionController = async(ctx) => {
	const transaction = ctx.request.body;

	transaction.cardId = ctx.params.id;

	const newTransaction = await ctx.TransactionsModel.create(transaction);

	ctx.status = 201;
	ctx.body = newTransaction;
};

export default createTransactionController;
